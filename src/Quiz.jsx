import React, { useState, useEffect } from "react";

export default function Quiz(props) {
    const { question, correctAnswer, incorrectAnswers, onAnswerClicked, updateSelectedAnswer, results } = props
    const [shuffledAnswers, setShuffledAnswers] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        const allAnswers = [...incorrectAnswers, correctAnswer]
        setShuffledAnswers(shuffle(allAnswers))
    }, [])

    useEffect(() => {
        setSelectedAnswer(null)
    }, [question])

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    function setClickedAnswerStyle(answer) {
        setSelectedAnswer(answer)
        updateSelectedAnswer(answer)
        setDisabled(true)
        onAnswerClicked()
    }

    function getAnswerStyle(answer) {
        if (results) {
            if (answer === correctAnswer && selectedAnswer === answer) {
                return "#94D7A2"; // Green
            }
            if (answer !== correctAnswer && selectedAnswer === answer) {
                return "#F8BCBC"; // Red
            }
            if (answer === correctAnswer) {
                return "rgb(231 242 232)"; // Light green for correct, not selected
            }
        }
        if (selectedAnswer === answer) {
            return "#D6DBF5"; // Blue
        }
        return "#FFFFFF"; // White
    }

    return (
        <div className="quiz-container">
            <h3 className="questions">{question}</h3>
            <div className="answer-container">
                {shuffledAnswers.map((answer, index) => (
                    <button
                        onClick={() => !disabled && setClickedAnswerStyle(answer)}
                        disabled={disabled}
                        key={index}
                        className="answer-btn"
                        style={{ backgroundColor: getAnswerStyle(answer) }}
                    >
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    )
}