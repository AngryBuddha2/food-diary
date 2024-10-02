import { DiaryEntry } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DAILY_CALORIE_REQUIREMENT = 2000;

export const foodDatabase: Record<string, number> = {
  'Apple': 95,
  'Banana': 105,
  'Chicken Sandwich': 450,
  'Salad': 200,
  'Yogurt': 150,
};

export const fetchFoodCalories = (food: string): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(foodDatabase[food] || 0)
    }, 500)
  })
};

export const getDayFromDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export const calculateDailyIntake = (entries: DiaryEntry[]) => {
  return entries.reduce((sum, entry) => sum + entry.calories, 0);
};

export const calculateNet = (dailyIntake: number) => {
  return DAILY_CALORIE_REQUIREMENT - dailyIntake;
};

export const getNetColor = (net: number) => {
  const absNet = Math.abs(net);
  const percentage = (absNet / DAILY_CALORIE_REQUIREMENT) * 100;
  if (percentage <= 10) return 'text-green-500';
  if (percentage <= 30) return 'text-yellow-500';
  return 'text-red-500';
};