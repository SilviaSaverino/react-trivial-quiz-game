import { useState,useEffect } from 'react'
import './App.css'
// import Questions from './assets/components/questions'

function App() {

  const [questions, setQuestions] = useState()

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=6&difficulty=medium&type=multiple")
      .then(res => res.json())
      .then(data => {setQuestions(data)
      console.log(data);})
  }, []);

  return (
    <main>
      <img className="blue-blob" src="./src/assets/images/blue-blob.png" alt="blue blob" />
      <img className="yellow-blob" src="./src/assets/images/yellow-blob.png" alt="yellow blob" />
      <div className="initial-page">
        <h2 className="title">Trivial Quiz</h2>
        <p className='content'>Test your knowledge</p>
        <button className='start-quiz-btn'>Start the quiz!</button>
      </div>
    </main>
  );
}

export default App;