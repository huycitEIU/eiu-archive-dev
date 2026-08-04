import {describe, it, expect} from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';

describe('POST /api/auth/login', () => {
    it('should return 200 and a token for valid credentials', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'user1',
                password: '123'
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
    });

    it('should return 400 for invalid credentials', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'invaliduser',
                password: 'invalidpassword'
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});