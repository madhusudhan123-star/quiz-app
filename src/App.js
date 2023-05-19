import React, { useState, useEffect } from 'react';
import './App.css';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Madrid', 'Rome'],
    answer: 'Paris'
  },
  {
    question: "Which of the following is the correct name of React.js?",
    options:['React', 'React.js', 'ReactJS', 'All of the above'],
    answer: "All of the above"
  },
  {
    question:"Which of the following are the advantages of React.js?",
    options:["React.js can increase the application's performance with Virtual DOM.","React.js is easy to integrate with other frameworks such as Angular, BackboneJS since it is only a view library.","React.js can render both on client and server side.","All of the above"],
    answer: "All of the above"
  },
  {
    question:"What of the following is used in React.js to increase performance?",
    options:['Original DOM', 'Virtual DOM', 'Both A and B.', 'None of the above.'],
    answer: "Virtual DOM"
  },
  {
    question:"What is the default port where webpack-server runs?",
    options: ['3000', '8080', '3030', '6060'],
    answer:"3000"
  }
  // Add more questions here
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setQuizCompleted(true);
    }
  }, [timeRemaining]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption('');
    if (currentQuestion === questions.length - 1) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const renderOptions = () => {
    return questions[currentQuestion].options.map((option, index) => (
      <button
        key={index}
        onClick={() => handleOptionSelect(option)}
        className={selectedOption === option ? 'selected' : ''}
        disabled={quizCompleted}
      >
        {option}
      </button>
    ));
  };

  return (
    <div className="App">
      <h1>Quiz App</h1>
      {!quizCompleted ? (
        <>
          <h2>{questions[currentQuestion].question}</h2>
          <div className="options">{renderOptions()}</div>
          <button className='button' onClick={handleNextQuestion} disabled={!selectedOption}>
            Next
          </button>
          <div className="timer">Time Remaining: {timeRemaining} seconds</div>
        </>
      ) : (
        <div className="result">Your score: {score}</div>
      )}
    </div>
  );
}

export default App;
