# Gemini AI Chatbot

A simple interactive console chatbot using the Google Gemini API that maintains conversation context and allows multiple turns of dialogue.

## What the Script Does

-   Creates an interactive console-based chatbot using Google Gemini 1.5 Flash model
-   Maintains conversation history across multiple turns so the AI can remember previous interactions
-   Uses configurable temperature (0.7) to control response creativity
-   Allows continuous conversation until the user types "exit"
-   Handles errors gracefully and continues the conversation

## Features

-   **Conversation Context**: The bot remembers what you've said earlier in the conversation
-   **Interactive Loop**: Keep chatting until you're ready to exit
-   **Temperature Control**: Set to 0.7 for balanced creativity and coherence
-   **Error Handling**: Continues running even if individual requests fail

## Setup

### Prerequisites

-   Node.js installed on your system
-   A Google AI Studio API key

### Dependencies

Install the required packages:

```bash
npm install dotenv axios
```

### Environment Setup

1. Get a free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the same directory as `index.js`
3. Add your API key to the `.env` file:

```
API_KEY=your_gemini_api_key_here
```

## How to Run

1. Navigate to the project directory:

```bash
cd "/Users/rishab/Desktop/Github Repos/Misogi/week 1/day 1/4"
```

2. Run the script:

```bash
node index.js
```

3. Start chatting! Type your messages and press Enter
4. Type "exit" to quit the chatbot

## Example Usage

```
Gemini Chatbot started! Type "exit" to quit.
Enter your prompt (or "exit" to quit): Hello, what's your name?
Assistant: Hello! I'm Gemini, an AI assistant created by Google. How can I help you today?

Enter your prompt (or "exit" to quit): Can you remember what I just asked you?
Assistant: Yes, I can remember! You just asked me what my name is, and I told you that I'm Gemini, an AI assistant created by Google. Is there anything else you'd like to know?

Enter your prompt (or "exit" to quit): exit
Goodbye!
```

## Configuration

You can modify the following parameters in the `callGemini` function:

-   `temperature`: Controls randomness (0.0 = deterministic, 1.0 = very creative)
-   `maxOutputTokens`: Maximum length of responses (currently set to 1000)
