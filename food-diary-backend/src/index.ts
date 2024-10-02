// src/index.ts
import express from 'express';
import cors from 'cors';
import foodRoutes from './routes/foodRoutes';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', foodRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
