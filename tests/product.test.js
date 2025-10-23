const request = require('supertest');
const app = require('../server');
require('dotenv').config();

describe('Test of products routes', () => {
    // Get history of products
    it('GET /api/estok/product/get-history', async () => {
        const response = await request(app.server).get('/api/estok/product/get-history').set('x-api-key', process.env.AUTH_KEY);

        expect(response.statusCode).toBe(200);
    })

    // Get product and its status
    it('GET /api/estok/product/product-status', async () => {
        const response = await request(app.server).get('/api/estok/product/get-product-status').set('x-api-key', process.env.AUTH_KEY);

        expect(response.statusCode).toBe(200);
    })
});
