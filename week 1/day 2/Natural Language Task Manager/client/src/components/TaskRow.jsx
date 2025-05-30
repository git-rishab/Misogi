const TaskRow = ({ task, onToggleCompletion, onDeleteTask }) => {
    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'p1':
                return 'priority-badge-p1'
            case 'p2':
                return 'priority-badge-p2'
            case 'p4':
                return 'priority-badge-p4'
            default:
                return 'priority-badge-p3'
        }
    }

    const getRowStyle = (priority) => {
        if (task.completed) {
            return 'bg-gray-50 opacity-75'
        }

        switch (priority?.toLowerCase()) {
            case 'p1':
                return 'priority-p1'
            case 'p2':
                return 'priority-p2'
            case 'p4':
                return 'priority-p4'
            default:
                return 'priority-p3'
        }
    }

    return (
        <tr className={`hover:bg-gray-50 transition-colors duration-150 ${getRowStyle(task.priority)}`}>
            <td className="px-6 py-4 whitespace-nowrap text-center">
                <button
                    onClick={() => onToggleCompletion(task.id)}
                    className={`h-6 w-6 rounded border-2 flex items-center justify-center transition-colors duration-200 mx-auto ${task.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400'
                        }`}
                    aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                    {task.completed && (
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                    <span className={task.completed ? 'line-through text-gray-500' : ''}>
                        {task.task}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 mr-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-medium">
                            {task.assignedTo ? task.assignedTo.charAt(0).toUpperCase() : '?'}
                        </div>
                    </div>
                    <div className="text-sm text-gray-900">{task.assignedTo || 'Unassigned'}</div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{task.dueDateTime || 'No due date'}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority || 'P3'}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.completed
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                    }`}>
                    {task.completed ? 'Completed' : 'Pending'}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    onClick={() => onDeleteTask(task.id)}
                    className="text-red-600 hover:text-red-900 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
                    aria-label="Delete task"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </td>
        </tr>
    )
}

export default TaskRow
