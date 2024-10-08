import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DiaryEntry } from '@/types';

interface AddEntryFormProps {
    onAddEntry: (entry: DiaryEntry) => void;
    getFoodCalories: (food: string, calories?: number) => Promise<{ food: string; calories: number  }>;
    addFoodEntry: (food: string, calories: number) => void;
}

export function AddEntryForm({ onAddEntry, getFoodCalories, addFoodEntry }: AddEntryFormProps) {
    const [newEntry, setNewEntry] = useState<Partial<DiaryEntry>>({ date: new Date().toISOString().split('T')[0] });

    const handleFoodBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const food = e.target.value;
    
        if (food) {
            try {
                const response = await getFoodCalories(food);
                console.log('response',response);    
                    const { calories } = response;
                    console.log("Calories fetched from API: ", calories); // Debugging log to verify calories value
    
                    setNewEntry(prev => ({
                        ...prev,
                        food,
                        calories,
                        count: 1,
                    }));
                
            } catch (error) {
                console.warn("Food not found in directory, please enter calories manually.", error);
                setNewEntry(prev => ({ ...prev, food, calories: undefined }));
            }
        }
    };
    

    const addEntry = async () => {
        if (newEntry.date && newEntry.food && newEntry.count && newEntry.calories) {
            try {
                await getFoodCalories(newEntry.food);
            } catch (error) {
                console.log(error);
                await addFoodEntry(newEntry.food, newEntry.calories);
            }
            onAddEntry({ /* id: Date.now().toString(),*/ ...newEntry as DiaryEntry });
            setNewEntry({ date: new Date().toISOString().split('T')[0] });
        }
    };

    return (
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Entry</h2>
            <div className="flex flex-wrap gap-4">
                <Input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    className="w-full sm:w-auto"
                />
                <Input
                    type="text"
                    placeholder="Food"
                    value={newEntry.food || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, food: e.target.value })}
                    onBlur={handleFoodBlur}
                    className="w-full sm:w-auto"
                />
                <Input
                    type="number"
                    placeholder="Count"
                    value={newEntry.count || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, count: parseInt(e.target.value) })}
                    className="w-full sm:w-auto"
                />
                <Input
                    type="number"
                    placeholder="Calories"
                    value={newEntry.calories || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, calories: parseInt(e.target.value) })}
                    className="w-full sm:w-auto"
                />
                <Button onClick={addEntry} className="w-full sm:w-auto">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Entry
                </Button>
            </div>
        </div>
    );
}