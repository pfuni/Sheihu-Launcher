
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the GoogleGenAI client using the API_KEY environment variable.
const getAi = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getModSuggestions = async (prompt: string) => {
  const ai = getAi();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest a list of Minecraft mods based on this theme: ${prompt}. Provide exactly 5 mods.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              category: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["name", "description", "category", "reason"]
          }
        }
      }
    });
    // Extracting text from response using the .text property as per guidelines.
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error fetching mod suggestions:", error);
    return [];
  }
};

/**
 * Sends a message to the AI assistant with conversation history.
 */
export const chatWithAssistant = async (history: any[], message: string) => {
  const ai = getAi();
  try {
    // Each entry in contents must follow the { role, parts: [{ text }] } structure.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...history, { role: "user", parts: [{ text: message }] }],
      config: {
        systemInstruction: "You are Sheihu AI, a helpful Minecraft assistant specialized in optimization, mods, and performance.",
      }
    });
    // Access response.text as a property.
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error in chatWithAssistant:", error);
    return "An error occurred while communicating with the AI.";
  }
};
