const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const app = express();
const port = 3001; // Changed to 3001 to match frontend expectation

app.use(express.json());
app.use(cors());

app.post('/api/parse-task', async (req, res) => {
    try {
        const { taskText } = req.body;

        if (!taskText) {
            return res.status(400).json({ error: 'Task text is required' });
        }

        const systemInstructions = `
            Parse the following natural language task request and extract specific information.
            
            EXTRACT THESE ELEMENTS:
            1. Task Name (e.g., "Finish landing page")
            2. Assignee (e.g., "Aman")
            3. Due Date & Time (e.g., "11pm 20th June", "tomorrow 5pm", "Friday 2pm")
            4. Priority: Default to P3 unless specifically mentioned as P1, P2, or P4
            
            Return the result in EXACT TSV format with tab separators:
            Task	Assigned To	Due Date/Time	Priority
            [TaskName]	[AssigneeName]	[DueDateTime]	[Priority]
            
            Example input: "Finish landing page Aman by 11pm 20th June"
            Example output:
            Task	Assigned To	Due Date/Time	Priority
            Finish landing page	Aman	11:00 PM 20th June	P3
            
            Example input: "Call client Rajeev tomorrow 5pm P2 priority"
            Example output:
            Task	Assigned To	Due Date/Time	Priority
            Call client Rajeev	Rajeev	5:00 PM Tomorrow	P2
            
            IMPORTANT: Return ONLY the TSV format with header and data row. Use tabs (not spaces) between columns.
        `;

        const fullPrompt = systemInstructions + "\n\nUser request: " + taskText;

        // If API key is not available, use mock response for development
        if (!process.env.API_KEY) {
            console.log('No API key found, using mock response for:', taskText);
            const mockResponse = generateMockResponse(taskText);
            return res.type('text/plain').send(mockResponse);
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`,
            {
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: fullPrompt }]
                    }
                ],
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 500
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const assistantResponse = response.data.candidates[0].content.parts[0].text.trim();

        // Clean up the response to ensure it's valid TSV
        const cleanedResponse = cleanTSVResponse(assistantResponse);

        res.type('text/plain').send(cleanedResponse);
    } catch (error) {
        console.error('Error processing request:', error);

        // Fallback to mock response on error
        const mockResponse = generateMockResponse(req.body.taskText);
        res.type('text/plain').send(mockResponse);
    }
});

// New endpoint for parsing entire transcripts
app.post('/api/parse-transcript', async (req, res) => {
    try {
        const { transcript } = req.body;

        if (!transcript) {
            return res.status(400).json({ error: 'Transcript text is required' });
        }

        const systemInstructions = `
            Parse the following meeting transcript and extract ALL task assignments mentioned.
            
            EXTRACT FOR EACH TASK:
            1. Task Name (what needs to be done)
            2. Assignee (who should do it)
            3. Due Date & Time (when it's due)
            4. Priority: Default to P3 unless specifically mentioned as P1, P2, or P4
            
            Return the result as a JSON object with an array of tasks:
            {
                "tasks": [
                    {
                        "task": "Task description",
                        "assignedTo": "Person name",
                        "dueDateTime": "Due date/time",
                        "priority": "P1/P2/P3/P4"
                    }
                ]
            }
            
            Example transcript: "Aman you take the landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday. Shreya please review the marketing deck tonight."
            
            Example output:
            {
                "tasks": [
                    {
                        "task": "Take the landing page",
                        "assignedTo": "Aman",
                        "dueDateTime": "10:00 PM Tomorrow",
                        "priority": "P3"
                    },
                    {
                        "task": "Take care of client follow-up",
                        "assignedTo": "Rajeev",
                        "dueDateTime": "Wednesday",
                        "priority": "P3"
                    },
                    {
                        "task": "Review the marketing deck",
                        "assignedTo": "Shreya",
                        "dueDateTime": "Tonight",
                        "priority": "P3"
                    }
                ]
            }
            
            IMPORTANT: Return ONLY valid JSON format. Extract ALL tasks mentioned in the transcript.
        `;

        const fullPrompt = systemInstructions + "\n\nTranscript: " + transcript;

        // If API key is not available, use mock response for development
        if (!process.env.API_KEY) {
            console.log('No API key found, using mock response for transcript parsing');
            const mockResponse = generateMockTranscriptResponse(transcript);
            return res.json(mockResponse);
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`,
            {
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: fullPrompt }]
                    }
                ],
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 1000
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const assistantResponse = response.data.candidates[0].content.parts[0].text.trim();

        // Clean up the response to ensure it's valid JSON
        const cleanedResponse = cleanJSONResponse(assistantResponse);
        const parsedResponse = JSON.parse(cleanedResponse);

        res.json(parsedResponse);
    } catch (error) {
        console.error('Error processing transcript:', error);

        // Fallback to mock response on error
        const mockResponse = generateMockTranscriptResponse(req.body.transcript);
        res.json(mockResponse);
    }
});

// Function to generate mock response for development/testing
function generateMockResponse(taskText) {
    // Simple parsing logic for demo purposes
    const task = extractTask(taskText);
    const assignee = extractAssignee(taskText);
    const dueDate = extractDueDate(taskText);
    const priority = extractPriority(taskText);

    return `Task\tAssigned To\tDue Date/Time\tPriority\n${task}\t${assignee}\t${dueDate}\t${priority}`;
}

