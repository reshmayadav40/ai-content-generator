import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// ⚠️ Add your API key here
const ai = new GoogleGenerativeAI("AIzaSyArFgI8kwusujufSgUQhU7MEIEtwQqDKpk");

// Generate Response
const generateAIResponse = async (promptText, resultElement, buttonElement) => {

    if (!promptText.trim()) {
        alert("Please enter some text!");
        return;
    }

    // Loading UI
    const originalText = buttonElement.innerText;
    buttonElement.innerText = "Generating...";
    buttonElement.disabled = true;

    resultElement.classList.add("hidden");
    resultElement.innerText = "";

    try {
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

        const response = await model.generateContent(promptText);

        const text = response.response.text();

        resultElement.innerText = text;
        resultElement.classList.remove("hidden");

    } catch (error) {
        console.error(error);
        resultElement.innerText = "⚠️ Error: " + error.message;
        resultElement.classList.remove("hidden");
    }

    buttonElement.innerText = originalText;
    buttonElement.disabled = false;
};

// -----------------------------------------------
// Ask Me Anything
// -----------------------------------------------
document.getElementById("ask-btn").addEventListener("click", () => {
    const question = document.getElementById("ask-input").value;
    generateAIResponse(
        `Answer concisely: ${question}`,
        document.getElementById("ask-result"),
        document.getElementById("ask-btn")
    );
});

// -----------------------------------------------
// Summarizer
// -----------------------------------------------
document.getElementById("sum-btn").addEventListener("click", () => {
    const text = document.getElementById("sum-input").value;
    generateAIResponse(
        `Summarize this text: ${text}`,
        document.getElementById("sum-result"),
        document.getElementById("sum-btn")
    );
});

// -----------------------------------------------
// Idea Generator
// -----------------------------------------------
document.getElementById("idea-btn").addEventListener("click", () => {
    const topic = document.getElementById("idea-input").value;
    generateAIResponse(
        `Generate 5 creative ideas about: ${topic}`,
        document.getElementById("idea-result"),
        document.getElementById("idea-btn")
    );
});

// -----------------------------------------------
// Definition Finder
// -----------------------------------------------
document.getElementById("def-btn").addEventListener("click", () => {
    const term = document.getElementById("def-input").value;
    generateAIResponse(
        `Define the term "${term}" simply with an example:`,
        document.getElementById("def-result"),
        document.getElementById("def-btn")
    );
});
