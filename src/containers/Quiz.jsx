import { useState, useEffect } from "react";
import Question from "../components/Question";
import Score from "../components/Score";
// import { createLogger } from "vite";

const Quiz = () => {
    //state currentQuestion
    const [currentQuestion, setCurrentQuestion] = useState(0);
    //state Questions
    const [questions, setQuestions] = useState([])
    //     {
    //         question:
    //             "What was the name of the first computer virus that spread in the wild?",
    //         options: ["Creeper", "ILOVEYOU", "Melissa", "Brain"],
    //         answer: "Brain",
    //     },
    //     {
    //         question:
    //             "Which programming language is often referred to as the 'mother of all languages'?",
    //         options: ["Java", "C", "Fortran", "Assembly"],
    //         answer: "C",
    //     },
    //     {
    //         question: "In what year was the company Google founded?",
    //         options: ["1996", "1998", "2000", "2004"],
    //         answer: "1998",
    //     },
    // ]);
    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple")
        .then(res=>res.json())
        .then((data)=>{
            data.results.forEach(element => {
                {
                    element.options = element.incorrect_answers.map((answer)=>answer)
                    element.options.push(element.correct_answer)
                    element.options.sort()}
            });
            setQuestions(data.results)
        })
        
    },[]);
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
        selectedAnswer === questions[currentQuestion].correct_answer ? 
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
            <h3>Question {index+1}:</h3><p> {questions[index].question}</p>
            Your answer for question {index + 1} was {answer.answer}, this was
            {answer.correct ? (
                <h2>Correct</h2>
            ) : (
                <>
                    <h2>Incorrect</h2>
                    <p>The correct answer was {questions[index].correct_answer}</p>
                </>
            )}
        </li>
    ));

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
