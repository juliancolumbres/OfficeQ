import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
// const UserContext = React.createContext({});


export default function ProfessorLanding() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // const [user, setUser] = useContext(UserContext);

    const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    await fetch('http://localhost:3001/login', {
    method: "POST",
    body: JSON.stringify({
        email: email,
        password: password
    }),
    headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => {
        console.log(json);
        setIsLoading(false);
    })
    .catch(err => {
        setError(err.response.data.message);
    });
    //    setUser(response.data.user);
        navigate('/professor/dashboard');
   };

    return (
        <Container>
            <Row className="justify-content-md-center">
            <Col md="auto">
                <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
    
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                {error && <p className="text-danger">{error}</p>}
                <Button variant="primary" type="submit" disabled={isLoading}>
                    Submit
                </Button>
                </Form>
            </Col>
            </Row>
        </Container>
    )
}