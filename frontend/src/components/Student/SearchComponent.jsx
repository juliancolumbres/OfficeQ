import {useState}  from "react";
import axios from 'axios';
import SessionCard from "./SessionCard";

const SearchComponent = () => {

    const [sessions, setSessions] = useState([]);
    const [userInput, setUserInput] = useState('');

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
                <SessionCard {...data} />
            ))}

        </div>
    )
}

export default SearchComponent;