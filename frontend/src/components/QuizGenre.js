

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getQuizzesByGenre } from '../api';

const QuizGenre = () => {
  const { genre } = useParams();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await getQuizzesByGenre(genre);
        console.log(response.data);
        setQuizzes(response.data);
      } catch (error) {
        console.error(`Error fetching ${genre} quizzes:`, error);
      }
    };
    fetchQuizzes();
  }, [genre]);

  return (
    <div>
      <h2>{genre} Quizzes</h2>
      <div>
        {quizzes.length === 0 ? (
          <p>No quizzes available for this genre.</p>
        ) : (
          quizzes.map((quiz) => (
            <div key={quiz._id}>
              <h3>{quiz.title}</h3>
              <p>Author: {quiz.author}</p>
              <Link to={`/quiz/${quiz._id}`}>
                <button>Start Quiz</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuizGenre;
