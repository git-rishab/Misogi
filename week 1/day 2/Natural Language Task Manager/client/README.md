# Task Manager Web App - Product Requirements Document (PRD)

## 1. Product Overview

### 1.1 Objective

Build a React-based web application that allows users to add tasks using natural language input and displays them in a beautiful, organized task board interface.

### 1.2 Tech Stack

-   **Frontend**: React
-   **Backend**: Node.js + Express (for natural language processing API)
-   **Data Storage**: Frontend localStorage only
-   **UI Framework**: Use Tailwind CSS for styling

## 2. Core Functionality

### 2.1 Natural Language Task Input

-   User enters tasks in natural language format
-   Examples:
    -   "Finish landing page Aman by 11pm 20th June"
    -   "Call client Rajeev tomorrow 5pm"
    -   "Review documents P1 priority by Friday 2pm"

### 2.2 Task Parsing Requirements

The backend API must extract the following information from natural language input:

-   **Task Name**: The main action/description (e.g., "Finish landing page", "Call client Rajeev")
-   **Assignee**: Person responsible for the task (e.g., "Aman", "Rajeev")
-   **Due Date & Time**: When the task is due (e.g., "11pm 20th June", "tomorrow 5pm")
-   **Priority**: Default to P3, unless explicitly mentioned as P1, P2, or P4

### 2.3 API Response Format

The backend API must return data in this exact TSV (Tab-Separated Values) format:

```
Task	Assigned To	Due Date/Time	Priority
Call client Rajeev	Rajeev	5:00 PM Tomorrow	P2
```

## 3. User Interface Requirements

### 3.1 Landing Page Layout

1. **Header Section**

    - App title/logo
    - Brief description of functionality

2. **Task Input Section**

    - Large, prominent text input field
    - Placeholder text: "Enter your task in natural language (e.g., 'Finish report John by Friday 5pm')"
    - Submit button labeled "Add Task"
    - Loading state during API call

3. **Task Display Section**
    - Beautiful tabular format showing all tasks
    - Columns: Task, Assigned To, Due Date/Time, Priority
    - Modern, clean design with proper spacing and typography

### 3.2 Task Table Design Requirements

-   **Responsive design** that works on desktop and mobile
-   **Priority color coding**:
    -   P1: Red background/accent
    -   P2: Orange background/accent
    -   P3: Blue background/accent (default)
    -   P4: Gray background/accent
-   **Sortable columns** (optional enhancement)
-   **Task status indicators** (visual completion checkboxes)
-   **Clean typography** with good contrast and readability
-   **Hover effects** and smooth transitions

### 3.3 UI States

1. **Empty State**: When no tasks exist, show friendly message encouraging user to add first task
2. **Loading State**: Show spinner/skeleton during API calls
3. **Error State**: Display user-friendly error messages for failed API calls
4. **Success State**: Brief confirmation when task is successfully added

## 4. Technical Specifications

### 4.1 Frontend Architecture

-   **React Components Structure**:
    -   `App.js` - Main component
    -   `TaskInput.js` - Input form component
    -   `TaskTable.js` - Task display component
    -   `TaskRow.js` - Individual task row component

### 4.2 State Management

-   Use React hooks (useState, useEffect) for state management
-   Store all tasks in localStorage with key: `taskManagerTasks`
-   Load tasks from localStorage on app initialization

### 4.3 API Integration

-   **Endpoint**: POST request to backend API
-   **Request Body**: `{ "taskText": "user input string" }`
-   **Response**: TSV formatted string as shown in section 2.3
-   **Error Handling**: Proper error states for network failures, API errors

### 4.4 Data Storage

-   **Storage Method**: Browser localStorage only
-   **Data Structure**: Array of task objects

```javascript
[
    {
        id: "unique-id",
        task: "Call client Rajeev",
        assignedTo: "Rajeev",
        dueDateTime: "5:00 PM Tomorrow",
        priority: "P2",
        completed: false,
        createdAt: "timestamp",
    },
];
```

### 4.5 Data Flow

1. User enters natural language task in input field
2. Click "Add Task" triggers API call to backend
3. Backend processes natural language and returns TSV response
4. Frontend parses TSV response into task object
5. Task object is added to localStorage array
6. UI updates to display new task in table
7. Input field is cleared for next task

## 5. Functional Requirements

### 5.1 Must-Have Features

-   [ ] Natural language task input field
-   [ ] API integration with backend for task parsing
-   [ ] Parse TSV response from backend
-   [ ] Display tasks in beautiful tabular format
-   [ ] Store tasks in localStorage
-   [ ] Load tasks from localStorage on page refresh
-   [ ] Priority color coding
-   [ ] Responsive design
-   [ ] Error handling for API failures

### 5.2 Nice-to-Have Features

-   [ ] Task completion toggle
-   [ ] Task deletion functionality
-   [ ] Task editing capability
-   [ ] Search/filter tasks
-   [ ] Sort tasks by different columns
-   [ ] Export tasks functionality
-   [ ] Dark mode toggle

## 6. Design Guidelines

### 6.1 Visual Design

-   **Color Scheme**: Modern, professional color palette
-   **Typography**: Clean, readable fonts (system fonts preferred)
-   **Spacing**: Generous whitespace for better readability
-   **Icons**: Use simple, consistent icons for actions

### 6.2 User Experience

-   **Intuitive Interface**: Clear visual hierarchy and navigation
-   **Fast Performance**: Minimal loading times and smooth interactions
-   **Accessibility**: Proper ARIA labels and keyboard navigation
-   **Mobile-First**: Responsive design that works well on all devices

## 7. Acceptance Criteria

### 7.1 Task Input

-   ✅ User can enter natural language task descriptions
-   ✅ API call is made when user submits task
-   ✅ Loading state is shown during API processing
-   ✅ Success feedback is provided when task is added

### 7.2 Task Display

-   ✅ Tasks are displayed in clean tabular format
-   ✅ All four columns (Task, Assigned To, Due Date/Time, Priority) are visible
-   ✅ Priority levels have distinct color coding
-   ✅ Tasks persist after page refresh (localStorage)

### 7.3 Error Handling

-   ✅ Network errors are handled gracefully
-   ✅ API errors show user-friendly messages
-   ✅ Invalid responses are handled properly

### 7.4 Performance

-   ✅ App loads quickly on first visit
-   ✅ Task addition is responsive and smooth
-   ✅ Large numbers of tasks don't slow down the interface

## 8. Technical Constraints

-   **No external databases**: Use localStorage only for data persistence
-   **Browser compatibility**: Support modern browsers (Chrome, Firefox, Safari, Edge)
-   **No authentication**: Simple single-user application
-   **Client-side only storage**: All data stored in browser localStorage

## 9. Development Notes

### 9.1 TSV Parsing

The frontend must correctly parse the TSV response from the backend API. Expected format:

```
Task	Assigned To	Due Date/Time	Priority
[TaskName]	[AssigneeName]	[DueDateTime]	[Priority]
```

### 9.2 localStorage Schema

Use consistent data structure for localStorage to avoid conflicts:

```javascript
const taskSchema = {
    id: "string (UUID or timestamp)",
    task: "string",
    assignedTo: "string",
    dueDateTime: "string",
    priority: "string (P1|P2|P3|P4)",
    completed: "boolean",
    createdAt: "string (ISO timestamp)",
};
```

### 9.3 Error Scenarios to Handle

-   API endpoint unavailable
-   Invalid TSV response format
-   Network timeout
-   Empty or malformed task input
-   localStorage quota exceeded
