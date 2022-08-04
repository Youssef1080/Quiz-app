import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useEffect, useState, useRef } from "react";
import { fetchQuestions, fetchLbn } from "../../redux/questionSlice";
import { decode } from "html-entities";
import { Answers } from "../import";
import "./question.scss";

const Question = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [theAnswer, setTheAnswer] = useState("");
  const [chooseAnswer, setChoseAnswer] = useState(0);

  const answer = useRef();
  const { mappedArray, url } = useSelector((state) => state.questions);

  console.log(mappedArray, url);

  useEffect(() => {
    dispatch(fetchLbn(url));
  }, []);

  if (!mappedArray) {
    return <div>...Loading</div>;
  }

  const question = mappedArray[id - 1];

  // function choose(id) {
  //   setState((prev) =>
  //     prev.data.map((item) =>
  //       item.id == id ? { ...item, value: true } : { ...item, value: false }
  //     )
  //   );
  // }

  // console.log(question.data);

  function check(answer) {
    let arr = [];
    if (answer === question.correct_answer) {
      setCorrectAnswers(correctAnswers + 1);
    }
    // arr.push(answer)
  }
  console.log(correctAnswers);

  return (
    <>
      {!showResult && (
        <div className="question-cont">
          <h2>Question {id}</h2>
          <h3>{decode(question?.question)}</h3>
          <div className="question">
            {question?.data?.map((item, ind) => (
              <button
                key={ind}
                className="answer"
                onClick={
                  (e) => setTheAnswer(e.target.textContent)

                  // check(e.target.textContent);
                }
              >
                {decode(item)}
              </button>
            ))}
          </div>

          {id < mappedArray?.length ? (
            <button
              onClick={() => {
                check(theAnswer);
                navigate(`/questions/${parseInt(id) + 1}`);
              }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => {
                setShowResult(true);
                check(theAnswer);
              }}
            >
              Show Grade
            </button>
          )}
        </div>
      )}
      {showResult && (
        <h4>
          you scored {correctAnswers} right of {mappedArray.length}
        </h4>
      )}
    </>
  );
};

export default Question;
