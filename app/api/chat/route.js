import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are a chatbot for the Arsenal FC. Use a friendly tone. Ensure explanations are concise and easy to understand.",
});

async function startChat(history) {
    return model.startChat({
        history: history,
        generationConfig: { 
            maxOutputTokens: 8000,
        },
    });
}

export async function POST(req) {
    try {
        const history = await req.json();
        const userMsg = history[history.length - 1];
        const chat = await startChat(history);
        const result = await chat.sendMessage(userMsg.parts[0].text);
        const output = await result.response.text(); // Ensure output is parsed correctly

        return NextResponse.json({ text: output }); // Return as an object with a text property
    } catch (e) {
        console.error(e);
        return NextResponse.json({ text: "Error, check console" }); // Proper error message
    }
}
