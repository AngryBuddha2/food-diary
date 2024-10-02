// src/components/DiaryEntryList.tsx
import React from 'react';
import { DiaryEntry } from '../types';

interface Props {
  entries: DiaryEntry[];
  onDelete: (id: number) => void;
}

const DiaryEntryList: React.FC<Props> = ({ entries, onDelete }) => {
  const groupedEntries = entries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {} as Record<string, DiaryEntry[]>);

  // Hardcoded daily requirement (e.g., 2000 kcal)
  const dailyRequirement = 2000;

  return (
    <div>
      {Object.entries(groupedEntries).map(([date, entries]) => {
        const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
        const net = dailyRequirement - totalCalories;
        let status: 'red' | 'yellow' | 'green' = 'red';

        const differencePercentage = Math.abs(net) / dailyRequirement;

        if (differencePercentage <= 0.1) {
          status = 'green';
        } else if (differencePercentage <= 0.3) {
          status = 'yellow';
        }

        return (
          <div key={date}>
            <h2>{date}</h2>
            <table>
              <thead>
                <tr>
                  <th>Food</th>
                  <th>Count</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {entries.map(entry => (
                  <tr key={entry.id}>
                    <td>{entry.food}</td>
                    <td>{entry.count}</td>
                    <td>{entry.calories}</td>
                    <td><button onClick={()=>onDelete(entry.id)}>delete</button></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>Total Calories</td>
                  <td>{totalCalories}</td>
                </tr>
                <tr>
                  <td colSpan={2}>Daily Requirement</td>
                  <td>{dailyRequirement}</td>
                </tr>
                <tr>
                  <td colSpan={2}>NET</td>
                  <td style={{ color: status }}>{net}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default DiaryEntryList;
