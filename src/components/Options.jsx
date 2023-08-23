const Options = ({ options, selectedAnswer, setSelectedAnswer }) => {
    const optionsItems = options.map((option, index) => (
        <li key={index}>
            <input
                type="radio"
                name="choice"
                id={index}
                value={option}
                checked={option === selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
            />
            <label htmlFor={index}>{option}</label>
        </li>
    ));
    return (
        <>
            <ol type="A">{optionsItems}</ol>
        </>
    );
};
export default Options;
