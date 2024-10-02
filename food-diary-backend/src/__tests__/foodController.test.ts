// src/__tests__/foodController.test.ts
import request from 'supertest';
import express from 'express';
import foodRoutes from '../routes/foodRoutes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', foodRoutes);

describe('Food Diary API', () => {
  it('should add a new diary entry', async () => {
    const response = await request(app)
      .post('/api/diary-entries')
      .send({ food: 'Apple', count: 2 });

    expect(response.status).toBe(201);
    expect(response.body.food).toBe('Apple');
    expect(response.body.count).toBe(2);
  });

  it('should retrieve diary entries', async () => {
    const response = await request(app).get('/api/diary-entries');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should delete a diary entry', async () => {
    const postResponse = await request(app)
      .post('/api/diary-entries')
      .send({ food: 'Banana', count: 1, calories: 105 });

    const { id } = postResponse.body;

    const deleteResponse = await request(app).delete(`/api/diary-entries/${id}`);

    expect(deleteResponse.status).toBe(204);
  });

  it('should handle adding a new food item', async () => {
    const response = await request(app)
      .post('/api/diary-entries')
      .send({ food: 'Mango', count: 1, calories: 99 });

    expect(response.status).toBe(201);
    expect(response.body.food).toBe('Mango');
    expect(response.body.calories).toBe(99);
  });

  it('should return 400 if calories are not provided for a new food', async () => {
    const response = await request(app)
      .post('/api/diary-entries')
      .send({ food: 'Pineapple', count: 1 });

    expect(response.status).toBe(400);
  });
});
