import TaskRow from './TaskRow'

const TaskTable = ({ tasks, onToggleCompletion, onDeleteTask }) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks yet</h3>
                <p className="text-gray-500 mb-6">Get started by adding your first task above.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-sm text-blue-700">
                        <strong>Try examples like:</strong><br />
                        "Finish report John by Friday 5pm"<br />
                        "Call client Sarah tomorrow P1 priority"<br />
                        "Review documents Mike by 2pm today"
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                    Your Tasks ({tasks.length})
                </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                                Complete
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center space-x-1">
                                    <span>Task</span>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center space-x-1">
                                    <span>Assigned To</span>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center space-x-1">
                                    <span>Due Date/Time</span>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center space-x-1">
                                    <span>Priority</span>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tasks.map((task) => (
                            <TaskRow
                                key={task.id}
                                task={task}
                                onToggleCompletion={onToggleCompletion}
                                onDeleteTask={onDeleteTask}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TaskTable
