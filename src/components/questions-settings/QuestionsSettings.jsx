import { fetchQuestions } from "../../redux/questionSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUrl } from "../../redux/questionSlice";

import "./questions-settings.scss";
import { useRef } from "react";

const QuestionsSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState({
    number: 0,
    category: "",
    difficulty: "",
    type: "",
    categoryId: 0
  });

  let type;
  if (questions.type === "Multiple Choice") {
    type = "multiple";
  } else {
    type = "boolean";
  }

  const url = `/api.php?amount=${questions.number}&category=${
    questions.categoryId
  }&difficulty=${questions.difficulty.toLowerCase()}&type=${type}`;

  useEffect(() => {
    dispatch(fetchQuestions("/api_category.php"));
  }, []);

  const { category } = useSelector((state) => state.questions);

  console.log(questions.categoryId);

  function handleQuestions(e) {
    let categoryId;
    category?.trivia_categories.forEach((item) => {
      if (e.target.value === item.name) {
        categoryId = item.id;
      }
    });
    if (categoryId) {
      setQuestions({
        ...questions,
        [e.target.id]: e.target.value,
        categoryId
      });
    } else {
      setQuestions({
        ...questions,
        [e.target.id]: e.target.value
      });
    }
  }

  return (
    <div className="settings-choose">
      <h2>Choose your questions settings</h2>
      <label id="number">Enter the number of questions: </label>
      <input
        // placeholder="Enter the number of questions"
        id="number"
        type={"number"}
        value={questions.number}
        onChange={handleQuestions}
        name="number"
      />
      <label id="category">Select Category:</label>
      <select
        id="category"
        value={questions.category}
        onChange={handleQuestions}
      >
        <option>Any Category</option>
        {category?.trivia_categories?.map((item, ind) => (
          <option key={ind} id={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <label id="difficulty">Select difficulty:</label>
      <select
        id="difficulty"
        value={questions.difficulty}
        onChange={handleQuestions}
      >
        <option>Any Difficulty</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <label id="type">Select Type:</label>
      <select id="type" value={questions.type} onChange={handleQuestions}>
        <option>Any Type</option>
        <option>Multiple Choice</option>
        <option>True / False</option>
      </select>
      <button
        className="start"
        onClick={() => {
          navigate("questions/1");
          dispatch(getUrl(url));
        }}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuestionsSettings;
