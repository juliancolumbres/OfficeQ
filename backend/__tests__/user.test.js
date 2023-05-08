const request = require('supertest');
const app = require('../index');
const User = require('../models/user');
const mongoose = require('mongoose');

describe('Testing user routes', () => {
    test('POST /user/login should return 200 and return the correct user_id', async () => {
        const loginTest = { email: "testStudent1@gmail.com", password: "test", userRole: "Student" };
        const response = await request(app).post('/user/login').send(loginTest);
        expect(response.statusCode).toBe(200);
        expect(response.body.user_id).toBe("6442ca4f247c40528e718e9c");
    });

    test('POST /user/signup should return 200 and return the correct user_id', async () => {
        const signUpTest = { university: "SJSU", name: "John Cena", email: "cantseeme@gmail.com", password: "test", userRole: "Student" };
        const response = await request(app).post('/user/signup').send(signUpTest);
        expect(response.statusCode).toBe(200);
        expect(response.body.user_id).not.toBeNull();
    });

    test('GET /user/:userId/name should return 200 and return the correct name', async () => {
        const response = await request(app).get('/user/6442ca4f247c40528e718e9c/name');
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Julian Bob");
    });

    // deletes sign up test entry
    afterAll(async () => {
        await User.findOneAndDelete({ email: "cantseeme@gmail.com" });
        await mongoose.connection.close();
    })
});