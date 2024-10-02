import { CalendarDays, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { EntryRow } from './EntryRow';
import { DiaryEntry } from '@/types';
import { DAILY_CALORIE_REQUIREMENT, getDayFromDate, calculateDailyIntake, calculateNet, getNetColor } from '@/lib/utils';

interface DailyEntriesProps {
    date: string;
    entries: DiaryEntry[];
    isExpanded: boolean;
    onToggleExpand: () => void;
    onUpdateEntry: (id: string, updatedEntry: Partial<DiaryEntry>) => void;
    onDeleteEntry: (id: string) => void;
}

export function DailyEntries({ date, entries, isExpanded, onToggleExpand, onUpdateEntry, onDeleteEntry }: DailyEntriesProps) {
    const isToday = date === new Date().toISOString().split('T')[0];
    const isYesterday = date === new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];

    return (
        <Collapsible
            open={isExpanded}
            onOpenChange={onToggleExpand}
            className="mb-4 bg-white rounded-lg shadow overflow-hidden"
        >
            <div className="bg-gray-100 p-4 flex justify-between items-center">
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="p-0 hover:bg-transparent">
                        <h2 className="text-xl font-semibold flex items-center">
                            <CalendarDays className="w-5 h-5 mr-2" />
                            {isToday ? 'Today' : isYesterday ? 'Yesterday' : date} ({getDayFromDate(date)})
                        </h2>
                        {isExpanded ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
                    </Button>
                </CollapsibleTrigger>
                <div className="text-sm">
                    <span className="font-medium">Daily Requirement:</span> {DAILY_CALORIE_REQUIREMENT} calories
                </div>
            </div>
            <CollapsibleContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Food</TableHead>
                            <TableHead>Count</TableHead>
                            <TableHead>Calories</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {entries.map((entry) => (
                            <EntryRow
                                key={entry.id}
                                entry={entry}
                                onUpdate={onUpdateEntry}
                                onDelete={onDeleteEntry}
                            />
                        ))}
                    </TableBody>
                </Table>
                <div className="p-4 bg-gray-50 flex justify-between items-center">
                    <div>
                        <span className="font-medium">Daily Intake:</span> {calculateDailyIntake(entries)} calories
                    </div>
                    <div className={getNetColor(calculateNet(calculateDailyIntake(entries)))}>
                        <span className="font-medium">NET:</span> {calculateNet(calculateDailyIntake(entries))} calories
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}