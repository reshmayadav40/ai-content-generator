
const generateAIResponse = async (promptText, resultElement, buttonElement) => {
    if (!promptText.trim()) {
        alert("Please enter some text!");
        return;
    }

    const textSpan = buttonElement.querySelector('.btn-text');
    const originalText = textSpan.innerText;
    
    textSpan.innerText = "Generating...";
    buttonElement.style.opacity = "0.7";
    buttonElement.disabled = true;

    resultElement.classList.add("hidden");
    resultElement.innerText = "";

    try {
        // Route to the live Render backend so you don't even need to run a local server
        const baseUrl = 'https://ai-content-generator-9036.onrender.com';
        
        const response = await fetch(`${baseUrl}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ promptText })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to generate response');
        }

        resultElement.innerText = data.text;
        resultElement.classList.remove("hidden");
    } catch (error) {
        console.error(error);
        resultElement.innerText = "⚠️ Error: " + error.message;
        resultElement.classList.remove("hidden");
    }

    textSpan.innerText = originalText;
    buttonElement.style.opacity = "1";
    buttonElement.disabled = false;
};

document.getElementById("ask-btn").addEventListener("click", () => {
    const question = document.getElementById("ask-input").value;
    generateAIResponse(
        `Answer concisely: ${question}`,
        document.getElementById("ask-result"),
        document.getElementById("ask-btn")
    );
});

document.getElementById("sum-btn").addEventListener("click", () => {
    const text = document.getElementById("sum-input").value;
    generateAIResponse(
        `Summarize this text: ${text}`,
        document.getElementById("sum-result"),
        document.getElementById("sum-btn")
    );
});

document.getElementById("idea-btn").addEventListener("click", () => {
    const topic = document.getElementById("idea-input").value;
    generateAIResponse(
        `Generate 5 creative ideas about: ${topic}`,
        document.getElementById("idea-result"),
        document.getElementById("idea-btn")
    );
});

document.getElementById("def-btn").addEventListener("click", () => {
    const term = document.getElementById("def-input").value;
    generateAIResponse(
        `Define the term "${term}" simply with an example:`,
        document.getElementById("def-result"),
        document.getElementById("def-btn")
    );
});



