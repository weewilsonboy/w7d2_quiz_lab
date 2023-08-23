import { useState } from "react";
import Options from "./Options";
const Question = ({ question, handleAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState("");

    return (
        <>
            <h1>{question.category}</h1>
            <h2>{question.question}</h2>
            <Options
                options={question.options}
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
            />
            <button onClick={() => handleAnswer(selectedAnswer)}>Next</button>
        </>
    );
};
export default Question;
