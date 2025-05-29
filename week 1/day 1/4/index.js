require('dotenv').config();
const axios = require('axios');
const readline = require('readline');

const API_KEY = process.env.API_KEY;
let conversationHistory = [];

async function callGemini(prompt) {
    conversationHistory.push({
        role: 'user',
        parts: [{ text: prompt }]
    });

    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
            contents: conversationHistory,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000
            }
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    const assistantResponse = response.data.candidates[0].content.parts[0].text;
    conversationHistory.push({
        role: 'model',
        parts: [{ text: assistantResponse }]
    });

    console.log('Assistant:', assistantResponse);
    return assistantResponse;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion() {
    rl.question('Enter your prompt (or "exit" to quit): ', async (userPrompt) => {
        if (!userPrompt || userPrompt.toLowerCase() === 'exit') {
            console.log('Goodbye!');
            rl.close();
            return;
        }

        try {
            await callGemini(userPrompt);
            askQuestion(); // Continue the conversation
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            askQuestion();
        }
    });
}

console.log('Gemini Chatbot started! Type "exit" to quit.');
askQuestion();
