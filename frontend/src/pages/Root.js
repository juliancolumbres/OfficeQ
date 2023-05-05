import { Link } from "react-router-dom"; 

export default function Root() {
    return (
        <div>
            <span class = "logo">Office<span class="colored-letter">Q</span></span>
            <Link to={'/student'}>Are you a student?</Link>
            <Link to={'/professor'}>Are you a professor?</Link>
        </div>
    )
  }