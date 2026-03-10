import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { SYSTEM_PROMPT } from '@/lib/knowledge';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Use the official @ai-sdk/google provider with the latest flash model
        const result = await streamText({
            model: google('gemini-1.5-pro'),
            system: SYSTEM_PROMPT,
            messages,
            temperature: 0.2, // Lower temperature to prevent hallucination
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to communicate with AI provider' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
