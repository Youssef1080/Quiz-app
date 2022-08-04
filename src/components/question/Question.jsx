import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useEffect, useState, useRef } from "react";
import { fetchQuestions, fetchLbn } from "../../redux/questionSlice";
import { decode } from "html-entities";
import { Answers } from "../import";
import Loader from "../loader/Loader";
import "./question.scss";

const Question = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selected, setSelected] = useState(undefined);
  const [userAnswers, setUserAnswers] = useState([]);
  const [theAnswer, setTheAnswer] = useState("");
  const [chooseAnswer, setChoseAnswer] = useState(0);

  const answer = useRef();
  const { mappedArray, url } = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(fetchLbn(url));
  }, []);

  if (!mappedArray.length) {
    return <Loader />;
  }

  const question = mappedArray[id - 1];

  function check(answer) {
    if (answer === question?.correct_answer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  }

  function handleSelected(item) {
    if (item === selected) {
      return "selected";
    }
  }
  // console.log(correctAnswers, question?.correct_answer);

  return (
    <div>
      {!showResult && (
        <div className="question-cont">
          <h2>Question {id}</h2>
          <h3>{decode(question?.question)}</h3>
          <div className="question">
            {question?.data?.map((item, ind) => (
              <button
                key={ind}
                className={`answer ${selected && handleSelected(item)}`}
                onClick={(e) => {
                  setSelected(item);
                  setTheAnswer(e.target.textContent);
                }}
              >
                {decode(item)}
              </button>
            ))}
          </div>

          {id < mappedArray?.length ? (
            <button
              className="next-btn"
              onClick={() => {
                check(theAnswer);
                navigate(`/questions/${parseInt(id) + 1}`);
                setSelected(undefined);
              }}
            >
              &rarr;
            </button>
          ) : (
            <button
              className="showgrade-btn"
              onClick={() => {
                setShowResult(true);
                check(theAnswer);
                setSelected(undefined);
              }}
            >
              Show Grade
            </button>
          )}
        </div>
      )}
      {showResult && (
        <div>
          <h4 className="score">
            You scored <span>{correctAnswers}</span> answers right of{" "}
            {mappedArray.length}
          </h4>
          <button className="return-btn">
            <Link to={"/"} className="return">
              Go to Settings page
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Question;
