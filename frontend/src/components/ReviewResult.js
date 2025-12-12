import React from 'react';
import './ReviewResult.css';

function ReviewResult({ result }) {
  const getSentimentEmoji = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😞';
      case 'neutral':
        return '😐';
      default:
        return '🤔';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return '#4caf50';
      case 'negative':
        return '#f44336';
      case 'neutral':
        return '#ff9800';
      default:
        return '#9e9e9e';
    }
  };

  return (
    <div className="review-result">
      <h2>Analysis Results</h2>
      
      <div className="result-section">
        <h3>Product: {result.product_name}</h3>
      </div>

      <div className="result-section">
        <h3>Original Review</h3>
        <div className="review-text">
          {result.review_text}
        </div>
      </div>

      <div className="result-section">
        <h3>Sentiment Analysis</h3>
        <div 
          className="sentiment-badge"
          style={{ backgroundColor: getSentimentColor(result.sentiment) }}
        >
          <span className="sentiment-emoji">{getSentimentEmoji(result.sentiment)}</span>
          <span className="sentiment-label">{result.sentiment.toUpperCase()}</span>
          <span className="sentiment-score">
            {(result.sentiment_score * 100).toFixed(1)}% confidence
          </span>
        </div>
      </div>

      <div className="result-section">
        <h3>Key Points</h3>
        <div className="key-points">
          {result.key_points.split('\n').filter(point => point.trim()).map((point, index) => (
            <div key={index} className="key-point">
              {point}
            </div>
          ))}
        </div>
      </div>

      <div className="result-meta">
        <small>Analyzed on {new Date(result.created_at).toLocaleString()}</small>
      </div>
    </div>
  );
}

export default ReviewResult;
