const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('.'));

// File paths
const jsonFilePath = path.join(__dirname, 'feedback_data.json');
const csvFilePath = path.join(__dirname, 'feedback_data.csv');

// Initialize files if they don't exist
function initializeFiles() {
    // Initialize JSON file
    if (!fs.existsSync(jsonFilePath)) {
        fs.writeFileSync(jsonFilePath, JSON.stringify([], null, 2));
    }
    
    // Initialize CSV file
    if (!fs.existsSync(csvFilePath)) {
        const csvHeader = 'ID,Name,SID,Email,Course,Rating,Suggestion,Timestamp\n';
        fs.writeFileSync(csvFilePath, csvHeader);
    }
}

// Read existing data from JSON file
function readJsonData() {
    try {
        const data = fs.readFileSync(jsonFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return [];
    }
}

// Write data to JSON file
function writeJsonData(data) {
    try {
        fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing JSON file:', error);
    }
}

// Append data to CSV file
function appendToCsv(feedback) {
    try {
        const csvLine = `${feedback.id},"${feedback.name}","${feedback.sid}","${feedback.email}","${feedback.course}",${feedback.rating},"${feedback.suggestion}","${feedback.timestamp}"\n`;
        fs.appendFileSync(csvFilePath, csvLine);
    } catch (error) {
        console.error('Error writing CSV file:', error);
    }
}

// Update CSV file completely (for updates)
function updateCsvFile(allData) {
    try {
        const csvHeader = 'ID,Name,SID,Email,Course,Rating,Suggestion,Timestamp\n';
        let csvContent = csvHeader;
        
        allData.forEach(feedback => {
            csvContent += `${feedback.id},"${feedback.name}","${feedback.sid}","${feedback.email}","${feedback.course}",${feedback.rating},"${feedback.suggestion}","${feedback.timestamp}"\n`;
        });
        
        fs.writeFileSync(csvFilePath, csvContent);
    } catch (error) {
        console.error('Error updating CSV file:', error);
    }
}

// Generate unique ID
function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// POST route to handle form submission
app.post('/submit-feedback', (req, res) => {
    try {
        const { name, sid, email, course, rating, suggestion } = req.body;
        
        // Validate required fields
        if (!name || !sid || !email || !course || !rating) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please fill all required fields' 
            });
        }
        
        // Read existing data
        const existingData = readJsonData();
        
        // Check if user already exists (by SID or email)
        const existingIndex = existingData.findIndex(
            feedback => feedback.sid === sid || feedback.email === email
        );
        
        const timestamp = new Date().toISOString();
        const feedbackData = {
            id: existingIndex !== -1 ? existingData[existingIndex].id : generateId(),
            name,
            sid,
            email,
            course,
            rating: parseInt(rating),
            suggestion: suggestion || '',
            timestamp
        };
        
        if (existingIndex !== -1) {
            // Update existing feedback
            existingData[existingIndex] = feedbackData;
            writeJsonData(existingData);
            updateCsvFile(existingData);
            
            res.json({ 
                success: true, 
                message: 'Feedback updated successfully!',
                action: 'updated'
            });
        } else {
            // Add new feedback
            existingData.push(feedbackData);
            writeJsonData(existingData);
            appendToCsv(feedbackData);
            
            res.json({ 
                success: true, 
                message: 'Feedback submitted successfully!',
                action: 'created'
            });
        }
        
    } catch (error) {
        console.error('Error processing feedback:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error occurred' 
        });
    }
});

// GET route to retrieve all feedback
app.get('/get-feedback', (req, res) => {
    try {
        const data = readJsonData();
        res.json({ success: true, data });
    } catch (error) {
        console.error('Error retrieving feedback:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error retrieving feedback' 
        });
    }
});

// GET route to check if user exists
app.get('/check-user/:identifier', (req, res) => {
    try {
        const identifier = req.params.identifier;
        const data = readJsonData();
        const existingUser = data.find(
            feedback => feedback.sid === identifier || feedback.email === identifier
        );
        
        res.json({ 
            exists: !!existingUser, 
            user: existingUser || null 
        });
    } catch (error) {
        console.error('Error checking user:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error checking user' 
        });
    }
});

// Initialize files on startup
initializeFiles();

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Feedback data will be saved to:');
    console.log('- JSON:', jsonFilePath);
    console.log('- CSV:', csvFilePath);
});
