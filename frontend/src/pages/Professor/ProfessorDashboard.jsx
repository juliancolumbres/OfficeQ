import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import CreateSessionForm from "../../components/Professor/CreateSessionForm.jsx";
import SessionsDisplay from "../../components/Professor/SessionsDisplay.jsx";
import styles from "./ProfessorDashboard.module.css"


export default function ProfessorDashboard() {
    const [user] = useContext(UserContext);
    console.log("professor id: " + user);
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
                <h1>OfficeQ</h1>
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