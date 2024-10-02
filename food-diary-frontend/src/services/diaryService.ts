// src/services/diaryService.ts
import axios from 'axios';
import { DiaryEntry } from '../types';

const API_URL = 'http://backend.istag.me/api';

export const getDiaryEntries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(`${API_URL}/diary-entries`);
  return response.data;
};

interface AddDiaryEntryParams {
  food: string;
  count: number;
  calories?: number;
}

export const addDiaryEntry = async (entry: AddDiaryEntryParams): Promise<DiaryEntry> => {
  const response = await axios.post<DiaryEntry>(`${API_URL}/diary-entries`, entry);
  return response.data;
};

export const deleteDiaryEntry = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/diary-entries/${id}`);
};
