// src/controllers/foodController.ts
import { FoodItem } from "../models/foodItem";
import {
  addFoodToDatabase,
  getCaloriesForFood,
} from "../services/calorieService";
import { RequestHandler } from "express";

interface DiaryEntry {
  id: number;
  date: string;
  food: string;
  count: number;
  calories: number;
}

let diaryEntries: DiaryEntry[] = [];
let currentEntryId = 1;
let currentFoodId = 4; // Starting from 4 since 1-3 are predefined

export const getDiaryEntries: RequestHandler = (req, res) => {
  res.json(diaryEntries);
};

export const addDiaryEntry: RequestHandler = (req, res) => {
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
    const newFoodItem: FoodItem = {
      id: currentFoodId++,
      name: food,
      calories: inputCalories,
    };
    addFoodToDatabase(newFoodItem);
    calories = inputCalories;
  }

  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // The previous check ensures calories is not null here
  const totalCalories = calories! * count;

  const newEntry: DiaryEntry = {
    id: currentEntryId++,
    date,
    food,
    count,
    calories: totalCalories,
  };

  diaryEntries.push(newEntry);
  res.status(201).json(newEntry);
};

export const deleteDiaryEntry: RequestHandler = (req, res) => {
  const { id } = req.params;
  const index = diaryEntries.findIndex((entry) => entry.id === parseInt(id));

  if (index === -1) {
    res.status(404).json({ message: "Diary entry not found." });
  }

  diaryEntries.splice(index, 1);
  res.status(204).send();
};
