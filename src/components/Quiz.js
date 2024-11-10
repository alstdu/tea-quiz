import React, { useState } from 'react';
import { quizQuestions, teaResults, teaTips } from '../QuizData';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const calculateResult = () => {
    const counts = answers.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
    
    const result = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    return teaResults[result];
  };

  if (showResult) {
    const result = calculateResult();
    const tips = teaTips[result.name.toLowerCase().split(' ')[0]];

    return (
      <div className="quiz-container">
        <h2>Your Tea Personality Is:</h2>
        <h3>{result.name}</h3>
        <p>{result.description}</p>
        
        <div className="brewing-tips">
          <h4>How to Brew Your Tea:</h4>
          <p><strong>Temperature:</strong> {tips.brewTemp}</p>
          <p><strong>Brewing Time:</strong> {tips.brewTime}</p>
          <div className="tips-list">
            <strong>Pro Tips:</strong>
            <ul>
              {tips.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        <button 
          onClick={restartQuiz}
          className="restart-button"
        >
          Take Quiz Again
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
        ></div>
        <div className="progress-text">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </div>
      </div>
      <h2>Question {currentQuestion + 1}</h2>
      <p>{quizQuestions[currentQuestion].question}</p>
      <div className="options">
        {quizQuestions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option.value)}
            className="option-button"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
