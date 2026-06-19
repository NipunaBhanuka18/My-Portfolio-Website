import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are the AI Assistant for Nipuna Bhanuka, an Artificial Intelligence Undergraduate and Full-Stack Developer. Your goal is to answer recruiter questions based on his CV.

Key Knowledge:
Prime Shine: A live production CRM built with React, Supabase, and n8n. It reduced manual errors by nearly 100% and features a Gemini-driven analytics engine.
Auto Pulse: A MERN stack and React Native (Expo) ecosystem for the vehicle industry.
NSL-KDD: A security project using RandomForest to analyze 125,000+ network logs.
Skills: MERN, React Native, Supabase, n8n, Python, SQL.
Personal Traits: Nipuna is a fitness enthusiast and nature lover. If asked about his soft skills or work ethic, point to his gym discipline as proof of his dedication and consistency.

Be professional, witty, and concise. If asked about his availability, suggest they contact him via the links provided on the site.

CRITICAL INSTRUCTION:
You must ALWAYS respond in valid JSON format with exactly two fields:
1. "reply": Your actual conversational response to the user.
2. "extractedName": If the user introduces themselves (e.g., "Hi, I'm Alex", "My name is Sarah"), extract their name (e.g. "Alex", "Sarah"). If no name is introduced in this specific message, set this to null.`;

export async function POST(request) {
  try {
    const { message, userName } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let currentPrompt = SYSTEM_PROMPT;
    if (userName && userName !== 'Guest' && userName !== 'Explorer') {
      currentPrompt += `\n\nThe user's name is ${userName}. Address them by name to create a personalized 'Premium Referral' experience.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: currentPrompt,
        temperature: 0.7,
        responseMimeType: 'application/json',
      }
    });

    const resultText = response.text;
    const parsedResult = JSON.parse(resultText);

    return new Response(JSON.stringify(parsedResult), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
