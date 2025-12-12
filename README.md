# 🔍 Product Review Analyzer

A full-stack web application that analyzes product reviews using AI-powered sentiment analysis and key points extraction. Built with Flask, React, PostgreSQL, Hugging Face Transformers, and Google Gemini.

## ✨ Features

- **Sentiment Analysis**: Analyze review sentiment (positive/negative/neutral) using Hugging Face's DistilBERT model
- **Key Points Extraction**: Extract important insights from reviews using Google Gemini AI
- **Review Management**: Save and view all analyzed reviews
- **Modern UI**: Beautiful, responsive React interface with real-time feedback
- **RESTful API**: Well-structured backend with two main endpoints
- **Database Integration**: PostgreSQL database for persistent storage

## 🏗️ Project Structure

```
Tugas3/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── .env.example        # Environment variables template
│   └── .gitignore
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── ReviewForm.js
    │   │   ├── ReviewForm.css
    │   │   ├── ReviewResult.js
    │   │   ├── ReviewResult.css
    │   │   ├── ReviewsList.js
    │   │   └── ReviewsList.css
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── package.json
    └── .gitignore
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+ and npm
- PostgreSQL 12+
- Gemini API Key (Get from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Backend Setup

1. **Navigate to backend directory**:
   ```powershell
   cd backend
   ```

2. **Create and activate virtual environment**:
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. **Install dependencies**:
   ```powershell
   pip install -r requirements.txt
   ```

4. **Set up PostgreSQL database**:
   ```powershell
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE product_reviews;
   
   # Exit psql
   \q
   ```

5. **Configure environment variables**:
   ```powershell
   # Copy the example file
   cp .env.example .env
   
   # Edit .env file with your actual values:
   # DATABASE_URL=postgresql://postgres:your_password@localhost:5432/product_reviews
   # GEMINI_API_KEY=your_gemini_api_key_here
   ```

6. **Run the backend server**:
   ```powershell
   python app.py
   ```

   The backend will start on `http://localhost:5000`

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory**:
   ```powershell
   cd frontend
   ```

2. **Install dependencies**:
   ```powershell
   npm install
   ```

3. **Start the development server**:
   ```powershell
   npm start
   ```

   The frontend will open automatically at `http://localhost:3000`

## 📡 API Endpoints

### 1. Analyze Review
```http
POST /api/analyze-review
Content-Type: application/json

{
  "review_text": "This product is amazing! Great quality and fast delivery."
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "review_text": "This product is amazing! Great quality and fast delivery.",
    "sentiment": "positive",
    "sentiment_score": 0.9998,
    "key_points": "- High product quality\n- Fast delivery service\n- Overall satisfaction",
    "created_at": "2025-12-12T10:30:00"
  }
}
```

### 2. Get All Reviews
```http
GET /api/reviews?page=1&per_page=10
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "review_text": "This product is amazing!...",
      "sentiment": "positive",
      "sentiment_score": 0.9998,
      "key_points": "- High product quality...",
      "created_at": "2025-12-12T10:30:00"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total": 1,
    "pages": 1
  }
}
```

### 3. Health Check
```http
GET /api/health
```

**Response**:
```json
{
  "status": "healthy",
  "sentiment_analyzer": true,
  "gemini_configured": true
}
```

## 🛠️ Technology Stack

### Backend
- **Flask**: Web framework
- **Flask-CORS**: Cross-Origin Resource Sharing
- **Flask-SQLAlchemy**: ORM for database operations
- **PostgreSQL**: Database
- **Hugging Face Transformers**: Sentiment analysis
- **Google Gemini AI**: Key points extraction
- **python-dotenv**: Environment variable management

### Frontend
- **React**: UI library
- **Axios**: HTTP client
- **CSS3**: Styling with modern design

## 📊 Database Schema

### Reviews Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| review_text | TEXT | Original review text |
| sentiment | VARCHAR(20) | Sentiment label (positive/negative/neutral) |
| sentiment_score | FLOAT | Confidence score (0-1) |
| key_points | TEXT | Extracted key points |
| created_at | DATETIME | Timestamp |

## 🎨 Features in Detail

### 1. Review Input Form
- Textarea for entering product reviews
- Character counter
- Minimum 10 characters validation
- Loading state during analysis
- Form reset after submission

### 2. Analysis Results Display
- Sentiment badge with emoji and color coding
- Confidence score percentage
- Formatted key points in bullet format
- Original review text display
- Timestamp of analysis

### 3. Review History
- Grid layout of all analyzed reviews
- Sentiment indicators with colors
- Review excerpts (truncated)
- Key points preview
- Pagination support
- Refresh functionality

### 4. Error Handling
- Input validation
- API error messages
- Loading states
- Database connection errors
- AI service errors

## 🔧 Configuration

### Database Configuration
Edit `backend/.env`:
```env
DATABASE_URL=postgresql://username:password@host:port/database_name
```

### Gemini API Key
Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey) and add to `backend/.env`:
```env
GEMINI_API_KEY=your_api_key_here
```

## 📝 Usage Example

1. Open the application at `http://localhost:3000`
2. Enter a product review in the text area
3. Click "Analyze Review"
4. View the sentiment analysis and key points
5. Switch to "Review History" tab to see all past reviews
6. Click "Refresh" to update the list

## 🐛 Troubleshooting

### Backend Issues

**Problem**: ModuleNotFoundError
```powershell
# Solution: Activate virtual environment and reinstall
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

**Problem**: Database connection error
```powershell
# Solution: Check if PostgreSQL is running
Get-Service -Name postgresql*

# Check database exists
psql -U postgres -l
```

**Problem**: Hugging Face model download slow
- The first run will download the sentiment analysis model (~250MB)
- Subsequent runs will use the cached model

### Frontend Issues

**Problem**: npm install fails
```powershell
# Solution: Clear cache and reinstall
npm cache clean --force
rm -r node_modules
npm install
```

**Problem**: Proxy error / Backend not reachable
- Ensure backend is running on port 5000
- Check `package.json` proxy setting: `"proxy": "http://localhost:5000"`

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use environment variables for sensitive data
- Implement rate limiting for production
- Add authentication for production use
- Sanitize user inputs
- Use HTTPS in production

## 📈 Future Enhancements

- [ ] User authentication and authorization
- [ ] Advanced filtering and search
- [ ] Export reviews to CSV/PDF
- [ ] Batch review analysis
- [ ] Sentiment trend charts
- [ ] Multi-language support
- [ ] Review categorization
- [ ] API rate limiting
- [ ] Caching layer
- [ ] Docker containerization

## 📄 License

This project is for educational purposes as part of Pemweb coursework.

## 👨‍💻 Author

Created for Tugas 3 - Pemrograman Web

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co/) for sentiment analysis models
- [Google Gemini](https://ai.google.dev/) for AI-powered text analysis
- [Flask](https://flask.palletsprojects.com/) for backend framework
- [React](https://react.dev/) for frontend library
- [PostgreSQL](https://www.postgresql.org/) for database

---

**Note**: This application requires active internet connection for:
- First-time download of Hugging Face models
- Google Gemini API calls for key points extraction

For any issues or questions, please refer to the troubleshooting section or check the API health endpoint at `http://localhost:5000/api/health`.
