/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { DataTable } from "../../_profileComponents/DataTable";
import { useState } from "react";
import {  useQuery } from "@tanstack/react-query";
import { GetExamStatistics } from "@/lib/apis/statistics.api";
import { formatDateArabic } from "@/lib/utils/formatDateArabic";
import { Badge } from "@/components/ui/badge";


export declare type ColumnDefWithCell<T> ={
  accessorKey: keyof T;
  header: string;
  cell?: (row: T) => React.ReactNode;
}

const columns: ColumnDefWithCell<ExamReport>[] = [
  { accessorKey: "exam_name", header: "الامتحان" },
  { accessorKey: "final_grade", header: "الدرجة" },
  {
    accessorKey: "exam_start_date",
    header: "تاريخ البداية",
    cell: (row) => formatDateArabic(row.exam_start_date),
  },
  {
    accessorKey: "exam_end_date",
    header: "تاريخ النهاية",
    cell: (row) => formatDateArabic(row.exam_end_date),
  },
  {
    accessorKey: "is_success",
    header: "الحالة",
    cell: (row) => (
             <Badge
        variant={row.is_success === 1 ? "secondary" : "destructive"} 
        className="text-xs px-2 py-1"
      >
        {row.is_success === 1 ? "ناجح" : "راسب"}
      </Badge>
    ),
  },
];



export default function ExamTable() {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // React Query
const { data, isLoading, error } = useQuery<ApiResponse, Error>({
  queryKey: ["exam-report", search, startDate, endDate, page, perPage],
  queryFn: async () =>
    GetExamStatistics({
      id: 1,
      keyword: search,
      start_date: startDate?.toISOString().split("T")[0],
      end_date: endDate?.toISOString().split("T")[0],
      page,
      per_page: perPage,
    }),
});



  return (
    <DataTable
      columns={columns}
      data={data}
      onSearch={(value) => {
        setSearch(value);
        setPage(1);
      }}
      onDateFilter={(start, end) => {
        setStartDate(start);
        setEndDate(end);
        setPage(1);
      }}
      onPageChange={(newPage) => setPage(newPage)}
      onPerPageChange={(newPerPage) => {
        setPerPage(newPerPage);
        setPage(1);
      }}
      isLoading={isLoading}
      perPage={perPage}
    />
  );
}
