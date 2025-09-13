# TrendPulse: Social Media Sentiment Analyzer

- TrendPulse is a full-stack application built to analyze social media content (with primary focus on Twitter/X) for **sentiment, emotion, engagement, and trends**.  
- The platform provides **real-time insights, interactive dashboards, and historical analysis tracking**, helping users and organizations understand public opinion at scale.
- Designed for developers, researchers, and organizations, it delivers actionable insights through interactive dashboards powered by advanced Natural Language Processing (NLP) and Machine Learning (ML).
- By combining **FastAPI, React/Tailwind, and Firebase**, TrendPulse ensures scalability, speed, and security while maintaining a user-friendly interface.

---

## Overview

TrendPulse addresses the challenge of **extracting meaningful insights from this noisy stream** by combining:

- **Natural Language Processing (NLP)** to identify sentiment and emotions.
- **Keyword extraction** to highlight trending topics and discussions.
- **Interactive visualization** to present insights in a user-friendly manner.
- **Historical tracking** to allow comparisons across time and topics.

The result is a **scalable, user-friendly, and data-driven sentiment intelligence platform**.

---
### Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Recharts, Framer Motion
- **Backend**: Python, FastAPI, PyTorch, Hugging Face Transformers, aiohttp
- **Data Processing**: NLTK, Regex, TF-IDF
- **Auth & Storage**: Firebase Authentication, Firestore
 ---
## Key Features

### Data Collection
- Asynchronous tweet ingestion with **rate-limiting** for stability from a paid Twitter/X Scrapper.
- Metadata extraction (engagement metrics, hashtags, author details).
- Built-in filters(during data fetching) for text quality (length, duplicates, profanity).

### Text Processing & Analysis
- **Cleaning**: Regex-based preprocessing removes noise (URLs, mentions, emojis, hashtags).
- **Preprocessing**: Tokenization, stopword removal, lemmatization (NLTK).
- **Sentiment Analysis**: Transformer-based classification (`twitter-roberta-base-sentiment-latest`).
- **Emotion Detection**: Multi-label emotion classification across **11 categories**.
- **Keyword Extraction**: TF-IDF to identify top keywords and phrases.
- **Profanity Filtering**: Screens offensive content for safer results(restrains offensive data from being displayed on the frontend).

### Visualization & Dashboards
- **Overall Sentiment Index**: Aggregated distribution of positive, negative, and neutral sentiment.
- **Sentiment Over Time**: Line and area charts for temporal sentiment shifts.
- **Emotion Analysis**: Bar and radial charts displaying emotional distribution.
- **Engagement Metrics**: Interactive cards and charts for likes, replies, retweets, and views.
- **Top Tweets**: Sorted, filterable list of tweets ranked by engagement.

### User Experience
- **Modern UI/UX** built with Tailwind CSS, Radix UI, and Framer Motion animations.
- **Responsive Design** ensuring smooth performance across devices.
- **Authentication & Persistence** powered by Firebase (Auth + Firestore Database).
- **History Tracking**: Save and revisit previous analyses for long-term insights.
- **Error Handling & Feedback**: Comprehensive handling for API errors, missing data, and authentication states.

---

## System Architecture

### Frontend
- **Framework**: React (Vite) for fast, modular development.
- **UI Layer**: Tailwind CSS + Radix UI + Lucide Icons for clean and accessible interfaces.
- **State Management**: React Context API for authentication and user session handling.
- **Charts & Animations**: Recharts for interactive visualizations, Framer Motion for smooth animations.
- **Authentication**: Firebase Auth for secure login, registration, and password management.
- **Data Persistence**: Firebase Firestore stores analysis results and user history.

