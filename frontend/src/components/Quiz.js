import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizById } from '../api';
import Swal from 'sweetalert2';
import './Quiz.css'; 

const Quiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [score, setScore] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await getQuizById(id);
        setQuiz(data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleOptionClick = (option) => {
    const newQuestions = [...quiz.questions];
    newQuestions[currentQuestionIndex].selectedOption = option;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleQuizSubmit = () => {
    const totalQuestions = quiz.questions.length;
    const correctAnswers = quiz.questions.filter(question => {
      return question.selectedOption === question.correctAnswer;
    }).length;
    const percentageScore = (correctAnswers / totalQuestions) * 100;

    Swal.fire({
      title: 'Quiz Completed!',
      html: `You scored ${percentageScore}%`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Home',
      cancelButtonText: 'Retake Quiz'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/';
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        resetQuiz();
      }
    });

    setScore(percentageScore);
  };

  const resetQuiz = () => {
    const resetQuestions = quiz.questions.map(question => ({
      ...question,
      selectedOption: null,
    }));
    setQuiz({ ...quiz, questions: resetQuestions });
    setScore(null);
    setCurrentQuestionIndex(0);
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>Author: {quiz.author}</p>
      <div>
        <h3>{currentQuestion.questionText}</h3>
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`option ${currentQuestion.selectedOption === option ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="navigation-buttons">
        {currentQuestionIndex > 0 && (
          <button onClick={handlePreviousQuestion}>Previous</button>
        )}
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button onClick={handleNextQuestion}>Next</button>
        ) : (
          <button onClick={handleQuizSubmit}>Submit Quiz</button>
        )}
      </div>
      {score !== null && <p>Your Score: {score}%</p>}
    </div>
  );
};

export default Quiz;
