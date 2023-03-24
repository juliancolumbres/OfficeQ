import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import SessionsDisplay from "../../components/Student/SessionsDisplay.jsx";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css"

import SearchComponent from "../../components/Student/SearchComponent";



export default function StudentDashboard() {
    const [user, setUser] = useContext(UserContext);
    const [showSearchComponent, setShowSearchComponent] = useState(false);
    const navigate = useNavigate();
    console.log(user);


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
                    <button className="toggle-button-left" disabled={!showSearchComponent} onClick={() => setShowSearchComponent(!showSearchComponent)}>Enrolled Sessions</button>
                    <button className="toggle-button-right" disabled={showSearchComponent} onClick={() => setShowSearchComponent(!showSearchComponent)}>Search Sessions</button>
                </div>
                {showSearchComponent ? <SearchComponent /> : <SessionsDisplay />}
            </div>
        </div>
    )
}