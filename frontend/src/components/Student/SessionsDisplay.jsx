import { useState, useContext, useEffect } from "react";
import { UserContext } from '../../context/userContext';
import SessionCard from "./SessionCard.jsx";
import axios from "axios";
import "./SessionsDisplay.css";

const SessionsDisplay = () => {
    const [user] = useContext(UserContext);
    const [sessions, setSessions] = useState([]);

    const getSessions = async (userId) => {
        const response = await axios.get(`http://localhost:3001/user/${userId}/sessions/enrolled`, {
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
            }
        })
        return response.data;
    }

    useEffect(() => {
        getSessions(user)
            .then((fetchedSessions) => {
                setSessions(fetchedSessions)
            });

        console.log(sessions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className="display-grid">
            {sessions.map((data) => (
                <SessionCard {...data} />
            ))}
        </div>
    )
}


export default SessionsDisplay;