// src/App.tsx
import React, { useState, useEffect } from 'react';
import { getDiaryEntries, deleteDiaryEntry } from './services/diaryService';
import { DiaryEntry } from './types';
import DiaryEntryForm from './components/DiaryEntryForm';
import DiaryEntryList from './components/DiaryEntryList';

const App: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  const fetchEntries = async () => {
    const data = await getDiaryEntries();
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteDiaryEntry(id);
    fetchEntries();
    // setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <div className="App">
      <h1>Food Diary</h1>
      <DiaryEntryForm onAdd={fetchEntries} />
      <DiaryEntryList entries={entries} onDelete={handleDelete} />
    </div>
  );
};

export default App;
