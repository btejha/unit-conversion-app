const request = require('supertest');
const path = require('path');
const fs = require('fs');
const app = require('../app');  // Adjust the path as needed

let server;

// Mock the conversionRoutes module to avoid actual route handling
jest.mock('../routes/conversionRoutes', () => {
    const express = require('express');
    const router = express.Router();
    router.get('/some-endpoint', (req, res) => res.status(200).send('Mocked endpoint response'));
    return router;
});

beforeAll((done) => {
    // Start the server before running tests
    server = app.listen(0, done);  // Listen on a random available port
});

afterAll((done) => {
    // Close the server after all tests are complete
    server.close(done);
});

describe('Testing Express app', () => {
    test('GET / should respond with "Unit Conversion API"', async () => {
        const response = await request(server).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Unit Conversion API');
    });

    test('GET /api/some-endpoint should respond with mocked data', async () => {
        const response = await request(server).get('/api/some-endpoint');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Mocked endpoint response');
    });

    test('GET /non-existent-route should serve index.html', async () => {
        // Ensure the path to index.html is correct
        const indexPath = path.join(__dirname, '..', 'frontend', 'dist', 'index.html');
        const indexFileExists = fs.existsSync(indexPath);

        // Perform the request
        const response = await request(server).get('/non-existent-route');

        // Verify the response
        expect(response.statusCode).toBe(200);
        expect(response.header['content-type']).toMatch(/html/);
        if (indexFileExists) {
            expect(response.text).toContain('<!DOCTYPE html>'); // Basic check for HTML content
        } else {
            console.warn('index.html file does not exist at expected path.');
        }
    });
});
