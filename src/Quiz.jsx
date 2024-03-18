import React, { useState, useEffect } from "react";

export default function Quiz(props) {
    const { question, correctAnswer, incorrectAnswers } = props;
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState()

    useEffect(() => {
        const allAnswers = [...incorrectAnswers, correctAnswer];
        console.log(allAnswers)
        setShuffledAnswers(shuffle(allAnswers));
    }, [correctAnswer, incorrectAnswers]);

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
  
    function setClickedAnswerStyle(answer){
        setSelectedAnswer(answer)
    }
    const selectedAnswerStyle = {
        backgroundColor:  "#D6DBF5"
    };

    return (
        <div className="quiz-container">
            <h3 className="questions">{question}</h3>
            <div className="answer-container">
            {shuffledAnswers.map((answer, index) => (
                    <button 
                        onClick={() => setClickedAnswerStyle(answer)} 
                        key={index} 
                        className="answer-btn"
                        style={selectedAnswer === answer ? selectedAnswerStyle : {}}
                        >{answer}</button>
                ))}
            </div>
        </div>
    )
}
