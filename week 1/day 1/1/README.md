# OpenAI Chat API Terminal Script

## What the Script Does

This script allows you to interact with OpenAI's GPT-3.5-turbo model directly from your terminal. You can enter a prompt, and the script will display the assistant's response along with the total number of tokens used.

## How to Run It

### 1. Dependencies

-   [Node.js](https://nodejs.org/) (v14 or higher recommended)
-   [npm](https://www.npmjs.com/)
-   The following npm packages:
    -   `axios`
    -   `dotenv`

Install dependencies by running:

```bash
npm install axios dotenv
```

### 2. Setup

1. **Clone or download this repository.**
2. **Create a `.env` file** in the same directory as `first-api-call.js` and add your OpenAI API key:
    ```
    API_KEY=your_openai_api_key_here
    ```

### 3. Running the Script

Run the script using Node.js:

```bash
node first-api-call.js
```

You will be prompted:

```
Enter your prompt:
```

Type your prompt and press Enter. The assistant's response and token usage will be displayed.

---
