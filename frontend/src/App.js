

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import QuizGenre from './components/QuizGenre';
import Quiz from './components/Quiz';
import CreateQuiz from './components/CreateQuiz';
import Navbar from './components/NavBar';
import Footer from './components/Footer';

const PrivateRoute = ({ redirectPath = '/login' }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/quizzes/:genre" element={<QuizGenre />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
