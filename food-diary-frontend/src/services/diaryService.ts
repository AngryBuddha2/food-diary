import axios from 'axios';
import { DiaryEntry } from '@/types';
// const API_URL = 'https://backend.istag.me/api';
const API_URL = 'http://localhost:3000/api';

interface AddDiaryEntryParams {
  food: string;
  count: number;
  calories: number;
}
export interface FoodCaloriesResponse {
    food: string;
    calories: number;
  
}

export const getDiaryEntries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(`${API_URL}/diary-entries`);
  return response.data;
};

export const addDiaryEntry = async (entry: AddDiaryEntryParams): Promise<DiaryEntry> => {
  const response = await axios.post<DiaryEntry>(`${API_URL}/diary-entries`, entry);
  return response.data;
};

export const deleteDiaryEntry = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/diary-entries/${id}`);
};


export const getFoodCalories = async (food: string) => {
  const response= await axios.get<FoodCaloriesResponse>(`${API_URL}/food-calories/${food}`);
  return response.data;
};

export const addFoodEntry = async (food: string, calories: number) => {
  const response = await axios.post(`${API_URL}/add-food`, { food, calories });
  return response.data;
};