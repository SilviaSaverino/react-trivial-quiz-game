import React from "react"

export default function Quiz(props) {

    const { question, correctAnswer, incorrectAnswers } = props
    return (
        <div className="quiz-container">
            <h3 className="questions">{question}</h3>
            <div className="answer-container">
                <span className="correct-answer">{correctAnswer}</span>

                {incorrectAnswers.map((wrongAnswer, index) => (
                    <span className="wrong-answer" key={index}>{wrongAnswer}</span>
                ))}
            </div>
        </div>
    )
}
