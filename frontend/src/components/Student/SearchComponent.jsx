import {useState}  from "react";
import axios from 'axios';
import SessionCard from "./SessionCard";
import { useNavigate } from "react-router-dom";
import styles from "./SearchComponent.module.css"; 

const SearchComponent = () => {

    const [sessions, setSessions] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [classSearchToggle, setClassSearchToggle] = useState(true);
    const navigate = useNavigate();

    const searchSessions = async (searchParameter) => {
        const response = await axios.get(`http://localhost:3001/session/sessions?${classSearchToggle ? "className" : "professorName"}=${searchParameter}`, {
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
        <div className={styles.container}>
            <div className={styles.topRow}>
                {/* <p>Filter</p> */}
                <div className={styles.toggleButton}> 
                        <button className={styles.toggleButtonLeft} disabled={classSearchToggle} onClick={() => setClassSearchToggle(!classSearchToggle)}>Class</button>
                        <button className={styles.toggleButtonRight} disabled={!classSearchToggle} onClick={() => setClassSearchToggle(!classSearchToggle)}>Professor</button>
                </div>
                <input className={styles.input}
                    placeholder={classSearchToggle ? "Search Class.." : "Search Professor.."}
                    value={userInput} 
                    onChange={(e) => setUserInput(e.target.value)}
                >
                </input>
                <button onClick={handleSubmit}>Search</button>
            </div>
            {/* <input 
                placeholder={classSearchToggle ? "Search Class.." : "Search Professor.."}
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)}
            >
            </input>
            <button onClick={handleSubmit}>Search</button> */}
            <div className={styles.displayGrid}>
            {sessions.map((data) => (
                <SessionCard {...data} handleClick={navigateToForm} />
            ))}
            </div>

        </div>
    )
}

export default SearchComponent;