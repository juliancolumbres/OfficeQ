import { Link } from "react-router-dom";
import './Root.css';

export default function Root() {
  return (
    <div className="welcomeBody">
      <h1 className="welcome">
        {"Welcome to"}
        <span class="logo" style={{ display: "inline-block" }}>
          Office<span class="colored-letter">Q</span>
        </span>
      </h1>
     
      <div class="button-container">
      <button className= "studentBttn">
        <Link to={'/student'} className="button">Are you a student?</Link>
      </button>
      <button className= "profBttn">
        <Link to={'/professor'} className="button">Are you a professor?</Link>
      </button>
      </div>
    </div>
  );
}