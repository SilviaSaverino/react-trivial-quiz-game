import React from "react"

export default function Quiz(props){
    return (
        <div>
            <h2>{props.question}</h2>
            <div>
                <span>{props.correctAnswer}</span>
                
            </div>
        </div>
    )
}