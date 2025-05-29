require('dotenv').config();
const axios = require('axios');
const readline = require('readline');

const API_KEY = process.env.API_KEY;

async function callOpenAI(prompt) {
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt }
            ],
        },
        {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
        }
    );

    console.log('Assistant:', response.data.choices[0].message.content, 'Total tokens:', response.data.usage.total_tokens);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your prompt: ', (userPrompt) => {
    if (!userPrompt) {
        console.error('Please provide a prompt.');
        rl.close();
        process.exit(1);
    }
    callOpenAI(userPrompt);
    rl.close();
});
