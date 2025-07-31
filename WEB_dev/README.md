# Feedback Form Application

A complete feedback form application with data persistence that saves submissions to both JSON and CSV files.

## Features

- ✅ Interactive star rating system
- ✅ Form validation with required fields
- ✅ Data persistence in JSON and CSV formats
- ✅ Automatic user detection and form pre-filling
- ✅ Update existing feedback functionality
- ✅ Real-time feedback messages
- ✅ Responsive design
- ✅ Download data as JSON/CSV files

## Available Versions

### 1. Full-Stack Version (Recommended)
- **Files**: `index.html`, `server.js`, `package.json`
- **Features**: Server-side data persistence, automatic file management
- **Requirements**: Node.js

### 2. Standalone Version (No Server Required)
- **File**: `index_standalone.html`
- **Features**: Client-side storage (localStorage), download functionality
- **Requirements**: Just a modern web browser

## Quick Start (Standalone Version)

1. Open `index_standalone.html` in any modern web browser
2. Fill out the feedback form and submit
3. Data is stored in browser's localStorage
4. Download JSON/CSV files using the download buttons

## Full Setup (Server Version)

### Prerequisites
- Install [Node.js](https://nodejs.org/) (version 14 or higher)

### Installation

1. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

3. **Open the application:**
   Open your browser and go to: `http://localhost:3000`

## Project Structure

```
WEB_dev/
├── index.html              # Full-stack frontend (requires server)
├── index_standalone.html   # Standalone version (no server needed)
├── server.js              # Backend Express server
├── package.json           # Node.js dependencies
├── feedback_data.json     # JSON data storage (auto-created)
├── feedback_data.csv      # CSV data storage (auto-created)
└── README.md             # Documentation
```

## How It Works

### Frontend (index.html)
- Responsive feedback form with star rating system
- Client-side validation
- AJAX form submission
- Auto-detection of existing users
- Real-time success/error messages

### Backend (server.js)
- Express.js server handling form submissions
- Data storage in both JSON and CSV formats
- User existence checking via SID or email
- Update functionality for existing feedback
- CORS enabled for cross-origin requests

### Data Storage

**JSON Format (`feedback_data.json`):**
```json
[
  {
    "id": "unique_id",
    "name": "Student Name",
    "sid": "Student ID",
    "email": "email@example.com",
    "course": "Course Code",
    "rating": 5,
    "suggestion": "Optional suggestion",
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
]
```

**CSV Format (`feedback_data.csv`):**
```csv
ID,Name,SID,Email,Course,Rating,Suggestion,Timestamp
unique_id,"Student Name","Student ID","email@example.com","Course Code",5,"Optional suggestion","2024-01-01T12:00:00.000Z"
```

## API Endpoints

- `POST /submit-feedback` - Submit new or update existing feedback
- `GET /get-feedback` - Retrieve all feedback data
- `GET /check-user/:identifier` - Check if user exists by SID or email

## Usage

1. **New Submission:**
   - Fill out all required fields (marked with *)
   - Select a star rating (1-5 stars)
   - Add optional suggestions
   - Click Submit

2. **Update Existing Feedback:**
   - Enter your SID or email (if you've submitted before)
   - The form will auto-populate with your previous data
   - Make changes and submit to update

3. **Data Access:**
   - JSON data: `feedback_data.json`
   - CSV data: `feedback_data.csv`
   - Both files are automatically created and updated

## Features Explained

### Star Rating System
- Click to set permanent rating
- Hover to preview rating
- Visual feedback with orange color
- Hidden input field stores the rating value

### Form Validation
- Required fields validation
- Email format validation
- Rating selection requirement
- Real-time error messages

### Data Persistence
- Automatic file creation
- JSON for structured data access
- CSV for spreadsheet compatibility
- Timestamp tracking
- Unique ID generation

### User Experience
- Loading states during submission
- Success/error message display
- Form auto-population for existing users
- Responsive design for all devices

## Development

To modify the application:

1. **Frontend changes:** Edit `index.html`
2. **Backend changes:** Edit `server.js`
3. **Styling:** Modify the `<style>` section in `index.html`
4. **Add dependencies:** Update `package.json`

## Troubleshooting

- **Port 3000 already in use:** Change PORT variable in `server.js`
- **File permission errors:** Ensure write permissions in the project directory
- **Network errors:** Check if server is running and CORS is properly configured
- **Form not submitting:** Check browser console for JavaScript errors

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT License - feel free to use and modify as needed.
