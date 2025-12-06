import { GoogleGenAI } from "@google/genai";
import { ToolType } from "../types";

// ES6 Feature: 'const' for immutable reference to the client
// API Key is securely accessed via process.env
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// ES6 Feature: Arrow functions for concise syntax
// ES6 Feature: Async/Await for handling asynchronous API calls cleanly
export const generateAIResponse = async (
  toolType: ToolType, 
  userInput: string
): Promise<string> => {
  try {
    let prompt = "";

    // Determine the prompt based on the selected tool
    switch (toolType) {
      case ToolType.ASK:
        prompt = `Answer the following question concisely and clearly: ${userInput}`;
        break;
      case ToolType.SUMMARIZE:
        prompt = `Summarize the following text into a concise paragraph: ${userInput}`;
        break;
      case ToolType.IDEAS:
        prompt = `Generate a numbered list of 5 creative ideas for: ${userInput}`;
        break;
      case ToolType.DEFINE:
        prompt = `Provide a simple, easy-to-understand definition for the term: "${userInput}". Include an example usage if helpful.`;
        break;
      default:
        prompt = userInput;
    }

    // Call the Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    // ES6 Feature: Optional chaining (?.text) could be used if strict null checks weren't guaranteed by the type system
    // The SDK guarantees .text property on the response object
    return response.text || "No response generated.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, something went wrong while connecting to the AI. Please try again.";
  }
};