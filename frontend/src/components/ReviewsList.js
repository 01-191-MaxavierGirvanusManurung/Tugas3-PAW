import React from 'react';
import './ReviewsList.css';

function ReviewsList({ reviews, onRefresh }) {
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
    <div className="reviews-list-container">
      <div className="list-header">
        <h2>Review History</h2>
        <button onClick={onRefresh} className="refresh-button">
          🔄 Refresh
        </button>
      </div>

      {reviews.length === 0 ? (
        <div className="empty-state">
          <p>No reviews yet. Start by analyzing your first review!</p>
        </div>
      ) : (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-card-header">
                <span 
                  className="sentiment-indicator"
                  style={{ backgroundColor: getSentimentColor(review.sentiment) }}
                >
                  {getSentimentEmoji(review.sentiment)} {review.sentiment}
                </span>
                <span className="review-date">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="review-card-body">
                <h4 className="product-name-title">{review.product_name}</h4>
                <p className="review-excerpt">
                  {review.review_text.length > 150
                    ? review.review_text.substring(0, 150) + '...'
                    : review.review_text}
                </p>
              </div>

              <div className="review-card-footer">
                <div className="key-points-preview">
                  <strong>Key Points:</strong>
                  {review.key_points.split('\n').filter(p => p.trim()).slice(0, 2).map((point, idx) => (
                    <div key={idx} className="key-point-mini">{point}</div>
                  ))}
                  {review.key_points.split('\n').filter(p => p.trim()).length > 2 && (
                    <small>+ more...</small>
                  )}
                </div>
                <div className="confidence-score">
                  Confidence: {(review.sentiment_score * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewsList;
