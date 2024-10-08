// src/controllers/foodController.js
import { addFoodToDatabase, getCaloriesForFood } from '../services/calorieService.js';

let diaryEntries = [];
let currentEntryId = 1;
let currentFoodId = 4; // Starting from 4 since 1-3 are predefined

export const getDiaryEntries = (req, res) => {
  res.json(diaryEntries);
};

export const addDiaryEntry = async (req, res) => {
  let { food, count, calories: inputCalories, date } = req.body;

  if (!food || !count) {
    res.status(400).json({ message: "Food and count are required." });
    return;
  }

  let calories = getCaloriesForFood(food);

  if (calories === null) {
    if (!inputCalories) {
      res.status(400).json({ message: "Calories are required for new food items." });
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

  date = date ?? new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  console.log('date', date);
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


export const updateDiaryEntry = (req, res) => {
  const { id } = req.params;
  const { food, count, calories } = req.body;

  const entryIndex = diaryEntries.findIndex((entry) => entry.id === parseInt(id));

  if (entryIndex === -1) {
    res.status(404).json({ message: "Diary entry not found." });
    return;
  }
  let updatedCalories = calories;
  // Update the entry
  diaryEntries[entryIndex] = {
    ...diaryEntries[entryIndex],
    food,
    count,
    calories: updatedCalories * count,
  };
  res.status(200).json(diaryEntries[entryIndex]);
};


// src/controllers/foodController.js

export const getFoodCalories = (req, res) => {
  const { food } = req.params;
  const calories = getCaloriesForFood(food);
  
  if (calories === null) {
    return res.status(404).json({ message: "Food not found." });
  }

  return res.status(200).json({ food, calories });
};

export const addFoodEntry = (req, res) => {
  const { food, calories } = req.body;

  if (!food || !calories) {
    return res.status(400).json({ message: "Food and calories are required to add a new entry." });
  }

  const newFoodItem = {
    id: currentFoodId++,
    name: food,
    calories: parseInt(calories, 10),
  };

  addFoodToDatabase(newFoodItem);
  return res.status(201).json(newFoodItem);
};


