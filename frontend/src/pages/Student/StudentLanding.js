import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import './StudentLanding.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/userContext';
import axios from 'axios'; 


export default function StudentLanding() {
    const [isRegistered, setIsRegistered] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const setUser = useContext(UserContext)[1];

    const switchRegistered = () => setIsRegistered(!isRegistered);

    const handleSubmit = async (event) => {
        setError('');
        event.preventDefault();
        console.log(email, password);
        const authEndpoint = isRegistered ? "login" : "signup"; 
        
        const response = await axios.post('http://localhost:3001/user/' + authEndpoint, {
            email: email,
            password: password,
            userRole: "Student"
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                setError(error.response.data.error);
            }
        })
        
        if (response) {
            console.log(response.data.user_id);
            setUser(response.data.user_id);
            navigate('./dashboard');
        }
    }

    return (
        <div>
            <span class = "logo">Office<span class="colored-letter">Q</span></span>
            <div className="container">
                <p className="welcomeSign"onClick={switchRegistered}>{isRegistered ? "Sign Into Your Account" : "Welcome to OfficeQ"}</p>
                <p>Sign in now to attend your office hours</p>
                <p>Are you a Professor? <Link to={'/professor'}>Click here</Link></p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        name="email" 
                        type="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required>
                    </input>
                    <label htmlFor="password">Password</label>
                    <input 
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required>
                    </input>
                    <button type="submit">{isRegistered ? "Login": "Sign Up"}</button>
                </form>
                <button className="link-button"onClick={switchRegistered}>{isRegistered ? "Need an account?" : "Already have an account?"}</button>
                <p>{error}</p>
            </div>
        </div>
    )
}