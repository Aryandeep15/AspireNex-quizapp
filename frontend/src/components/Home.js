// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      <div className="genres-container">
        <h1>QuizMaker - By AspireNex</h1>
        <h2>Genres:</h2>
        <div className="genre-images">
          <Link to="/quizzes/Science">
            <img src="/SciQuiz.jpg" alt="Science Quiz" className="genre-image" />
          </Link>
          <Link to="/quizzes/Math">
            <img src="/MathQuiz.jpg" alt="Math Quiz" className="genre-image" />
          </Link>
          <Link to="/quizzes/History">
            <img src="/HistoryQuiz.jpg" alt="History Quiz" className="genre-image" />
          </Link>
          <Link to="/quizzes/Sports">
            <img src="/sportsquiz.jpg" alt="Sports Quiz" className="genre-image" />
          </Link>
          <Link to="/quizzes/GK">
            <img src="/QuizGK.jpg" alt="GK Quiz" className="genre-image" />
          </Link>
          <Link to="/quizzes/currentAffairs">
            <img src="/currentaffairs.png" alt="CurrentAffairs Quiz" className="genre-image" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
