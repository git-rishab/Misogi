import { useState } from 'react'

const TaskInput = ({ onAddTask, loading, error, successMessage, onClearError }) => {
    const [taskText, setTaskText] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (taskText.trim()) {
            await onAddTask(taskText)
            setTaskText('') // Clear input after successful submission
        }
    }

    const handleInputChange = (e) => {
        setTaskText(e.target.value)
        if (error) {
            onClearError()
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="task-input" className="block text-sm font-medium text-gray-700 mb-2">
                        Add New Task
                    </label>
                    <div className="relative">
                        <input
                            id="task-input"
                            type="text"
                            value={taskText}
                            onChange={handleInputChange}
                            placeholder="Enter your task in natural language (e.g., 'Finish report John by Friday 5pm')"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg placeholder-gray-400 transition-colors duration-200"
                            disabled={loading}
                            aria-describedby={error ? "error-message" : successMessage ? "success-message" : undefined}
                        />
                        {loading && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !taskText.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Processing...
                        </span>
                    ) : (
                        'Add Task'
                    )}
                </button>

                {/* Error Message */}
                {error && (
                    <div id="error-message" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                        <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {successMessage && (
                    <div id="success-message" className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                        <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {successMessage}
                    </div>
                )}
            </form>
        </div>
    )
}

export default TaskInput
