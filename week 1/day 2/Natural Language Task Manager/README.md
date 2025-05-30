# Natural Language Task Manager

A beautiful React-based web application that allows users to add tasks using natural language input and displays them in an organized, attractive task board interface.

## 🚀 Features

-   **Natural Language Processing**: Add tasks using everyday language
-   **Beautiful UI**: Modern, responsive design with Tailwind CSS
-   **Real-time Updates**: Instant task addition and updates
-   **Priority Management**: Color-coded priority levels (P1-P4)
-   **Task Management**: Mark tasks complete, delete tasks
-   **Local Storage**: Tasks persist between browser sessions
-   **Error Handling**: Graceful error states and loading indicators
-   **Mobile Responsive**: Works perfectly on all device sizes

## 🛠️ Tech Stack

### Frontend

-   **React 19** - Modern React with latest features
-   **Vite** - Fast build tool and dev server
-   **Tailwind CSS** - Utility-first CSS framework
-   **Local Storage** - Browser-based persistence

### Backend

-   **Node.js** - JavaScript runtime
-   **Express** - Web application framework
-   **Google Gemini API** - Natural language processing (optional)
-   **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn

### Setup

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd "Natural Language Task Manager"
    ```

2. **Install Frontend Dependencies**

    ```bash
    cd client
    npm install
    ```

3. **Install Backend Dependencies**

    ```bash
    cd ../server
    npm install
    ```

4. **Environment Configuration (Optional)**
    ```bash
    # In the server directory
    cp .env.example .env
    # Edit .env and add your Google Gemini API key
    ```

## 🚀 Running the Application

### Development Mode

1. **Start the Backend Server**

    ```bash
    cd server
    npm run dev
    ```

    Server will run on `http://localhost:3001`

2. **Start the Frontend (in a new terminal)**

    ```bash
    cd client
    npm run dev
    ```

    Frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173`

### Production Mode

1. **Build the Frontend**

    ```bash
    cd client
    npm run build
    ```

2. **Start the Backend**
    ```bash
    cd server
    npm start
    ```

## 💡 Usage

### Adding Tasks

Simply type your task in natural language in the input field. Examples:

-   `"Finish landing page Aman by 11pm 20th June"`
-   `"Call client Rajeev tomorrow 5pm P1 priority"`
-   `"Review documents Mike by Friday 2pm"`
-   `"Send email to team today P2 urgent"`

### Task Information Extracted

The system automatically extracts:

-   **Task Description**: What needs to be done
-   **Assignee**: Who should do it
-   **Due Date/Time**: When it's due
-   **Priority**: P1 (highest) to P4 (lowest), defaults to P3

### Managing Tasks

-   **Complete Tasks**: Click the checkbox to mark tasks as done
-   **Delete Tasks**: Click the trash icon to remove tasks
-   **Priority Colors**:
    -   P1: Red (Urgent)
    -   P2: Orange (High)
    -   P3: Blue (Normal) - Default
    -   P4: Gray (Low)

## 🎨 UI Features

### Beautiful Design Elements

-   **Modern Header**: Clean branding and description
-   **Intuitive Input**: Large, friendly input field with examples
-   **Loading States**: Smooth loading animations
-   **Success/Error Messages**: Clear feedback to users
-   **Empty State**: Helpful guidance when no tasks exist
-   **Color-coded Priorities**: Visual priority system
-   **Avatar Circles**: User-friendly assignee display
-   **Responsive Layout**: Perfect on desktop and mobile

### Accessibility

-   **ARIA Labels**: Screen reader friendly
-   **Keyboard Navigation**: Full keyboard support
-   **High Contrast**: Good color contrast ratios
-   **Focus States**: Clear focus indicators

## 🔧 Configuration

### Backend API

The backend supports both AI-powered and mock responses:

-   **With API Key**: Uses Google Gemini for intelligent parsing
-   **Without API Key**: Uses rule-based parsing for development

### Customization

You can customize:

-   **Colors**: Edit Tailwind classes in components
-   **API Endpoint**: Change in `App.jsx`
-   **Storage Key**: Modify in `taskUtils.js`
-   **Priority Levels**: Adjust in utility functions

## 📁 Project Structure

```
Natural Language Task Manager/
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── TaskInput.jsx
│   │   │   ├── TaskTable.jsx
│   │   │   └── TaskRow.jsx
│   │   ├── utils/           # Utility functions
│   │   │   └── taskUtils.js
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Tailwind styles
│   ├── public/              # Static assets
│   └── package.json
├── server/                  # Express backend
│   ├── server.js           # Main server file
│   ├── .env.example        # Environment template
│   └── package.json
└── README.md               # Project documentation
```

## 🧪 Testing

### Manual Testing

Test with various input formats:

-   `"Complete project review by tomorrow"`
-   `"Schedule meeting with John Monday 3pm P1"`
-   `"Buy groceries today"`
-   `"Prepare presentation Sarah by Friday morning P2"`

### API Testing

Test the backend directly:

```bash
curl -X POST http://localhost:3001/api/parse-task \
  -H "Content-Type: application/json" \
  -d '{"taskText": "Finish report John by Friday 5pm P1"}'
```

## 🚀 Deployment

### Frontend Deployment

-   Build with `npm run build`
-   Deploy `dist/` folder to any static hosting service
-   Popular options: Vercel, Netlify, GitHub Pages

### Backend Deployment

-   Deploy to Node.js hosting service
-   Popular options: Railway, Render, Heroku
-   Set environment variables in hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

-   Built with React and Tailwind CSS
-   Natural language processing powered by Google Gemini API
-   Icons from Heroicons
-   Inspired by modern task management applications

## 📞 Support

If you have any questions or issues:

1. Check the existing issues in the repository
2. Create a new issue with detailed description
3. Include steps to reproduce for bugs

---

**Happy Task Managing! 🎯**
