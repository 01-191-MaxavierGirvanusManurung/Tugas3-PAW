from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from dotenv import load_dotenv
from transformers import pipeline
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:password@localhost:5432/product_reviews')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Initialize sentiment analyzer (Hugging Face)
try:
    sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
except Exception as e:
    print(f"Error loading sentiment analyzer: {e}")
    sentiment_analyzer = None

# Configure Gemini API
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

# Database Model
class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(255), nullable=False)
    review_text = db.Column(db.Text, nullable=False)
    sentiment = db.Column(db.String(20), nullable=False)
    sentiment_score = db.Column(db.Float, nullable=False)
    key_points = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'product_name': self.product_name,
            'review_text': self.review_text,
            'sentiment': self.sentiment,
            'sentiment_score': self.sentiment_score,
            'key_points': self.key_points,
            'created_at': self.created_at.isoformat()
        }

# Create tables
with app.app_context():
    db.create_all()

def analyze_sentiment(text):
    """Analyze sentiment using Hugging Face"""
    try:
        if sentiment_analyzer is None:
            return {'sentiment': 'neutral', 'score': 0.5}
        
        result = sentiment_analyzer(text[:512])[0]  # Limit text length
        label = result['label'].lower()
        score = result['score']
        
        # Map labels to sentiment
        if label == 'positive':
            sentiment = 'positive'
        elif label == 'negative':
            sentiment = 'negative'
        else:
            sentiment = 'neutral'
            
        return {'sentiment': sentiment, 'score': score}
    except Exception as e:
        print(f"Error in sentiment analysis: {e}")
        return {'sentiment': 'neutral', 'score': 0.5}

def extract_key_points(text):
    """Extract key points using Gemini"""
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        prompt = f"""Analyze the following product review and extract 3-5 key points in a concise bullet-point format. 
Focus on the most important aspects mentioned (features, quality, price, service, etc.).

Review: {text}

Provide only the bullet points, one per line, starting with a dash (-)."""
        
        response = model.generate_content(prompt)
        key_points = response.text.strip()
        
        return key_points
    except Exception as e:
        print(f"Error in key points extraction: {e}")
        return "- Unable to extract key points at this time"

@app.route('/api/analyze-review', methods=['POST'])
def analyze_review():
    """Analyze a new product review"""
    try:
        data = request.get_json()
        
        if not data or 'review_text' not in data:
            return jsonify({'error': 'Review text is required'}), 400
        
        if not data or 'product_name' not in data:
            return jsonify({'error': 'Product name is required'}), 400
        
        product_name = data['product_name'].strip()
        review_text = data['review_text'].strip()
        
        if not product_name:
            return jsonify({'error': 'Product name cannot be empty'}), 400
        
        if not review_text:
            return jsonify({'error': 'Review text cannot be empty'}), 400
        
        if len(review_text) < 10:
            return jsonify({'error': 'Review text is too short (minimum 10 characters)'}), 400
        
        # Analyze sentiment
        sentiment_result = analyze_sentiment(review_text)
        
        # Extract key points
        key_points = extract_key_points(review_text)
        
        # Save to database
        review = Review(
            product_name=product_name,
            review_text=review_text,
            sentiment=sentiment_result['sentiment'],
            sentiment_score=sentiment_result['score'],
            key_points=key_points
        )
        
        db.session.add(review)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': review.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"Error analyzing review: {e}")
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    """Get all reviews"""
    try:
        # Get query parameters for pagination
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        # Query reviews with pagination
        reviews_query = Review.query.order_by(Review.created_at.desc())
        reviews_paginated = reviews_query.paginate(page=page, per_page=per_page, error_out=False)
        
        reviews = [review.to_dict() for review in reviews_paginated.items]
        
        return jsonify({
            'success': True,
            'data': reviews,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': reviews_paginated.total,
                'pages': reviews_paginated.pages
            }
        }), 200
        
    except Exception as e:
        print(f"Error fetching reviews: {e}")
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'sentiment_analyzer': sentiment_analyzer is not None,
        'gemini_configured': os.getenv('GEMINI_API_KEY') is not None
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000, use_reloader=False)
