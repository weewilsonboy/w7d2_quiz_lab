import { useState } from "react";
import Question from "../components/Question";
import Score from "../components/Score";

const Quiz = () => {
    //state currentQuestion
    const [currentQuestion, setCurrentQuestion] = useState(0);
    //state Questions
    const [questions, setQuestions] = useState([
        {
            question:
                "What was the name of the first computer virus that spread in the wild?",
            options: ["Creeper", "ILOVEYOU", "Melissa", "Brain"],
            answer: "Brain",
        },
        {
            question:
                "Which programming language is often referred to as the 'mother of all languages'?",
            options: ["Java", "C", "Fortran", "Assembly"],
            answer: "C",
        },
        {
            question: "In what year was the company Google founded?",
            options: ["1996", "1998", "2000", "2004"],
            answer: "1998",
        },
    ]);

    //state score
    const [score, setScore] = useState(0);

    const [listOfAnswers, setListOfAnswers] = useState([]);

    const handleAnswer = (selectedAnswer) => {
        // if (selectedAnswer == questions[currentQuestion].answer) {
        //     const newScore = score + 1;
        //     setListOfAnswers([
        //         ...listOfAnswers,
        //         { answer: selectedAnswer, correct: true },
        //     ]);
        //     setScore(newScore);
        // } else {
        //     setListOfAnswers([
        //         ...listOfAnswers,
        //         { answer: selectedAnswer, correct: false },
        //     ]);
        // }
        selectedAnswer === questions[currentQuestion].answer ? 
            (
            setListOfAnswers([...listOfAnswers, { answer: selectedAnswer, correct: true }]),
            setScore(score +1)
            ) : (
            setListOfAnswers([...listOfAnswers,{ answer: selectedAnswer, correct: false }]))
        const nextQuestion = currentQuestion + 1;
        setCurrentQuestion(nextQuestion);
    };
    const reset = () => {
        setCurrentQuestion(0);
        setScore(0);
        setListOfAnswers([]);
    };

    const handled = listOfAnswers.map((answer, index) => (
        <li key={index}>
            Your answer for question {index + 1} was {answer.answer}, this was{" "}
            {answer.correct ? (
                <h2>Correct</h2>
            ) : (
                <>
                    <h2>Incorrect</h2>
                    <p>The correct answer was {questions[index].answer}</p>
                </>
            )}
        </li>
    ));
    console.log(handled);
    console.log(listOfAnswers);

    return (
        <>
            {/* //get question to display, and show as question */}
            <Score score={score} />
            {currentQuestion === questions.length ? (
                <>
                    <h3>Congratulations, you reached you scored {score}</h3>
                    <ul>{handled}</ul>
                    <button onClick={reset}>Reset</button>
                </>
            ) : (
                <Question
                    question={questions[currentQuestion]}
                    handleAnswer={handleAnswer}
                />
            )}
        </>
    );
};
export default Quiz;
