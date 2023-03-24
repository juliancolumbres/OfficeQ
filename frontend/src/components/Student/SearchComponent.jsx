import {useState}  from "react";
import axios from 'axios';
import SessionCard from "./SessionCard";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {

    const [sessions, setSessions] = useState([]);
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate();

    const searchSessions = async (searchParameter) => {
        const response = await axios.get(`http://localhost:3001/session/sessions?className=${searchParameter}`, {
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
            }
        })
        return response.data;
    }

    const handleSubmit = () => {
        console.log(userInput);
        searchSessions(userInput).then((fetchedSessions)=> {
            const updatedSessions = [...fetchedSessions]
            setSessions(updatedSessions);
            console.log(updatedSessions);
        });

    }

    const navigateToForm = (sessionId) => {
        console.log("click");
        navigate(`/student/sessions/${sessionId}/forum`);
    }

    return (
        <div>
            <input 
                placeholder="Enter Meeting Session"
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)}
            >
            </input>
            <button onClick={handleSubmit}>Search</button>
            {sessions.map((data) => (
                <SessionCard {...data} handleClick={navigateToForm} />
            ))}

        </div>
    )
}

export default SearchComponent;