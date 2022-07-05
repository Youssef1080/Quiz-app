import StartPage from "./components/start-page/StartPage";
import './app.scss'
import Questions from "./components/questionsPage/questions";

function App() {
  return (
    <div className="App">
      <StartPage />
      <Questions />
    </div>
  );
}

export default App;
