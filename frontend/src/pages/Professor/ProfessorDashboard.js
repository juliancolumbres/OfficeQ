import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import CreateSessionForm from "../../components/Professor/CreateSessionForm.jsx";
import SessionsDisplay from "../../components/Professor/SessionsDisplay.jsx";
import "./ProfessorDashboard.css"


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
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>OfficeQ</h1>
            </div>
            <div className="dashboard-body">
                <div className="toggle-button"> 
                    <button className="toggle-button-left" disabled={!showCreateSessionForm} onClick={() => setShowCreateSessionForm(!showCreateSessionForm)}>View Sessions</button>
                    <button className="toggle-button-right" disabled={showCreateSessionForm} onClick={() => setShowCreateSessionForm(!showCreateSessionForm)}>Create Session</button>
                </div>
                {showCreateSessionForm ? <CreateSessionForm onSubmit={() => setShowCreateSessionForm(!showCreateSessionForm)}/> : <SessionsDisplay/>}
            </div>
        </div>
    )
}