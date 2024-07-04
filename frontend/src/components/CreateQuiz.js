import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createQuiz } from '../api';
import './CreateQuiz.css'; 
const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const navigate = useNavigate();

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === 'questionText') {
      newQuestions[index].questionText = value;
    } else if (field === 'correctAnswer') {
      newQuestions[index].correctAnswer = value;
    } else {
      newQuestions[index].options[field] = value;
    }
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newQuiz = { title, genre, author, questions };
      await createQuiz(newQuiz);
      Swal.fire({
        title: 'Quiz Created!',
        text: 'Your quiz has been successfully created.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error('Error creating quiz:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error creating the quiz.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="create-quiz-container">
      <h1>Create Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)} required>
            <option value="" disabled>Select genre</option>
            <option value="science">Science</option>
            <option value="math">Math</option>
            <option value="history">History</option>
            <option value="Sports">Sports</option>
            <option value="GK">GK</option>
            <option value="currentAffairs">Current Affairs</option>
          </select>
        </div>
        <div className="form-group">
          <label>Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div>
          <h2>Questions</h2>
          {questions.map((question, index) => (
            <div key={index} className="question-group">
              <label>Question Text</label>
              <input type="text" value={question.questionText} onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)} required />
              <div>
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className="option-group">
                    <label>Option {optIndex + 1}</label>
                    <input type="text" value={option} onChange={(e) => handleQuestionChange(index, optIndex, e.target.value)} required />
                  </div>
                ))}
              </div>
              <div className="form-group">
                <label>Correct Answer</label>
                <input type="text" value={question.correctAnswer} onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)} required />
              </div>
              <button type="button" onClick={() => deleteQuestion(index)}>Delete Question</button>
            </div>
          ))}
          <button type="button" onClick={addQuestion}>Add Question</button>
        </div>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default CreateQuiz;