### Backend
- **Framework**: FastAPI for high-performance REST APIs.
- **Tweet Ingestion**: `aiohttp` with concurrency and request throttling.
- **Text Processing**: Regex cleaning, NLTK tokenization, stopword removal, and lemmatization.
- **Sentiment Analysis**: HuggingFace Transformer (`Roberta`) fine-tuned for Twitter sentiment.
- **Emotion Detection**: Multi-label HuggingFace model for emotion classification.
- **Keyword Extraction**: TF-IDF vectorization for corpus-level keyword scoring.
- **Batch Processing**: Sentiment and emotion inference in batches (size 32) for efficiency.
- **Profanity Detection**: `better-profanity` to flag or filter inappropriate content.
- **Data Format**: Results returned in structured JSON for frontend consumption.

---

## Component Breakdown

### Backend
- **Main API (Main.py)**: Central orchestrator, exposes `/analyze/` endpoint.
- **Fetch_Tweets.py**: Asynchronous tweet collection with cursor-based pagination.
- **Text_Cleaning.py**: Regex-based text normalization.
- **Text_Preprocessing.py**: Tokenization, stopword removal, and lemmatization.
- **Sentiment_Analysis.py**: Batched inference with HuggingFace Transformers.
- **Emotion_Detection.py**: Multi-label classification across predefined emotions.
- **Keyword_Extractor.py**: TF-IDF based keyword scoring.

### Frontend
- **Core Layout**: `App.jsx`, `main.jsx` (routing, protected routes).
- **Navigation**: `Header.jsx` with user state sync and responsive menus.
- **Search & Analysis**: `SearchBar.jsx` for queries and result saving.
- **Dashboards**:
  - `QuickStats.jsx`: Summary metrics (tweets, likes, shares).
  - `OverallSentiment.jsx`: Sentiment index and distribution.
  - `SentimentOverTime.jsx`: Time-based sentiment trends.
  - `EngagementData.jsx`: Engagement analysis with filtering.
  - `TopTweets.jsx` & `TweetDisplay.jsx`: Filterable tweets by engagement.
  - `EmotionAnalysis.jsx`: Visual breakdown of detected emotions.
- **Authentication**: Login, Register, Password Reset, and Protected Routes.
- **History Management**: `DisplayHistory.jsx` and `PrevResultDisplay.jsx` for saved results.
- **UI Components (Shadcn UI)**: Reusable Button, Card, Chart, Input, Select, Table, Tooltip.

---

## Data Flow

1. User logs in or registers with Firebase Auth.  
2. User enters a query in the frontend.  
3. Request is sent to FastAPI backend.  
4. Tweets are fetched asynchronously and cleaned.  
5. NLP models process sentiment, emotions, and extract keywords.  
6. JSON response returned to frontend.  
7. Results displayed in interactive dashboards.  
8. User may save results to Firestore for history tracking.  

---

## Performance & Scalability

- **Async API Calls**: Supports up to 18 requests/second with rate-limiting.  
- **Batch Processing**: 32 tweets processed per batch for optimized inference.  
- **Modular Pipeline**: Independent modules for fetching, cleaning, sentiment, emotion, and keywords.  
- **Cloud-Ready**: Stateless FastAPI design suitable for scaling via containers.  
- **Secure Auth**: Firebase Auth integration ensures multi-user access control.  

---

## Impact

- Reduced API overhead by **~60%** through asynchronous fetching and batching.  
- Delivered **real-time insights** on sentiment and emotions from live social streams.  
- Supported **multi-user environments** with authentication and persistent storage.  
- Designed with **scalability and maintainability** in mind for future extensions (e.g., multi-platform ingestion).  

---

### Use Cases

- **Market Research**: Gauge public opinion about brands, products, or campaigns.
- **Political Analysis**: Track voter sentiment and trending narratives.
- **Event Monitoring**: Understand audience emotions during sports, festivals, or crises.
- **Academic Research**: Provide NLP datasets and insights into social media behavior.

## Future Enhancements

- Support for additional social media platforms (Reddit, YouTube, Instagram).  
- Advanced topic modeling for deeper trend discovery.  
- Customizable sentiment/emotion lexicons for domain-specific use cases.  
- Real-time streaming dashboards with WebSocket support.  
- User-defined alerting system for sentiment spikes.  

---

## License

This project is licensed under the **MIT License**.  
See the LICENSE file for details.
