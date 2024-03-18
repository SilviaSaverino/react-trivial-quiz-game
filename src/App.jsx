import { useState,useEffect } from 'react'
import {decode} from 'html-entities'
import './App.css'
import Quiz from './Quiz';

function App() {

  const [startQuiz, setStartQuiz] = useState(false)
  const [questions, setQuestions] = useState([])
  const [isRevealAnswerBtnHidden, setIsRevealAnswerBtnHidden] = useState(true)
  const [clickedAnswerTotalCount, setClickedAnswerTotalCount] = useState(0)
  const [selectedAnswer, setSelectedAnswers] = useState([])
  const [results, setResults] = useState([])
  const [showCorrectAnswerCount, setShowCorrectAnswerCount] = useState(false)
 
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
   // console.log(clickedAnswerTotalCount)
    setClickedAnswerTotalCount(prevCount => prevCount +1)
  }

  function updateSelectedAnswerArray(index, answer) {
    setSelectedAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = answer;
      return updatedAnswers;
    });
  }

  function revealAnswers(){
    const correctAnswers = questions.map(quiz => decode(quiz.correct_answer))
    console.log(correctAnswers)
    const results = questions.map((quiz, index) => ({
      isCorrectAnswer : selectedAnswer[index] === correctAnswers[index]
    }))
    console.log(results)
    setResults(results)
    setShowCorrectAnswerCount(true)
  }

  function getCorrectAnswerCount(){
    const correctCount = results.filter(result => result && result.isCorrectAnswer).length
    return correctCount
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
             updateSelectedAnswer={(answer) => updateSelectedAnswerArray(index, answer)}
             results={results[index]}
              />              
          ))}
           {clickedAnswerTotalCount === questions.length && !showCorrectAnswerCount && (
           <button 
            className='quiz-btn'
            onClick={revealAnswers}
            >
              Check your answers
            </button>
          )}
          {showCorrectAnswerCount && 
          <div className='answers-count'>
            <h3>Correct Answers: {getCorrectAnswerCount()}/{questions.length}</h3>
            <button className='quiz-btn'>
              Play Again
            </button>
          </div>
          }
         </section>
      )}
    </main>
  );
}

export default App;