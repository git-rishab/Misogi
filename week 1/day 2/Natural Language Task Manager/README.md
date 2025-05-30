# 🚀 Natural Language Task Manager

A modern, AI-powered task management application that allows users to create and organize tasks using natural language input. Built with React, Express.js, and Tailwind CSS.

## ✨ Features

-   **Natural Language Processing**: Add tasks using everyday language like "Finish the landing page for John by tomorrow 5pm"
-   **AI-Powered Transcript Parser**: Extract multiple tasks from meeting transcripts automatically
-   **Smart Task Organization**: Automatically extracts task details, assignees, due dates, and priorities
-   **Beautiful UI**: Modern, responsive design with Tailwind CSS
-   **Priority Color Coding**: Visual priority indicators (P1-P4) with color-coded badges
-   **Real-time Validation**: Instant feedback and error handling
-   **Local Storage**: Tasks persist across browser sessions
-   **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🎯 Demo

### Single Task Input

Users can add individual tasks using natural language:

-   "Complete the marketing deck for Sarah by Friday 3pm P2 priority"
-   "Review client proposal Aman tomorrow morning"
-   "Deploy the website by 11pm tonight P1"

### AI Transcript Parser

Extract multiple tasks from meeting transcripts:

```
"Aman you take the landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday. Shreya please review the marketing deck tonight."
```

## 📸 Screenshots

### Main Interface

<!-- Screenshot 1: Add your main interface screenshot here -->
<img width="1202" alt="Screenshot 2025-05-30 at 3 13 30 PM" src="https://github.com/user-attachments/assets/6d4bbcfb-05df-467e-9c29-aaf6253bac75" />

_Screenshot showing the main task manager interface with both single task input and task table_

### AI Transcript Parser

<!-- Screenshot 2: Add your transcript parser screenshot here -->
<img width="976" alt="Screenshot 2025-05-30 at 3 21 09 PM" src="https://github.com/user-attachments/assets/888acc8f-07f1-47f9-a3ee-653ec87d050b" />



_Screenshot showing the AI transcript parser with parsed tasks preview_

## 🛠️ Tech Stack

### Frontend

-   **React 18** - Modern React with hooks
-   **Vite** - Fast build tool and development server
-   **Tailwind CSS** - Utility-first CSS framework
-   **JavaScript (ES6+)** - Modern JavaScript features

### Backend

-   **Node.js** - JavaScript runtime
-   **Express.js** - Web application framework
-   **Google Gemini API** - AI-powered natural language processing
-   **CORS** - Cross-origin resource sharing
-   **Axios** - HTTP client for API requests

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn package manager
-   Google API key for Gemini (optional - falls back to mock responses)

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd "Natural Language Task Manager"
    ```

2. **Install backend dependencies**

    ```bash
    cd server
    npm install
    ```

3. **Install frontend dependencies**

    ```bash
    cd ../client
    npm install
    ```

4. **Set up environment variables (optional)**

    Create a `.env` file in the `server` directory:

    ```bash
    cd ../server
    touch .env
    ```

    Add your Google Gemini API key:

    ```env
    API_KEY=your_google_gemini_api_key_here
    ```

    _Note: If no API key is provided, the application will use mock responses for development._

### Running the Application

1. **Start the backend server**

    ```bash
    cd server
    npm start
    ```

    The server will start on `http://localhost:3001`

2. **Start the frontend development server**

    In a new terminal:

    ```bash
    cd client
    npm run dev
    ```

    The frontend will start on `http://localhost:5173`

3. **Open your browser**

    Navigate to `http://localhost:5173` to use the application.

## 📋 Usage

### Adding Single Tasks

1. Use the main input field to describe your task in natural language
2. Include details like:
    - Task description
    - Assignee name
    - Due date/time
    - Priority level (P1, P2, P3, P4)
3. Click "Add Task" or press Enter
4. The AI will parse your input and create a structured task

**Example inputs:**

-   `"Finish the presentation for John by tomorrow 2pm"`
-   `"Call client Sarah Friday morning P1 priority"`
-   `"Review code Aman by end of day"`

### Using the AI Transcript Parser

1. Click on the "AI Transcript Parser" tab
2. Paste your meeting transcript into the text area
3. Click "Parse Tasks" to extract all tasks automatically
4. Review the parsed tasks in the preview cards
5. Remove any unwanted tasks by clicking the X button
6. Click "Add All Tasks" to add them to your task list

### Managing Tasks

-   **Complete tasks**: Click the checkbox next to any task
-   **Delete tasks**: Click the trash icon in the task row
-   **View details**: All task information is displayed in the table
-   **Priority indicators**: Color-coded badges show task priorities

## 🏗️ Project Structure

```
Natural Language Task Manager/
├── README.md
├── client/                          # React frontend
│   ├── src/
│   │   ├── App.jsx                 # Main application component
│   │   ├── components/
│   │   │   ├── TaskInput.jsx       # Single task input component
│   │   │   ├── TaskTable.jsx       # Task display table
│   │   │   ├── TaskRow.jsx         # Individual task row
│   │   │   └── TranscriptParser.jsx # AI transcript parser
│   │   ├── utils/
│   │   │   └── taskUtils.js        # Utility functions
│   │   └── index.css               # Tailwind CSS styles
│   ├── package.json
│   └── vite.config.js
└── server/                         # Express.js backend
    ├── server.js                   # Main server file
    └── package.json
```

## 🎨 Features in Detail

### Smart Task Parsing

The application uses AI to extract structured information from natural language:

-   **Task Name**: Main action or objective
-   **Assignee**: Person responsible for the task
-   **Due Date/Time**: When the task should be completed
-   **Priority**: Importance level (P1-P4, defaults to P3)

### Priority System

-   **P1 (Red)**: Urgent, critical tasks
-   **P2 (Orange)**: High priority tasks
-   **P3 (Blue)**: Normal priority tasks (default)
-   **P4 (Gray)**: Low priority tasks

### Data Persistence

Tasks are automatically saved to browser localStorage and restored on page reload.

## 🔧 API Endpoints

### POST `/api/parse-task`

Parse a single natural language task description.

**Request Body:**

```json
{
    "taskText": "Complete the report for John by Friday 3pm"
}
```

**Response:**

```
Task	Assigned To	Due Date/Time	Priority
Complete the report	John	3:00 PM Friday	P3
```

### POST `/api/parse-transcript`

Parse multiple tasks from a meeting transcript.

**Request Body:**

```json
{
    "transcript": "John, please finish the landing page by tomorrow. Sarah, review the marketing materials by Friday."
}
```

**Response:**

```json
{
    "tasks": [
        {
            "task": "Finish the landing page",
            "assignedTo": "John",
            "dueDateTime": "Tomorrow",
            "priority": "P3"
        },
        {
            "task": "Review the marketing materials",
            "assignedTo": "Sarah",
            "dueDateTime": "Friday",
            "priority": "P3"
        }
    ]
}
```
