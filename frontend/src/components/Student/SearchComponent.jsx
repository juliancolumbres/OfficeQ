import {useState}  from "react";
import axios from 'axios';

const SearchComponent = () => {

    const [sessions, setSessions] = useState([]);
    const [userInput, setUserInput] = useState('');

    const searchSessions = async (searchParameter) => {
        const response = await axios.get(`http://localhost:3001/session/sessions?classname=${searchParameter}`, {
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
            }
        })
        return response.data;
    }

    const handleSubmit = () => {
        console.log(userInput);

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
            

        </div>
    )
}

export default SearchComponent;