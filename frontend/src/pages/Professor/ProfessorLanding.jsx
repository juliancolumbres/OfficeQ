import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/userContext';
import { Link } from "react-router-dom";
import './ProfessorLanding.css'; 
import axios from 'axios';


export default function ProfessorLanding() {

    const [isRegistered, setIsRegistered] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [university, setUniversity] = useState('San Jose State University');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const setUser = useContext(UserContext)[1];

    const switchRegistered = () => setIsRegistered(!isRegistered);

    const handleSubmit = async (event) => {
        setError('');
        event.preventDefault();
        let response = {};
        if (isRegistered) {
            response = await axios.post('http://localhost:3001/user/login', {
                email: email,
                password: password,
                userRole: "Professor"
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    setError(error.response.data.error);
                }
            })
        }
        else {
            response = await axios.post('http://localhost:3001/user/signup', {
                university: university,
                name: name,
                email: email,
                password: password,
                userRole: "Professor"
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    setError(error.response.data.error);
                }
            })
        }

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
                <p>Sign in now to streamline your office hours</p>
                <p>Are you a student? <Link to={'/student'}>Click here</Link></p>
                <form onSubmit={handleSubmit}>
                    <div className="signup-inputs" hidden={isRegistered}>
                        <label htmlFor="university">University</label>
                        <select value={university} name="university" onChange={(e) => setUniversity(e.target.value)}>
                            <option value="San Jose State University">San Jose State University</option>
                        </select>
                        <label htmlFor="name">Full Name</label>
                        <input 
                            name="name"
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required={!isRegistered}>
                        </input>
                    </div>
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