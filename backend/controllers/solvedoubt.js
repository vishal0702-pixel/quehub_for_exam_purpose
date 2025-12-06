import { GoogleGenAI } from "@google/genai";

const API_KEY = "AIzaSyADYNt1TLRJ6ZXDM17WzHGfqmIpNm2X72U";

// In-memory chat history (optional)
let chatHistory = [];

const solvedoubt = async (req, res) => {
  const { messages } = req.body;
  if (!messages || !messages.length) {
    return res.status(400).json({ error: "Messages are required" });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const conversation = messages
      .map(msg => `${msg.role === "user" ? "User" : "AI"}: ${msg.text}`)
      .join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: conversation,
      config: {
        systemInstruction: `
        SYSTEM INSTRUCTION for QueHub AI Tutor:
        You are an AI tutor for B.Tech / engineering students.
        Speak in short, numbered steps. Use line breaks. Avoid long paragraphs.
        Use mini examples or pseudo-code when helpful.
        Tone: friendly, encouraging, easy to read.
        `
      }
    });

    const aiText = response.text || "Sorry, I could not generate a response.";
    chatHistory.push({ role: "model", text: aiText });

    res.json({ message: aiText });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Export as default for ES modules
export default solvedoubt;
