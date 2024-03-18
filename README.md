# Trivial Quiz
This is a simple trivia quiz application built with React. It fetches trivia questions from the Open Trivia Database API and allows users to test their knowledge by answering them.

Check out the project [Live Site](https://silviasaverino.github.io/react-trivial-quiz-game/)

## Features
- Users can select the difficulty level and the number of questions they want to answer.
- Questions are fetched from the Open Trivia Database API based on the selected difficulty and number.
- Users can answer the questions by selecting one of the provided options.
- After answering all the questions, users can check their answers.
- The correct and incorrect answers are highlighted.
- Users can play the quiz again.

## Project Structure
The project structure is organized as follows:

- App.js: The main component of the application. It manages the state and renders the quiz component.
- Quiz.js: A component responsible for rendering individual quiz questions and answer options.
- App.css: Stylesheet for the application.

## App.js
#### State Management: 
The App component manages the state of the quiz application using React's useState hook. It stores information such as 
- whether the quiz has started (startQuiz)
- the fetched questions (questions)
- the total number of clicked answers (clickedAnswerTotalCount)
- the selected answers (selectedAnswer)
- the results of the quiz (results)
- whether to show the correct answer count (showCorrectAnswerCount)
- whether the user wants to play again (playAgain). 
- It also stores form data for selecting quiz difficulty and number of questions (formData).

#### Effect Hooks: 
The useEffect hook is used to fetch trivia questions from the Open Trivia Database API when the startQuiz state changes. It also initializes the playAgain state to true when the quiz starts.

#### Event Handlers: 
Event handlers like 
1) handleDifficultyChange
    - This function handles changes in the difficulty level selected by the user.
    - It receives an event object and extracts information like the name, value, type, and checked status.
    - It updates the formData state based on the user's selection, either updating the difficulty level or the number of questions.

2) toggleStartState
    - This function toggles the startQuiz state between true and false.
    - It's triggered when the user clicks on the "Start the quiz!" button.
    - Toggling the startQuiz state initiates or stops the quiz, changing the UI accordingly.

3) trackClickedAnswerTotalCount
    - This function tracks the total count of clicked answers by incrementing the clickedAnswerTotalCount state.
    - It's called whenever a user clicks on an answer option in the quiz.

4) updateSelectedAnswerArray
    - This function updates the selectedAnswer state array with the user's selected answer for a specific question.
    - It receives the index of the question and the selected answer as parameters.
    - It updates the selectedAnswer array with the selected answer at the corresponding index.

5) revealAnswers
    - This function reveals the correct answers after the user has clicked all the answer options.
    - It compares the selected answers with the correct answers and updates the results state with the correctness of each answer.
    - It sets the showCorrectAnswerCount state to true, displaying the correct answer count and allowing the user to play again.
6) handlePlayAgainBtn 
    - This function handles the event when the user clicks on the "Play Again" button.
    - It resets various states such as playAgain, startQuiz, showCorrectAnswerCount, clickedAnswerTotalCount, selectedAnswer, questions, results, and formData.
    - It effectively resets the quiz, allowing the user to play again from the beginning.

#### Rendering: 
The App component renders the quiz UI based on the application state. It displays the initial page with form inputs for selecting difficulty and number of questions. Once the quiz starts and questions are fetched, it renders the Quiz component for each question. It also renders buttons for checking answers and playing again.

## Conditional Rendering in App.js:
#### Start Quiz Button: 
The Start the quiz! button is conditionally rendered based on the startQuiz state. When startQuiz is false, the button is displayed, allowing the user to initiate the quiz.

#### Answer Check Button: 
The Check your answers button is conditionally rendered based on whether the user has clicked all the answers (clickedAnswerTotalCount equals the total number of questions) and whether the correct answers should be revealed (showCorrectAnswerCount is false). This button appears only when all questions are answered.

#### Play Again Button: 
The Play Again button is conditionally rendered based on whether the user has finished the quiz (showCorrectAnswerCount is true) and whether they want to play again (playAgain is true).

## Quiz.js
#### Props: 
The Quiz component receives props such as question, correctAnswer, incorrectAnswers, onAnswerClicked, updateSelectedAnswer, and results. These props are used to render individual quiz questions and answer options.

#### State Management: 
The Quiz component manages local state using React's useState hook. 
It maintains 
- the shuffled answer options (shuffledAnswers)
- the selected answer (selectedAnswer)
- and a flag to disable answer selection after an answer is clicked (disabled).

#### Effect Hooks: 
The useEffect hook is used to shuffle the answer options when the component mounts or when the question changes.

#### Event Handlers: 
The setClickedAnswerStyle function is defined to handle user clicks on answer options. It updates the selected answer, tracks the clicked answer count, highlights the selected answer, and disables further answer selection.

#### Rendering: 
The Quiz component renders the question and answer options. It maps over the shuffled answer options and renders buttons for each option. The style of each button is determined based on whether it is the correct answer, an incorrect answer, or the selected answer.

## Conditional Rendering in Quiz.js:
#### Button Styles: 
The style of each answer button is determined based on conditions such as whether the user has selected an answer, whether the answer is correct or incorrect, and whether the answer selection is disabled.