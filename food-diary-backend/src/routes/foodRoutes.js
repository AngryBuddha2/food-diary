import express from 'express';
import { getDiaryEntries, addDiaryEntry, deleteDiaryEntry, updateDiaryEntry, getFoodCalories, addFoodEntry } from '../controllers/foodController.js';

const router = express.Router();

router.get('/diary-entries', getDiaryEntries);
router.post('/diary-entries', addDiaryEntry);
router.delete('/diary-entries/:id', deleteDiaryEntry);
router.put('/diary-entries/:id', updateDiaryEntry);
router.get('/food-calories/:food', getFoodCalories);
router.post('/add-food', addFoodEntry);


export default router;
