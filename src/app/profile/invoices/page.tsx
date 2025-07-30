"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../_profileComponents/DataTable";

type Invoice = {
  id: number;
  student: string;
  course: string;
  amount: number;
  date: string;
};

const invoices: Invoice[] = [
  { id: 1, student: "أحمد", course: "فيزياء", amount: 300, date: "2025-07-01" },
  {
    id: 2,
    student: "فاطمة",
    course: "رياضيات",
    amount: 250,
    date: "2025-07-2",
  },
  { id: 3, student: "حمزه", course: "فيزياء", amount: 500, date: "2025-07-04" },
  { id: 4, student: "جنا", course: "رياضيات", amount: 600, date: "2025-07-05" },
  { id: 5, student: "مريم", course: "فيزياء", amount: 700, date: "2025-07-07" },
  { id: 6, student: "يوسف", course: "رياضيات", amount: 521, date: "2025-8-01" },
  { id: 7, student: "هبه", course: "فيزياء", amount: 250, date: "2025-8-03" },
  { id: 8, student: "هبه", course: "فيزياء", amount: 250, date: "2025-8-03" },
  { id: 9, student: "هبه", course: "فيزياء", amount: 250, date: "2025-8-03" },
  { id: 10, student: "هبه", course: "فيزياء", amount: 250, date: "2025-8-03" },
  { id: 11, student: "هبه", course: "فيزياء", amount: 250, date: "2025-8-03" },
  { id: 12, student: "هبه", course: "فيزياء", amount: 250, date: "2025-8-03" },
];

const columns: ColumnDef<Invoice>[] = [
  { accessorKey: "student", header: "الطالب" },
  { accessorKey: "course", header: "الكورس" },
  { accessorKey: "amount", header: "المبلغ" },
  { accessorKey: "date", header: "التاريخ" },
];

export default function InvoicePage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">فواتير الطالب</h1>
      <DataTable columns={columns} data={invoices} searchColumn="الاسم" />
    </div>
  );
}
