import { decode } from "html-entities";
import { useState } from "react";

const Answers = ({ value, id, answer, choose, correct_answer }) => {
  const [first, setfirst] = useState(false);
  const [answerChoosen, setAnswer] = useState(false);

  const answerStyle = {
    backgroundColor: value ? "green" : "rgba(0, 98, 255, 0.89)"
  };

  return (
    <button
      className="answer"
      onClick={(e) => {
        choose();
        setAnswer(e.target.textContent);
      }}
    >
      {decode(answer)}
    </button>
  );
};

export default Answers;
