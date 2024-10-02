// src/routes/foodRoutes.ts
import express from 'express';
import { getDiaryEntries, addDiaryEntry, deleteDiaryEntry } from '../controllers/foodController.js';

const router = express.Router();

router.get('/diary-entries', getDiaryEntries);
router.post('/diary-entries', addDiaryEntry);
router.delete('/diary-entries/:id', deleteDiaryEntry);

export default router;
