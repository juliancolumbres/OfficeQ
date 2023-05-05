import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import SessionsDisplay from "../../components/Student/SessionsDisplay.jsx";
import "./StudentDashboard.css"

import SearchComponent from '../../components/Student/SearchComponent.jsx';


export default function StudentDashboard() {
    const [user] = useContext(UserContext);
    const [showSearchComponent, setShowSearchComponent] = useState(false);
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
            <span class = "logo">Office<span class="colored-letter">Q</span></span>
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