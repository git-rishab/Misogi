import { useState, useEffect } from 'react'
import TaskInput from './components/TaskInput'
import TaskTable from './components/TaskTable'
import TranscriptParser from './components/TranscriptParser'
import { generateId, parseTSVResponse, loadTasks, saveTasks } from './utils/taskUtils'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [activeTab, setActiveTab] = useState('single') // 'single' or 'transcript'

  // Load tasks from localStorage on app initialization
  useEffect(() => {
    const savedTasks = loadTasks()
    setTasks(savedTasks)
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = async (taskText) => {
    if (!taskText.trim()) {
      setError('Please enter a task description')
      return
    }

    setLoading(true)
    setError(null)
    setSuccessMessage('')

    try {
      // Make API call to backend
      const response = await fetch('http://localhost:3001/api/parse-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskText }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const tsvData = await response.text()
      const taskData = parseTSVResponse(tsvData)

      if (!taskData) {
        throw new Error('Invalid response format from server')
      }

      // Create new task object
      const newTask = {
        id: generateId(),
        task: taskData.task,
        assignedTo: taskData.assignedTo,
        dueDateTime: taskData.dueDateTime,
        priority: taskData.priority,
        completed: false,
        createdAt: new Date().toISOString(),
      }

      // Add task to state
      setTasks(prevTasks => [...prevTasks, newTask])
      setSuccessMessage('Task added successfully!')

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)

    } catch (err) {
      console.error('Error adding task:', err)
      setError('Failed to add task. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  // Function to add multiple tasks from transcript
  const addMultipleTasks = async (taskDataArray) => {
    setLoading(true)
    setError(null)
    setSuccessMessage('')

    try {
      const newTasks = taskDataArray.map(taskData => ({
        id: generateId(),
        task: taskData.task,
        assignedTo: taskData.assignedTo,
        dueDateTime: taskData.dueDateTime,
        priority: taskData.priority || 'P3',
        completed: false,
        createdAt: new Date().toISOString(),
      }))

      // Add all tasks to state
      setTasks(prevTasks => [...prevTasks, ...newTasks])
      setSuccessMessage(`Successfully added ${newTasks.length} task${newTasks.length !== 1 ? 's' : ''}!`)

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)

    } catch (err) {
      console.error('Error adding tasks:', err)
      setError('Failed to add tasks. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Smart Task Manager
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Add tasks using natural language and let our AI organize them for you.
              Just describe what needs to be done, who should do it, and when it's due.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('single')}
                className={`${activeTab === 'single'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
              >
                <svg className="h-5 w-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Single Task
              </button>
              <button
                onClick={() => setActiveTab('transcript')}
                className={`${activeTab === 'transcript'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
              >
                <svg className="h-5 w-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                AI Transcript Parser
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'single' ? (
            <TaskInput
              onAddTask={addTask}
              loading={loading}
              error={error}
              successMessage={successMessage}
              onClearError={() => setError(null)}
            />
          ) : (
            <TranscriptParser
              onAddTasks={addMultipleTasks}
              loading={loading}
              error={error}
              successMessage={successMessage}
              onClearError={() => setError(null)}
            />
          )}
        </div>

        {/* Task Display Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <TaskTable
            tasks={tasks}
            onToggleCompletion={toggleTaskCompletion}
            onDeleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  )
}

export default App
