import React from "react"

export default function Quiz(props) {

    const { question, correctAnswer, incorrectAnswers } = props
    return (
        <div className="quiz-container">
            <h3 className="questions">{question}</h3>
            <div className="answer-container">
            <button className="correct-answer answer-btn">{correctAnswer}</button>

                {incorrectAnswers.map((wrongAnswer, index) => (
                     <button className="wrong-answer answer-btn" key={index}>{wrongAnswer}</button>
                ))}
            </div>
        </div>
    )
}
