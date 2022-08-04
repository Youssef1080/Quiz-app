import { AtomSpinner, SpringSpinner } from "react-epic-spinners";
import "./loader.scss";
const Loader = () => {
  return (
    <div className="loader">
      <SpringSpinner color="grey" />
    </div>
  );
};

export default Loader;
