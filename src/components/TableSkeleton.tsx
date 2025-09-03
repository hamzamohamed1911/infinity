// TableSkeleton.tsx
import * as React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  columns: number; // عدد الأعمدة
  rows?: number; // عدد الصفوف
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columns,
  rows = 10,
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <TableRow key={rowIdx}>
          {Array.from({ length: columns }).map((_, colIdx) => (
            <TableCell key={colIdx} className="py-4">
              <Skeleton className="h-4 w-full rounded" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
