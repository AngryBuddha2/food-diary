import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { DiaryEntry } from '@/types';

interface EntryRowProps {
    entry: DiaryEntry;
    onUpdate: (id: string, updatedEntry: Partial<DiaryEntry>) => void;
    onDelete: (id: string) => void;
}

export function EntryRow({ entry, onUpdate, onDelete }: EntryRowProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedEntry, setEditedEntry] = useState(entry);

    const handleSave = () => {
        onUpdate(entry.id, editedEntry);
        setIsEditing(false);
    };

    return (
        <TableRow className="group">
            <TableCell>
                {isEditing ? (
                    <Input
                        value={editedEntry.food}
                        onChange={(e) => setEditedEntry({ ...editedEntry, food: e.target.value })}
                    />
                ) : (
                    entry.food
                )}
            </TableCell>
            <TableCell>
                {isEditing ? (
                    <Input
                        type="number"
                        value={editedEntry.count}
                        onChange={(e) => setEditedEntry({ ...editedEntry, count: parseInt(e.target.value) })}
                    />
                ) : (
                    entry.count
                )}
            </TableCell>
            <TableCell>
                {isEditing ? (
                    <Input
                        type="number"
                        value={editedEntry.calories}
                        onChange={(e) => setEditedEntry({ ...editedEntry, calories: parseInt(e.target.value) })}
                    />
                ) : (
                    entry.calories
                )}
            </TableCell>
            <TableCell>
                <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isEditing ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsEditing(true)}
                        >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(entry.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}