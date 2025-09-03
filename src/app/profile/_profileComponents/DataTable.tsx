import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnDefWithCell } from "../exams/_components/ExamTable";
import { FaSearch } from "react-icons/fa";
import { TableSkeleton } from "@/components/TableSkeleton";

interface ReusableTableProps {
  columns: ColumnDefWithCell<ExamReport>[]; // <--- هنا
  data: ApiResponse | undefined;
  onSearch: (value: string) => void;
  onDateFilter: (start: Date | undefined, end: Date | undefined) => void;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  isLoading: boolean;
  perPage: number; // <- أضف هذا

}

export function DataTable({
  columns,
  data,
  onSearch,
  onDateFilter,
  onPageChange,
  onPerPageChange,
  isLoading,
  perPage
}: ReusableTableProps) {
  const [search, setSearch] = React.useState("");
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  return (
    <div className="space-y-4 w-full bg-white rounded-md lg:p-8 md:p-6 p-4">
      <div className="relative md:w-64 w-auto">
        <Input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value);
          }}
          className="pe-10 bg-white rounded-3xl shadow-sm "
          placeholder="ابحث عن..."
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex flex-wrap gap-2  items-center">
          {/* Start Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-40 justify-between">
                {startDate ? startDate.toLocaleDateString() : "تاريخ البداية"}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(date);
                  onDateFilter(date, endDate);
                }}
              />
            </PopoverContent>
          </Popover>

          {/* End Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-40 justify-between">
                {endDate ? endDate.toLocaleDateString() : "تاريخ النهاية"}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => {
                  setEndDate(date);
                  onDateFilter(startDate, date);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Per Page */}
        <Select dir="rtl" onValueChange={(val) => onPerPageChange(Number(val))}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="عدد الصفوف" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <ScrollArea className="h-[450px]">
        <Table dir="rtl" className="w-full">
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  className="text-start py-4"
                  key={col.accessorKey as string}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
               <TableSkeleton columns={columns.length} rows={perPage} />

            ) : data?.data.length ? (
              data.data.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((col) => (
                    <TableCell key={col.accessorKey as string} className="py-4">
                      {col.cell ? col.cell(row) : row[col.accessorKey]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  لا توجد بيانات
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      {/* Pagination */}
      {data && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {/* First page */}
          <Button
            className="border-primary text-primary"
            variant="outline"
            disabled={data?.current_page === 1}
            onClick={() => onPageChange(1)}
          >
            &laquo; الأول
          </Button>

          {/* Previous page */}
          <Button
            className="border-primary text-primary"
            variant="outline"
            disabled={!data?.prev_page_url}
            onClick={() => onPageChange(data!.current_page - 1)}
          >
            السابق
          </Button>

          {/* Page numbers */}
          {Array.from({ length: data?.last_page || 0 }, (_, i) => i + 1).map(
            (pageNum) => {
              // عرض أول 3 صفحات + ... + آخر صفحة لو الصفحات كتير
              if (data!.last_page! > 5) {
                if (pageNum > 3 && pageNum < data!.last_page!) return null;
              }
              return (
                <Button
                  key={pageNum}
                  className={`font-semibold ${
                    pageNum === data?.current_page
                      ? " text-white"
                      : "text-primary"
                  } px-4 py-1 rounded`}
                  onClick={() => onPageChange(pageNum)}
                  variant={
                    pageNum === data?.current_page ? "default" : "outline"
                  }
                >
                  {pageNum}
                </Button>
              );
            }
          )}

          {/* Ellipsis لو الصفحات أكتر من 5 */}
          {data!.last_page! > 5 && <span className="px-2">...</span>}

          {/* Last page */}
          {data!.last_page! > 3 && (
            <Button
              variant="outline"
              className="border-primary text-primary"
              onClick={() => onPageChange(data!.last_page!)}
            >
              {data!.last_page}
            </Button>
          )}

          {/* Next page */}
          <Button
            variant="outline"
            className="border-primary text-primary"
            disabled={!data?.next_page_url}
            onClick={() => onPageChange(data!.current_page + 1)}
          >
            التالي
          </Button>
        </div>
      )}
    </div>
  );
}
