"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type statelist = {
  id: number;
  name: string;
};

interface DropdownProps {
  data: statelist[];
  placeholder?: string;
  label?: string;
  value?: number | string;
  onChange?: (value: number) => void;
  loading?: boolean;
  feedback?: string;
}

export function Dropdown({
  data,
  placeholder = "اختر عنصر",
  label,
  value,
  onChange,
  loading = false,
  feedback,
}: DropdownProps) {
  const selected = data.find((item) => item.id === value);

  return (
    <div className="w-full space-y-1">
      {label && <label className="text-sm text-gray-600">{label}</label>}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            disabled={loading}
            className="w-full border px-4 py-2 rounded bg-white text-start shadow text-gray-700 disabled:bg-gray-100 disabled:text-gray-400"
          >
            {loading
              ? "جاري التحميل..."
              : selected
              ? selected.name
              : placeholder}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="!text-start w-[var(--radix-dropdown-menu-trigger-width)]"
        >
          {loading ? (
            <div className="px-4 py-2 text-neural-800 text-sm">
              جاري التحميل...
            </div>
          ) : data.length > 0 ? (
            data.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => onChange?.(item.id)}
                className="cursor-pointer !text-start"
              >
                {item.name}
              </DropdownMenuItem>
            ))
          ) : feedback ? (
            <div className="px-4 py-2 text-red-500 text-sm">{feedback}</div>
          ) : (
            <div className="px-4 py-2 text-neural-800 text-sm">
              لا توجد بيانات متاحة
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
