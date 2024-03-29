import { useState,useEffect, useRef } from 'react'
import Confetti from 'react-confetti'
import { decode } from 'html-entities'
import './App.css'
import Quiz from './Quiz';

function App() {
  const sectionRef = useRef(null);
  const [startQuiz, setStartQuiz] = useState(false)
  const [questions, setQuestions] = useState([])
  const [isRevealAnswerBtnHidden, setIsRevealAnswerBtnHidden] = useState(true)
  const [clickedAnswerTotalCount, setClickedAnswerTotalCount] = useState(0)
  const [selectedAnswer, setSelectedAnswers] = useState([])
  const [results, setResults] = useState([])
  const [showCorrectAnswerCount, setShowCorrectAnswerCount] = useState(false)
  const [playAgain, setPlayAgain] = useState()
  const [showConfetti, setShowConfetti] = useState(false)
  const [formData, setFormData] = useState(
    {
      difficulty: "easy",
      questionsNumber: "5"
    }
  )

  useEffect(() => {
    if (startQuiz) {
      fetch(`https://opentdb.com/api.php?amount=${formData.questionsNumber}&difficulty=${formData.difficulty}&type=multiple`)
        .then(res => res.json())
        .then(data => {
          setQuestions(data.results)
          setIsRevealAnswerBtnHidden(false)
          setPlayAgain(true)
        });
    }
  }, [startQuiz]);

  function handleDifficultyAndQuestionNumbersSetUp(event){
    const { name, value, type, checked } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  function toggleStartState() {
    setStartQuiz(prevStart => !prevStart);
  }

  function trackClickedAnswerTotalCount() {
    setClickedAnswerTotalCount(prevCount => prevCount + 1)
  }

  function updateSelectedAnswerArray(index, answer) {
    setSelectedAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = answer;
      return updatedAnswers;
    });
  }

  function revealAnswers() {
    const correctAnswers = questions.map(quiz => decode(quiz.correct_answer))
    const results = questions.map((quiz, index) => ({
      isCorrectAnswer: selectedAnswer[index] === correctAnswers[index]
    }))
    setResults(results)
    setShowCorrectAnswerCount(true)

    const allCorrect = results.every(result => result.isCorrectAnswer === true);
    if (allCorrect) {
      setShowConfetti(true);
    }

    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function getCorrectAnswerCount() {
    const correctCount = results.filter(result => result && result.isCorrectAnswer).length
    return correctCount
  }

  function handlePlayAgainBtn(){
    setPlayAgain(false)
    setStartQuiz(false)
    setShowCorrectAnswerCount(false)
    setClickedAnswerTotalCount(0)
    setSelectedAnswers([])
    setQuestions([])
    setResults([])
    setShowConfetti(false)
    setFormData({
      difficulty:"easy",
      questionsNumber: "5"
    })
  }

  return (
    <main>
      <img className="blue-blob" src="./images/blue-blob.png" alt="blue blob" />
      <img className="yellow-blob" src="./images/yellow-blob.png" alt="yellow blob" />
      {!startQuiz &&
        <div className="initial-page">
          <h2 className="title">Trivial Quiz</h2>
          <p className='content'>Test your knowledge</p>
          <form>
            <fieldset>
              <legend>Set the quiz difficulty</legend>
              <input
                type="radio"
                id="easy"
                name="difficulty"
                value="easy"
                checked={formData.difficulty === "easy"}
                onChange={handleDifficultyAndQuestionNumbersSetUp}
              />
              <label htmlFor="unemployed">Easy</label>
              <input
                type="radio"
                id="medium"
                name="difficulty"
                value="medium"
                checked={formData.difficulty === "medium"}
                onChange={handleDifficultyAndQuestionNumbersSetUp}
              />
              <label htmlFor="part-time">Medium</label>
              <input
                type="radio"
                id="hard"
                name="difficulty"
                value="hard"
                checked={formData.difficulty === "hard"}
                onChange={handleDifficultyAndQuestionNumbersSetUp}
              />
              <label htmlFor="full-time">Hard</label>
            </fieldset>
            <fieldset>
              <legend>Set the number of questions</legend>
              <input
                type="radio"
                id="5"
                name="questionsNumber"
                value="5"
                checked={formData.questionsNumber === "5"}
                onChange={handleDifficultyAndQuestionNumbersSetUp}
              />
              <label htmlFor="full-time">5</label>
              <input
                type="radio"
                id="10"
                name="questionsNumber"
                value="10"
                checked={formData.questionsNumber === "10"}
                onChange={handleDifficultyAndQuestionNumbersSetUp}
              />
              <label htmlFor="full-time">10</label>
              <input
                type="radio"
                id="15"
                name="questionsNumber"
                value="15"
                checked={formData.questionsNumber === "15"}
                onChange={handleDifficultyAndQuestionNumbersSetUp}
              />
              <label htmlFor="full-time">15</label>
            </fieldset>
          </form>
          <button onClick={toggleStartState} className='quiz-btn start-quiz'>Start the quiz!</button>
        </div>
      }
      {showConfetti && <Confetti />}
      {startQuiz && questions.length > 0 && (
         <section ref={sectionRef}>
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
           {showCorrectAnswerCount && playAgain && 
            <div className='answers-count'>
              <h3>Correct Answers: {getCorrectAnswerCount()}/{questions.length}</h3>
              <button className='quiz-btn' onClick={handlePlayAgainBtn}>
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