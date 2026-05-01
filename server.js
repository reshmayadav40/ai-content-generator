import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ override: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/generate', async (req, res) => {
    try {
        const { promptText } = req.body;
        
        if (!promptText) {
            return res.status(400).json({ error: "promptText is required" });
        }

        // Robust Fallback System: Try valid supported models
        const modelsToTry = ["gemini-2.5-flash-lite", "gemini-2.0-flash-lite", "gemini-2.5-flash", "gemini-2.0-flash"];
        let text = null;
        let lastError = null;

        for (const modelName of modelsToTry) {
            try {
                console.log(`[API] Attempting generation with model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent(promptText);
                text = result.response.text();
                console.log(`[API] Success using model: ${modelName}`);
                break; // Success! Exit the loop
            } catch (err) {
                console.warn(`[API] Model ${modelName} failed: ${err.message}`);
                lastError = err;
                // Loop continues and tries the next model
            }
        }

        if (!text) {
            throw new Error(`All fallback models failed due to high demand. Last error: ${lastError?.message}`);
        }

        res.json({ text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
});

// For any other route, send index.html
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
