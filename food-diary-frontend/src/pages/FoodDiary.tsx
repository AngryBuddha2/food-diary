import { useState, useEffect } from 'react';
import { AddEntryForm } from '@/components/AddEntryForm';
import { DailyEntries } from '@/components/DailyEntries';
import { Pagination } from '@/components/Pagination';
import { DiaryEntry } from '@/types';

// api endpoints 
import { getDiaryEntries, addDiaryEntry, deleteDiaryEntry, getFoodCalories,addFoodEntry } from '@/services/diaryService';

export function FoodDiary() {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [expandedDates, setExpandedDates] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const fetchEntries = async () => {
        try {
            const data = await getDiaryEntries();
            setEntries(data);
        } catch (error) {
            console.error('Failed to fetch diary entries:', error);
        }
    };
    useEffect(() => {
        fetchEntries();
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
        setExpandedDates([today, yesterday]);
    }, []);

    const addEntry = (newEntry: DiaryEntry) => {
        // setEntries([newEntry, ...entries]);
        const updateData = async () => {
            try {
                console.log("newEntry", newEntry);
                await addDiaryEntry(newEntry);
                // setEntries([data, ...entries]);
                await fetchEntries();
            } catch (error) {
                console.error('Failed to add diary entry:', error);
            }
        }
        updateData();
        fetchEntries();
    };

   

    const deleteEntry = (id: string) => {
        // setEntries(entries.filter(entry => entry.id !== id));
        const deleteData = async () => {
            try {
                await deleteDiaryEntry(Number(id));
                await fetchEntries();
                // setEntries(entries.filter(entry => entry.id !== id));
            } catch (error) {
                console.error('Failed to delete diary entry:', error);
            }
        }
        deleteData();
    };

    const updateEntry = (id: string, updatedEntry: Partial<DiaryEntry>) => {
        setEntries(entries.map(entry => entry.id == id ? { ...entry, ...updatedEntry } : entry));
    };

    
    const toggleDateExpansion = (date: string) => {
        setExpandedDates(prev =>
            prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
        );
    };

    const groupedEntries = entries.reduce((acc, entry) => {
        const date = entry.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(entry);
        return acc;
    }, {} as Record<string, DiaryEntry[]>);

    const sortedDates = Object.keys(groupedEntries).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    const paginatedDates = sortedDates.slice(currentPage * 7, (currentPage + 1) * 7);

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Food Diary</h1>

            <AddEntryForm onAddEntry={addEntry} getFoodCalories= {getFoodCalories} addFoodEntry={addFoodEntry}/>

            {paginatedDates.map((date) => (
                <DailyEntries
                    key={date}
                    date={date}
                    entries={groupedEntries[date]}
                    isExpanded={expandedDates.includes(date)}
                    onToggleExpand={() => toggleDateExpansion(date)}
                    onUpdateEntry={updateEntry}
                    onDeleteEntry={deleteEntry}
                />
            ))}

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(sortedDates.length / 7)}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}