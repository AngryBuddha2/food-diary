import { Button } from "@/components/ui/button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="mt-4 flex justify-between">
            <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
            >
                Previous Week
            </Button>
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
                Next Week
            </Button>
        </div>
    );
}