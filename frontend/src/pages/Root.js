import { Link } from "react-router-dom"; 

export default function Root() {
    return (
        <div>
            <h1>OfficeQ</h1>
            <Link to={'/student'}>Are you a student?</Link>
            <Link to={'/professor'}>Are you a professor?</Link>
        </div>
    )
  }