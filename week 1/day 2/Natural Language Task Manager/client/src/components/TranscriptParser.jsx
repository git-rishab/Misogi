import { useState } from 'react'

const TranscriptParser = ({ onAddTasks, loading, error, successMessage, onClearError }) => {
    const [transcript, setTranscript] = useState('')
    const [parsedTasks, setParsedTasks] = useState([])
    const [isParsingMode, setIsParsingMode] = useState(false)

    const handleTranscriptChange = (e) => {
        setTranscript(e.target.value)
        if (error) {
            onClearError()
        }
    }

    const parseTranscript = async () => {
        if (!transcript.trim()) {
            return
        }

        setIsParsingMode(true)

        try {
            // Make API call to parse the entire transcript
            const response = await fetch('http://localhost:3001/api/parse-transcript', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ transcript }),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            setParsedTasks(data.tasks || [])
        } catch (err) {
            console.error('Error parsing transcript:', err)
            onClearError()
        } finally {
            setIsParsingMode(false)
        }
    }

    const confirmAddTasks = async () => {
        if (parsedTasks.length === 0) return

        await onAddTasks(parsedTasks)
        setTranscript('')
        setParsedTasks([])
    }

    const clearParsedTasks = () => {
        setParsedTasks([])
        setTranscript('')
    }

    const removeParsedTask = (index) => {
        setParsedTasks(prev => prev.filter((_, i) => i !== index))
    }

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'p1':
                return 'bg-red-100 text-red-800 border-red-300'
            case 'p2':
                return 'bg-orange-100 text-orange-800 border-orange-300'
            case 'p4':
                return 'bg-gray-100 text-gray-800 border-gray-300'
            default:
                return 'bg-blue-100 text-blue-800 border-blue-300'
        }
    }

    const exampleTranscript = `"Aman you take the landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday. Shreya please review the marketing deck tonight."`

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                    <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    AI Transcript Parser
                </h2>
                <p className="text-gray-600">
                    Paste your meeting transcript below and let AI extract all tasks automatically.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label htmlFor="transcript-input" className="block text-sm font-medium text-gray-700 mb-2">
                        Meeting Transcript
                    </label>
                    <textarea
                        id="transcript-input"
                        value={transcript}
                        onChange={handleTranscriptChange}
                        placeholder={`Paste your meeting transcript here. For example:\n\n${exampleTranscript}`}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm placeholder-gray-400 transition-colors duration-200 min-h-[120px] resize-y"
                        disabled={loading || isParsingMode}
                        rows={6}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={parseTranscript}
                        disabled={loading || isParsingMode || !transcript.trim()}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                        {isParsingMode ? (
                            <span className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Parsing Transcript...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center">
                                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                Parse Tasks
                            </span>
                        )}
                    </button>

                    {transcript && (
                        <button
                            type="button"
                            onClick={() => setTranscript('')}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                        <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {successMessage}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                        <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}
            </div>

            {/* Parsed Tasks Preview */}
            {parsedTasks.length > 0 && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                            Found {parsedTasks.length} task{parsedTasks.length !== 1 ? 's' : ''}
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={clearParsedTasks}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={confirmAddTasks}
                                disabled={loading}
                                className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 flex items-center"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add All Tasks
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                        {parsedTasks.map((task, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                                            {task.task}
                                        </h4>

                                        <div className="space-y-2">
                                            <div className="flex items-center text-xs text-gray-600">
                                                <svg className="h-4 w-4 mr-1.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <span className="font-medium">{task.assignedTo || 'Unassigned'}</span>
                                            </div>

                                            {task.dueDateTime && (
                                                <div className="flex items-center text-xs text-gray-600">
                                                    <svg className="h-4 w-4 mr-1.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{task.dueDateTime}</span>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                                                    {task.priority || 'P3'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeParsedTask(index)}
                                        className="ml-2 p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors duration-200"
                                        aria-label="Remove task"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TranscriptParser
