import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import CreateSessionForm from "../../components/Professor/CreateSessionForm.jsx";
import SessionsDisplay from "../../components/Professor/SessionsDisplay.jsx";
import styles from "./ProfessorDashboard.module.css"


export default function ProfessorDashboard() {
    const [user] = useContext(UserContext);
    const [showCreateSessionForm, setShowCreateSessionForm] = useState(false);
    if (!user) {
        return (
            <div>
                Not logged in.
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
            <span class = "logo">Office<span class="colored-letter">Q</span></span>
            </div>
            <div className={styles.dashboardBody}>
                <div className={styles.toggleButton}> 
                    <button className={styles.buttonLeft} disabled={!showCreateSessionForm} onClick={() => setShowCreateSessionForm(!showCreateSessionForm)}>View Sessions</button>
                    <button className={styles.buttonRight} disabled={showCreateSessionForm} onClick={() => setShowCreateSessionForm(!showCreateSessionForm)}>Create Session</button>
                </div>
                {showCreateSessionForm ? <CreateSessionForm onSubmit={() => setShowCreateSessionForm(!showCreateSessionForm)}/> : <SessionsDisplay/>}
            </div>
        </div>
    )
}