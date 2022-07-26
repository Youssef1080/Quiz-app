import { Routes, Route } from "react-router-dom";
import { Header, QuestionsSettings, Question } from "./components/import";
import "./app.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<QuestionsSettings />} />
        <Route path="/questions/:id" element={<Question />} />
      </Routes>
    </div>
  );
}

export default App;
