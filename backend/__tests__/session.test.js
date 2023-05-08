const request = require('supertest');
const app = require('../index');
const Session = require('../models/session');
const mongoose = require('mongoose');

describe('Testing session routes', () => {
    test('POST /session/createSession should return 200 and return a session id', async () => {
        const createSessionTest = {
            professorId: "6439e5f603855e30f1764dd3",
            professorName: "Professor Name",
            university: "SJSU",
            title: "Assignment 1 Office Hours",
            class: "CS 166",
            description: "Supertest Test",
            location: "https://sjsu.zoom.us/234941879",
            startTime: "2023-05-27 09:45",
            endTime: "2023-05-27 10:45",
            inSession: false,
            groups: [],
            currentGroupIndex: 0
        };

        const response = await request(app).post('/session/createSession').send(createSessionTest);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).not.toBeNull();
    });

    test('GET session/:session_id/details should return 200 and return the details of that session_id', async () => {
        const response = await request(app).get('/session/64589069f806a4c7339d7fcb/details');
        expect(response.statusCode).toBe(200);
        expect(response.body.professorId).toBe("64554b8b308cd1fe4889f7e2");
        expect(response.body.professorName).toBe("Kimberly Chang");
        expect(response.body.title).toBe("Assignment 1 Office Hours");
    });

    // deletes create session
    afterAll(async () => {
        await Session.findOneAndDelete({ description: "Supertest Test" })
        await mongoose.connection.close();
    })
});
