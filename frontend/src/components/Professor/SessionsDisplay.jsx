import { useState, useContext, useEffect } from "react";
import { UserContext } from '../../context/userContext';
import SessionCard from "./SessionCard.jsx";
import axios from "axios";
import styles from "./SessionsDisplay.module.css";

const SessionsDisplay = () => {
    const [userId, setUserId] = useContext(UserContext);
    const [sessions, setSessions] = useState([]);
    console.log("professor id from display component: " + userId);

    useEffect(() => {

        const getSessions = async (userId) => {
            const response = await axios.get(`http://localhost:3001/user/${userId}/sessions`, {
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            })
            console.log("response data:");
            console.log(response.data);
            return response.data;
        }
        
        getSessions(userId)
            .then((fetchedSessions) => {
                const updatedSessions = [...fetchedSessions];
                console.log(updatedSessions.length);
                setSessions(updatedSessions);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div>
            <h1>Your Sessions</h1>
            <div className={styles.container}>
                <div className={styles.displayGrid}>
                    {sessions.map((data) => (
                        <SessionCard {...data} />
                    ))}
                </div>
            </div>
        </div>
    )
}


export default SessionsDisplay;