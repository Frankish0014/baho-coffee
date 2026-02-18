import { NextRequest, NextResponse } from "next/server";
import { AI_TOOLS, executeTool } from "@/backend/lib/ai-tools";

const SYSTEM_PROMPT = `You are an intelligent, dynamic assistant for Baho Coffee, a specialty coffee exporter from Rwanda. You adapt your style and depth to each question—never use a one-size-fits-all template.

## Your Capabilities
**Internal data (always use when relevant):**
- search_products: Coffees by name, flavor, processing, region, washing station
- get_product_details: Full details for a specific product
- get_washing_stations / get_washing_station_details: Stations, locations, managers
- get_blog_posts: Articles on coffee, sustainability, women in coffee

**External data (use for topics beyond our site):**
- search_web: Coffee industry trends, Rwanda news, market prices, general coffee knowledge, weather, competitors—anything not in our internal data

## How to Be Dynamic and Reason
1. **Match response to question**: Short Q → concise answer. Complex Q → detailed, structured answer. Opinion/recommendation Q → personal, conversational tone.
2. **Never sound robotic**: Vary your phrasing. Avoid always ending with "Would you like to know more?" or similar. Sometimes just answer; sometimes offer a follow-up naturally.
3. **Use the right tools**: Baho-specific (products, stations, blog) → internal tools. Industry trends, Rwanda news, market data, general knowledge → search_web. Combine both when relevant.
4. **Reason before answering**: What does the user really need? One product or a comparison? A quick fact or a deep dive? Fetch only what's needed.
5. **Synthesize, don't dump**: After tool results, weave the data into a natural answer. Don't list raw JSON. Pick the most relevant bits and present them clearly.
6. **Guide to action when it fits**: Suggest /products, /washing-stations, /export, /contact only when it genuinely helps—not as a default closer.

## Key Facts
- Contact: bahocoffee@gmail.com, WhatsApp, +250 788 302 976
- Ordering: Digital Sales portal, 250g/500g/1kg, card or bank transfer
- Export: Quotation requests via Export Portal
- Shipping: Worldwide
- Sustainability: Ethical production, smallholder farmers

Be friendly, accurate, and varied. Every answer should feel tailored to the specific question.`;

type Message = { role: string; content: string; tool_call_id?: string; tool_calls?: unknown[] };
type ToolCall = { id: string; type?: string; name?: string; arguments?: string; function?: { name: string; arguments: string } };

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        response:
          "I apologize, but advanced AI features are not currently configured. For assistance, please contact us at bahocoffee@gmail.com or explore our website.",
        fallback: true,
      });
    }

    const messages: Message[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationHistory.slice(-10).map((msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    let finalResponse = "";
    let maxToolRounds = 5;
    let round = 0;

    while (round < maxToolRounds) {
      round++;
      const requestBody: Record<string, unknown> = {
        model,
        messages,
        temperature: 0.8,
        max_tokens: 1000,
        tools: AI_TOOLS,
        tool_choice: "auto",
      };

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        console.error("OpenAI API error:", errData);
        return NextResponse.json({
          response:
            "I'm having trouble processing your request. Please try again or contact us at bahocoffee@gmail.com.",
          fallback: true,
        });
      }

      const data = await response.json();
      const choice = data.choices?.[0];
      const finishReason = choice?.finish_reason;
      const messageContent = choice?.message;

      if (!messageContent) {
        return NextResponse.json({
          response: "I couldn't generate a response. Please try again.",
          fallback: true,
        });
      }

      const content = messageContent.content || "";
      const toolCalls = messageContent.tool_calls || [];

      if (content) {
        finalResponse = content.trim();
      }

      const assistantMsg: Message = { role: "assistant", content: content || "" };
      if (toolCalls.length > 0) {
        (assistantMsg as Record<string, unknown>).tool_calls = toolCalls;
      }
      messages.push(assistantMsg);

      if (finishReason === "stop" || toolCalls.length === 0) {
        break;
      }

      for (const tc of toolCalls as ToolCall[]) {
        const name = tc.function?.name || tc.name;
        const argsStr = tc.function?.arguments || tc.arguments || "{}";
        let args: Record<string, unknown> = {};
        try {
          args = JSON.parse(argsStr);
        } catch {
          args = {};
        }
        const result = await executeTool(name as keyof typeof executeTool, args);
        messages.push({
          role: "tool",
          tool_call_id: tc.id,
          content: result,
        } as Message & { tool_call_id: string });
      }
    }

    if (!finalResponse) {
      finalResponse =
        "I've gathered some information but couldn't formulate a complete response. Please try rephrasing your question or contact us at bahocoffee@gmail.com.";
    }

    return NextResponse.json({
      response: finalResponse,
      fallback: false,
    });
  } catch (error) {
    console.error("Error in AI chat endpoint:", error);
    return NextResponse.json(
      {
        response:
          "I'm experiencing technical difficulties. Please try again or contact us at bahocoffee@gmail.com.",
        fallback: true,
      },
      { status: 500 }
    );
  }
}
