import { useState,useEffect } from 'react'
import {decode} from 'html-entities'
import './App.css'
import Quiz from './Quiz';

function App() {

  const [startQuiz, setStartQuiz] = useState(false)
  const [questions, setQuestions] = useState([])
  const [isRevealAnswerBtnHidden, setIsRevealAnswerBtnHidden] = useState(true)
  const [clickedAnswerTotalCount, setClickedAnswerTotalCount] = useState(0)
 
  useEffect(() => {
    if (startQuiz) {
      fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
        .then(res => res.json())
        .then(data => {
          setQuestions(data.results)
          setIsRevealAnswerBtnHidden(false)
          console.log(data);
        });
    }
  }, [startQuiz]);

  function toggleStartState() {
    setStartQuiz(prevStart => !prevStart);
  }

  function trackClickedAnswerTotalCount(){
    console.log(clickedAnswerTotalCount)
    setClickedAnswerTotalCount(prevCount => prevCount +1)
  }

  return (
    <main>
      <img className="blue-blob" src="./src/assets/images/blue-blob.png" alt="blue blob" />
      <img className="yellow-blob" src="./src/assets/images/yellow-blob.png" alt="yellow blob" />
      {!startQuiz && 
      <div className="initial-page">
        <h2 className="title">Trivial Quiz</h2>
        <p className='content'>Test your knowledge</p>
        <button onClick={toggleStartState}className='quiz-btn'>Start the quiz!</button>
      </div> 
      }
      {startQuiz && questions.length > 0 && (
        <section>
          {questions.map((quiz, index) => (
             <Quiz 
             key={index} 
             question={decode(quiz.question)} 
             correctAnswer={decode(quiz.correct_answer)} 
             incorrectAnswers={quiz.incorrect_answers.map(wrongAnswers => decode(wrongAnswers))}
             onAnswerClicked={trackClickedAnswerTotalCount}
              />              
          ))}
           {clickedAnswerTotalCount === questions.length ? (
            <button className='quiz-btn'>
              Check your answers
            </button>
          ) : (
            <div className='hidden-div'></div>
          )}
         </section>
      )}
    </main>
  );
}

export default App;