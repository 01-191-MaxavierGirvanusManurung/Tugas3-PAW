import React, { useState } from 'react';
import './ReviewForm.css';

function ReviewForm({ onSubmit, loading }) {
  const [productName, setProductName] = useState('');
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productName.trim() && reviewText.trim() && !loading) {
      onSubmit({ productName, reviewText });
      setProductName('');
      setReviewText('');
    }
  };

  return (
    <div className="review-form-container">
      <h2>Submit Your Product Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name..."
          disabled={loading}
          required
          className="product-name-input"
        />
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Enter your product review here... (minimum 10 characters)"
          rows="6"
          disabled={loading}
          required
        />
        <div className="form-footer">
          <span className="char-count">
            {reviewText.length} characters
          </span>
          <button 
            type="submit" 
            disabled={loading || !productName.trim() || reviewText.trim().length < 10}
            className="submit-button"
          >
            {loading ? 'Analyzing...' : 'Analyze Review'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
