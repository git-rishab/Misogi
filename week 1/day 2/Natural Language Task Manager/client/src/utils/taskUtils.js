// Task utility functions

// Generate unique ID for tasks
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Parse TSV response from backend API
export const parseTSVResponse = (tsvData) => {
    try {
        const lines = tsvData.trim().split('\n')

        // Skip header line and get the data line
        if (lines.length < 2) {
            throw new Error('Invalid TSV format - missing data')
        }

        const dataLine = lines[1]
        const columns = dataLine.split('\t')

        if (columns.length < 4) {
            throw new Error('Invalid TSV format - insufficient columns')
        }

        return {
            task: columns[0]?.trim() || '',
            assignedTo: columns[1]?.trim() || '',
            dueDateTime: columns[2]?.trim() || '',
            priority: columns[3]?.trim() || 'P3'
        }
    } catch (error) {
        console.error('Error parsing TSV response:', error)
        return null
    }
}

// Load tasks from localStorage
export const loadTasks = () => {
    try {
        const savedTasks = localStorage.getItem('taskManagerTasks')
        return savedTasks ? JSON.parse(savedTasks) : []
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error)
        return []
    }
}

// Save tasks to localStorage
export const saveTasks = (tasks) => {
    try {
        localStorage.setItem('taskManagerTasks', JSON.stringify(tasks))
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error)
        // Handle quota exceeded or other localStorage errors
        if (error.name === 'QuotaExceededError') {
            alert('Storage quota exceeded. Please delete some tasks to continue.')
        }
    }
}

// Format date for display
export const formatDate = (dateString) => {
    try {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    } catch (error) {
        return dateString // Return original string if parsing fails
    }
}

// Validate task data
export const validateTask = (task) => {
    const errors = []

    if (!task.task || task.task.trim().length === 0) {
        errors.push('Task description is required')
    }

    if (task.priority && !['P1', 'P2', 'P3', 'P4'].includes(task.priority.toUpperCase())) {
        errors.push('Priority must be P1, P2, P3, or P4')
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}

// Sort tasks by different criteria
export const sortTasks = (tasks, sortBy = 'createdAt', direction = 'desc') => {
    return [...tasks].sort((a, b) => {
        let valueA, valueB

        switch (sortBy) {
            case 'task':
                valueA = a.task.toLowerCase()
                valueB = b.task.toLowerCase()
                break
            case 'assignedTo':
                valueA = (a.assignedTo || '').toLowerCase()
                valueB = (b.assignedTo || '').toLowerCase()
                break
            case 'priority':
                // Priority sorting: P1 > P2 > P3 > P4
                const priorityOrder = { 'P1': 4, 'P2': 3, 'P3': 2, 'P4': 1 }
                valueA = priorityOrder[a.priority] || 2
                valueB = priorityOrder[b.priority] || 2
                break
            case 'dueDateTime':
                valueA = new Date(a.dueDateTime || 0).getTime()
                valueB = new Date(b.dueDateTime || 0).getTime()
                break
            case 'completed':
                valueA = a.completed ? 1 : 0
                valueB = b.completed ? 1 : 0
                break
            default:
                valueA = new Date(a.createdAt).getTime()
                valueB = new Date(b.createdAt).getTime()
        }

        if (direction === 'asc') {
            return valueA < valueB ? -1 : valueA > valueB ? 1 : 0
        } else {
            return valueA > valueB ? -1 : valueA < valueB ? 1 : 0
        }
    })
}

// Filter tasks
export const filterTasks = (tasks, filters = {}) => {
    return tasks.filter(task => {
        // Filter by completion status
        if (filters.completed !== undefined && task.completed !== filters.completed) {
            return false
        }

        // Filter by priority
        if (filters.priority && task.priority !== filters.priority) {
            return false
        }

        // Filter by assignee
        if (filters.assignedTo &&
            !(task.assignedTo || '').toLowerCase().includes(filters.assignedTo.toLowerCase())) {
            return false
        }

        // Filter by search text
        if (filters.search &&
            !(task.task || '').toLowerCase().includes(filters.search.toLowerCase())) {
            return false
        }

        return true
    })
}
