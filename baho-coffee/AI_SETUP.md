# AI Assistant Setup Guide

The AI assistant widget now supports both **real AI API integration** (OpenAI) and **rule-based fallback** responses.

## Quick Setup

### Option 1: Use OpenAI (Recommended for Advanced Reasoning)

1. **Get an OpenAI API Key:**
   - Go to [platform.openai.com](https://platform.openai.com)
   - Sign up or log in
   - Navigate to API Keys section
   - Create a new secret key

2. **Add to Environment Variables:**
   Create or update `.env.local`:
   ```env
   OPENAI_API_KEY=sk-your-api-key-here
   OPENAI_MODEL=gpt-4o-mini  # Optional: defaults to gpt-4o-mini (cheaper, fast)
   ```

   **Model Options:**
   - `gpt-4o-mini` - Fast, affordable, recommended for chat (default)
   - `gpt-4o` - More capable but more expensive
   - `gpt-3.5-turbo` - Cheaper alternative

3. **Restart your dev server:**
   ```bash
   npm run dev
   ```

4. **That's it!** The AI assistant will now use OpenAI for advanced reasoning.

### Option 2: Use Rule-Based (No API Key Required)

If you don't set `OPENAI_API_KEY`, the widget will automatically use rule-based responses. These work well for common questions but have limited reasoning capabilities.

## How It Works

### With OpenAI API:
- ✅ Advanced reasoning and context understanding
- ✅ Natural conversation flow
- ✅ Handles complex questions
- ✅ Remembers conversation history
- ✅ More intelligent responses

### Without OpenAI API (Rule-Based):
- ✅ Works immediately without setup
- ✅ Fast responses
- ✅ Handles common questions well
- ⚠️ Limited to predefined patterns
- ⚠️ Less conversational

## API Endpoint

The AI chat endpoint is at: `/api/ai/chat`

**Request:**
```json
{
  "message": "What products do you have?",
  "conversationHistory": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi! How can I help?" }
  ]
}
```

**Response:**
```json
{
  "response": "We offer a variety of specialty coffees...",
  "fallback": false
}
```

## Cost Considerations

### OpenAI Pricing (as of 2024):
- **gpt-4o-mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **gpt-4o**: ~$2.50 per 1M input tokens, ~$10 per 1M output tokens
- **gpt-3.5-turbo**: ~$0.50 per 1M input tokens, ~$1.50 per 1M output tokens

**Example:** With gpt-4o-mini, a typical conversation costs less than $0.01 per chat session.

### To Control Costs:
1. Use `gpt-4o-mini` (default) - best balance of cost and quality
2. Responses are limited to 500 tokens (configurable in `route.ts`)
3. Conversation history is limited to last 10 messages

## Alternative AI Services

To use a different AI service (Anthropic, Google, etc.), modify `/app/api/ai/chat/route.ts`:

```typescript
// Example: Anthropic Claude
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.ANTHROPIC_API_KEY!,
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({
    model: "claude-3-haiku-20240307",
    max_tokens: 500,
    messages: messages,
  }),
});
```

## System Prompt

The AI is configured with context about Baho Coffee through a system prompt that includes:
- Product information
- Washing stations
- Ordering process
- Contact information
- Shipping details
- Export services
- Sustainability commitment

You can customize this in `/app/api/ai/chat/route.ts` (SYSTEM_PROMPT constant).

## Testing

1. **Test with OpenAI:**
   - Set `OPENAI_API_KEY` in `.env.local`
   - Open the chat widget
   - Ask complex questions like "What makes your coffee special?"
   - Should get detailed, contextual responses

2. **Test without OpenAI:**
   - Remove or don't set `OPENAI_API_KEY`
   - Open the chat widget
   - Ask common questions
   - Should get rule-based responses

## Troubleshooting

### "AI features are not currently configured"
- This means `OPENAI_API_KEY` is not set
- Either add the API key, or the widget will use rule-based responses (which is fine!)

### "I'm having trouble processing your request"
- Check your API key is valid
- Check your OpenAI account has credits
- Check network connectivity
- Check browser console for detailed errors

### Responses are too short/long
- Adjust `max_tokens` in `/app/api/ai/chat/route.ts`
- Default is 500 tokens (~375 words)

### Responses are generic
- Update the `SYSTEM_PROMPT` in `/app/api/ai/chat/route.ts` with more specific information
- Try a different model (gpt-4o for better reasoning)

## Production Deployment

When deploying to Vercel:

1. Add environment variable in Vercel dashboard:
   - Go to **Settings** → **Environment Variables**
   - Add `OPENAI_API_KEY` with your key
   - Select environments (Production, Preview, Development)

2. Redeploy your application

3. The AI will work automatically in production!

## Security Notes

- ✅ API keys are stored server-side only (never exposed to client)
- ✅ Rate limiting recommended for production (add middleware)
- ✅ API calls are made from server (secure)
- ⚠️ Monitor API usage to prevent unexpected costs
- ⚠️ Consider adding authentication for admin-only features

## Summary

- **With OpenAI API:** Advanced AI with reasoning capabilities
- **Without API Key:** Rule-based responses (works fine for common questions)
- **Easy to switch:** Just add/remove `OPENAI_API_KEY` environment variable
- **Cost-effective:** Using gpt-4o-mini is very affordable (~$0.01 per conversation)

Need help? Check the terminal logs for detailed error messages!

