import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { Card, Row, Col, Container } from "react-bootstrap";

const getSessions = () => {
    const testArray = [
        {
            _id: "id1",
            sessionName: "session1",
            hasStarted: false,
            hasEnded: false,
            school: "SJSU",
            professorName: "Julian",
            startTime: new Date(),
            endTime: new Date(),
            groups: [ 1, 2 ]
        },
        {
            _id: "id2",
            sessionName: "session2",
            hasStarted: false,
            hasEnded: false,
            school: "SJSU",
            professorName: "Julian",
            startTime: new Date(),
            endTime: new Date(),
            groups: [ 1, 2 ]
        },
        {
            _id: "id3",
            sessionName: "session3",
            hasStarted: false,
            hasEnded: false,
            school: "SJSU",
            professorName: "Julian",
            startTime: new Date(),
            endTime: new Date(),
            groups: [ 1, 2 ]
        }
    ]
    return testArray;
}

export default function ProfessorDashboard() {
    const [user] = useContext(UserContext);
    const [sessions, setSessions] = useState([]);

    const getSessionsData = async () => {
        setSessions(getSampleSessions());
    }

    const getSampleSessions = () => {
        const testArray = [
            {
                _id: "id1",
                sessionName: "session1",
                hasStarted: false,
                hasEnded: false,
                school: "SJSU",
                professorName: "Julian",
                startTime: new Date(),
                endTime: new Date(),
                groups: [ 1, 2 ]
            },
            {
                _id: "id2",
                sessionName: "session2",
                hasStarted: false,
                hasEnded: false,
                school: "SJSU",
                professorName: "Julian",
                startTime: new Date(),
                endTime: new Date(),
                groups: [ 1, 2 ]
            },
            {
                _id: "id3",
                sessionName: "session3",
                hasStarted: false,
                hasEnded: false,
                school: "SJSU",
                professorName: "Julian",
                startTime: new Date(),
                endTime: new Date(),
                groups: [ 1, 2 ]
            }
        ]
        return testArray;
    }

    useEffect(() => {
        getSessionsData();
    })


    if (!user) {
        return (
            <div>
                Not logged in.
            </div>
        )
    }

    return (
        <div>
            {user}
            <Container>
                <Row xs={1} md={3}>
                    {
                        sessions.map((session) => 
                            <div>
                                <Card key={session._id}>
                                    <Card.Body>
                                        <Card.Title>{session.sessionName}</Card.Title>
                                        <Card.Text>
                                        </Card.Text>
                                    </Card.Body>
                                </Card> 
                            </div>)
                    }
                </Row>
            </Container>
        </div>
    )
}