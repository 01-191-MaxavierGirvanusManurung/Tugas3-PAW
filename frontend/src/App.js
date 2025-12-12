import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ReviewForm from './components/ReviewForm';
import ReviewResult from './components/ReviewResult';
import ReviewsList from './components/ReviewsList';

function App() {
  const [reviews, setReviews] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('analyze');

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/reviews');
      if (response.data.success) {
        setReviews(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle new review submission
  const handleAnalyze = async ({ productName, reviewText }) => {
    setLoading(true);
    setError(null);
    setCurrentResult(null);

    try {
      const response = await axios.post('/api/analyze-review', {
        product_name: productName,
        review_text: reviewText
      });

      if (response.data.success) {
        setCurrentResult(response.data.data);
        // Refresh the reviews list
        await fetchReviews();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while analyzing the review');
      console.error('Error analyzing review:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔍 Product Review Analyzer</h1>
        <p>Analyze product reviews with AI-powered sentiment analysis and key points extraction</p>
      </header>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'analyze' ? 'active' : ''}`}
          onClick={() => setActiveTab('analyze')}
        >
          Analyze Review
        </button>
        <button 
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Review History ({reviews.length})
        </button>
      </div>

      <main className="App-main">
        {activeTab === 'analyze' ? (
          <div className="analyze-section">
            <ReviewForm onSubmit={handleAnalyze} loading={loading} />
            
            {error && (
              <div className="error-message">
                <strong>Error:</strong> {error}
              </div>
            )}

            {loading && (
              <div className="loading-message">
                <div className="spinner"></div>
                <p>Analyzing review... This may take a few seconds.</p>
              </div>
            )}

            {currentResult && !loading && (
              <ReviewResult result={currentResult} />
            )}
          </div>
        ) : (
          <ReviewsList reviews={reviews} onRefresh={fetchReviews} />
        )}
      </main>

      <footer className="App-footer">
        <p>Powered by Hugging Face & Google Gemini</p>
      </footer>
    </div>
  );
}

export default App;
