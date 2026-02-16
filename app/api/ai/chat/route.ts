import { NextRequest, NextResponse } from "next/server";

// System prompt that gives context about Baho Coffee
const SYSTEM_PROMPT = `You are a helpful assistant for Baho Coffee, a specialty coffee exporter from Rwanda. You help customers learn about their Rwandan specialty coffee products, washing stations, orders, and services.

Key Information:
- Products: They offer various specialty coffees including washed, natural, and honey processed coffees
- Washing Stations: Humure CWS, Fugi CWS, Gitoki CWS, and others across Rwanda
- Ordering: Customers can place orders through the Digital Sales portal with packaging options (250g, 500g, 1kg)
- Contact: info@bahocoffee.com, WhatsApp available
- Shipping: Worldwide shipping available
- Export: They work with roasters and businesses, have an Export Portal for quotations
- Sustainability: Committed to sustainable and ethical coffee production

Be friendly, helpful, and informative. If you don't know something specific, guide them to the appropriate section of the website or suggest they contact the team directly. Keep responses concise but helpful.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Fallback: Return a helpful message indicating AI API is not configured
      return NextResponse.json({
        response: "I apologize, but advanced AI features are not currently configured. For detailed assistance, please contact us at info@bahocoffee.com or visit our website for more information.",
        fallback: true,
      });
    }

    // Prepare conversation history for OpenAI
    const messages: Array<{ role: string; content: string }> = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    // Add conversation history (last 10 messages to avoid token limits)
    const recentHistory = conversationHistory.slice(-10);
    recentHistory.forEach((msg: { role: string; content: string }) => {
      messages.push({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content,
      });
    });

    // Add current message
    messages.push({ role: "user", content: message });

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini", // Use gpt-4o-mini as default (cheaper, fast)
        messages: messages,
        temperature: 0.7,
        max_tokens: 500, // Limit response length
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API error:", errorData);
      
      return NextResponse.json({
        response: "I'm having trouble processing your request right now. Please try again, or contact us directly at info@bahocoffee.com for assistance.",
        fallback: true,
      });
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again or contact us directly.";

    return NextResponse.json({
      response: aiResponse,
      fallback: false,
    });
  } catch (error: any) {
    console.error("Error in AI chat endpoint:", error);
    return NextResponse.json(
      {
        response: "I apologize, but I'm experiencing technical difficulties. Please try again, or contact us directly at info@bahocoffee.com for assistance.",
        fallback: true,
      },
      { status: 500 }
    );
  }
}