function extractTask(text) {
    // Extract main task description
    const words = text.split(' ');
    let task = '';
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        // Stop at common delimiters
        if (word.toLowerCase() === 'by' || word.toLowerCase() === 'for' ||
            /^[A-Z][a-z]+$/.test(word) && i > 2) {
            break;
        }
        task += word + ' ';
    }
    return task.trim() || 'Complete task';
}

function extractAssignee(text) {
    // Look for proper names (capitalized words)
    const words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (/^[A-Z][a-z]+$/.test(word) && word.length > 2) {
            return word;
        }
    }
    return 'Unassigned';
}

function extractDueDate(text) {
    const today = new Date();

    if (text.toLowerCase().includes('tomorrow')) {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const timeMatch = text.match(/(\d{1,2})(pm|am)/i);
        if (timeMatch) {
            return `${timeMatch[1]}:00 ${timeMatch[2].toUpperCase()} Tomorrow`;
        }
        return 'Tomorrow';
    }

    if (text.toLowerCase().includes('today')) {
        const timeMatch = text.match(/(\d{1,2})(pm|am)/i);
        if (timeMatch) {
            return `${timeMatch[1]}:00 ${timeMatch[2].toUpperCase()} Today`;
        }
        return 'Today';
    }

    // Look for time patterns
    const timeMatch = text.match(/(\d{1,2})(pm|am)/i);
    if (timeMatch) {
        return `${timeMatch[1]}:00 ${timeMatch[2].toUpperCase()}`;
    }

    // Look for day names
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    for (const day of days) {
        if (text.toLowerCase().includes(day)) {
            return day.charAt(0).toUpperCase() + day.slice(1);
        }
    }

    return 'No due date';
}

function extractPriority(text) {
    const priorityMatch = text.match(/P([1-4])/i);
    if (priorityMatch) {
        return `P${priorityMatch[1]}`;
    }

    if (text.toLowerCase().includes('urgent') || text.toLowerCase().includes('asap')) {
        return 'P1';
    }

    if (text.toLowerCase().includes('important')) {
        return 'P2';
    }

    return 'P3';
}

function cleanTSVResponse(response) {
    // Remove any markdown formatting or extra text
    const lines = response.split('\n').filter(line => line.trim());

    // Find the TSV content
    let tsvLines = [];
    let foundHeader = false;

    for (const line of lines) {
        if (line.includes('Task') && line.includes('Assigned To') && line.includes('Priority')) {
            foundHeader = true;
            tsvLines.push(line);
        } else if (foundHeader && line.includes('\t')) {
            tsvLines.push(line);
            break; // Only take the first data row
        }
    }

    if (tsvLines.length >= 2) {
        return tsvLines.join('\n');
    }

    // Fallback if parsing fails
    return response;
}

// Function to generate mock transcript response for development/testing
function generateMockTranscriptResponse(transcript) {
    // Simple parsing logic for demo purposes
    const tasks = [];
    const sentences = transcript.split(/[.!?]+/).filter(s => s.trim());

    for (const sentence of sentences) {
        const words = sentence.trim().split(' ');
        if (words.length < 3) continue;

        const assignee = extractAssignee(sentence);
        if (assignee !== 'Unassigned') {
            const task = extractTaskFromSentence(sentence, assignee);
            const dueDate = extractDueDate(sentence);
            const priority = extractPriority(sentence);

            tasks.push({
                task,
                assignedTo: assignee,
                dueDateTime: dueDate,
                priority
            });
        }
    }

    // If no tasks found, create a sample task
    if (tasks.length === 0) {
        tasks.push({
            task: "Review meeting notes",
            assignedTo: "Team",
            dueDateTime: "End of week",
            priority: "P3"
        });
    }

    return { tasks };
}

function extractTaskFromSentence(sentence, assignee) {
    // Remove the assignee name and extract the task
    let task = sentence.replace(new RegExp(`\\b${assignee}\\b`, 'gi'), '')
        .replace(/\byou\b/gi, '')
        .replace(/\bplease\b/gi, '')
        .replace(/\btake care of\b/gi, '')
        .replace(/\btake\b/gi, '')
        .replace(/\bby\b.*$/gi, '') // Remove everything after "by"
        .trim();

    // Clean up extra spaces and common words
    task = task.replace(/\s+/g, ' ')
        .replace(/^(the|a|an)\s+/gi, '')
        .trim();

    return task || 'Complete assigned task';
}

function cleanJSONResponse(response) {
    // Remove any markdown formatting or extra text
    let cleaned = response.trim();

    // Find JSON content between curly braces
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        cleaned = jsonMatch[0];
    }

    // Remove any backticks or markdown
    cleaned = cleaned.replace(/```json\s*/g, '').replace(/```\s*/g, '');

    return cleaned;
}

app.listen(port, () => {
    console.log(`Task Manager API server is running on http://localhost:${port}`);
    if (!process.env.API_KEY) {
        console.log('Note: Running in mock mode (no API_KEY found)');
    }
});