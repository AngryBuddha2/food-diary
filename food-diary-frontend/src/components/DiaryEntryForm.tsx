// src/components/DiaryEntryForm.tsx
import React, { useState } from "react";
import { addDiaryEntry } from "../services/diaryService";
// import { AxiosError } from 'axios';


interface Props {
    onAdd: () => void;
}

const DiaryEntryForm: React.FC<Props> = ({ onAdd }) => {
    const [food, setFood] = useState("");
    const [count, setCount] = useState("");
    const [calories, setCalories] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!food || !count) return;

        const entry = {
            food,
            count: Number(count),
            calories: calories ? Number(calories) : undefined,
        };

        try {
            await addDiaryEntry(entry);
            setFood("");
            setCount("");
            setCalories("");
            onAdd();
        } catch (error) {
            //   alert(error.response.data.message);
            console.log("error", error);
            // if (isAxiosError(error)) {
            //     // console.log(error.status);
            //     // console.error(error.response);
            //     // Do something with this error...
            // } else {
            //     console.error(error);
            // }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Food name"
                value={food}
                onChange={(e) => setFood(e.target.value)}
            />
            <input
                type="number"
                placeholder="Count"
                value={count}
                onChange={(e) => setCount(e.target.value)}
            />
            <input
                type="number"
                placeholder="Calories (if new food)"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
            />
            <button type="submit">Add Entry</button>
        </form>
    );
};

export default DiaryEntryForm;
