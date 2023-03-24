import { useState, useContext, useEffect } from "react";
import { UserContext } from '../../context/userContext';
import SessionCard from "./SessionCard.jsx";
import axios from "axios";
import styles from "./SessionsDisplay.module.css";

const SessionsDisplay = () => {
    const [userId, setUserId] = useContext(UserContext);
    const [sessions, setSessions] = useState([]);


    useEffect(() => {

        const getSessions = async (userId) => {
            const response = await axios.get(`http://localhost:3001/user/${userId}/sessions/enrolled`, {
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            })
            return response.data;
        }


        getSessions(userId)
            .then((fetchedSessions) => {
                const updatedSessions = [...fetchedSessions]
                setSessions(updatedSessions);
                console.log(fetchedSessions);
            });

        console.log(sessions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return (
        <div className={styles.displayGrid}>
            Hello
            {sessions.map((data) => (
                <SessionCard {...data} />
            ))}
        </div>
    )
}


export default SessionsDisplay;