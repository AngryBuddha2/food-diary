// src/controllers/foodController.js
import { addFoodToDatabase, getCaloriesForFood } from '../services/calorieService.js';

let diaryEntries = [];
let currentEntryId = 1;
let currentFoodId = 4; // Starting from 4 since 1-3 are predefined

export const getDiaryEntries = (req, res) => {
  res.json(diaryEntries);
};

export const addDiaryEntry = (req, res) => {
  const { food, count } = req.body;

  if (!food || !count) {
    res.status(400).json({ message: "Food and count are required." });
    return;
  }

  let calories = getCaloriesForFood(food);

  if (calories === null) {
    const { calories: inputCalories } = req.body;
    if (!inputCalories) {
      res.status(400).json({
        message: "Calories are required for new food items.",
      });
      return;
    }

    // Add new food to the database
    const newFoodItem = {
      id: currentFoodId++,
      name: food,
      calories: inputCalories,
    };
    addFoodToDatabase(newFoodItem);
    calories = inputCalories;
  }

  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // The previous check ensures calories is not null here
  const totalCalories = calories * count;

  const newEntry = {
    id: currentEntryId++,
    date,
    food,
    count,
    calories: totalCalories,
  };

  diaryEntries.push(newEntry);
  res.status(201).json(newEntry);
};

export const deleteDiaryEntry = (req, res) => {
  const { id } = req.params;
  const index = diaryEntries.findIndex((entry) => entry.id === parseInt(id));

  if (index === -1) {
    res.status(404).json({ message: "Diary entry not found." });
    return;
  }

  diaryEntries.splice(index, 1);
  res.status(204).send();
};