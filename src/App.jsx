import { useState,useEffect } from 'react'
import './App.css'
import Quiz from './Quiz';

function App() {

  const [startQuiz, setStartQuiz] = useState(false)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    if (startQuiz) {
      fetch("https://opentdb.com/api.php?amount=6&difficulty=medium&type=multiple")
        .then(res => res.json())
        .then(data => {
          setQuestions(data.results);
          console.log(data);
        });
    }
  }, [startQuiz]);

  function toggleStartState() {
    setStartQuiz(prevStart => !prevStart);
  }

  return (
    <main>
      <img className="blue-blob" src="./src/assets/images/blue-blob.png" alt="blue blob" />
      <img className="yellow-blob" src="./src/assets/images/yellow-blob.png" alt="yellow blob" />
      {!startQuiz && 
      <div className="initial-page">
        <h2 className="title">Trivial Quiz</h2>
        <p className='content'>Test your knowledge</p>
        <button onClick={toggleStartState}className='start-quiz-btn'>Start the quiz!</button>
      </div> 
      }
      {startQuiz && (
        <div>
          {questions.map((quiz, index) => (
            <Quiz key={index} question={quiz.question} correctAnswer={quiz.correct_answer} incorrectAnswers={quiz.incorrect_answers}/>
          ))}
        </div>
      )}
    </main>
  );
}

export default App;