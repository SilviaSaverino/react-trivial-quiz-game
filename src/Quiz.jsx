import React from "react"

export default function Quiz(props) {

    const { question, correctAnswer, incorrectAnswers } = props
    return (
        <div>
            <h2>{question}</h2>
            <div>
                <span>{correctAnswer}</span>
                {incorrectAnswers.map((wrongAnswer, index) => (
                    <span key={index}>{wrongAnswer}</span>
                ))}
            </div>
        </div>
    )
}