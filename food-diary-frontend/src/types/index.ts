export interface DiaryEntry {
    id: string;
    date: string;
    food: string;
    count: number;
    calories: number;
  }
  
  export interface DailySummary {
    date: string;
    totalCalories: number;
    dailyRequirement: number;
    net: number;
    status: 'red' | 'yellow' | 'green';
  }