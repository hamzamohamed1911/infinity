"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { NewQuestionForm } from "@/components/forum/NewQuestionForm";

const dummyQuestions = Array.from({ length: 200 }).map((_, i) => {
  const names = [
    "سارة أحمد",
    "محمد سعيد",
    "ليلى يوسف",
    "خالد حسن",
    "أحمد جمال",
  ];
  const name = names[i % names.length];
  return {
    id: i + 1,
    question: `سؤال رقم ${i + 1}: ما الفرق بين "${
      ["الهمزة", "التمييز", "الحال", "إنّ", "الدخيل"][i % 5]
    }"؟`,
    author: name,
    authorImg: `https://i.pravatar.cc/150?u=${encodeURIComponent(name)}`,
  };
});

const QUESTIONS_PER_PAGE = 10;

export default function ForumPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dummyQuestions.length / QUESTIONS_PER_PAGE);

  const paginatedQuestions = dummyQuestions.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 4;
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
      pages.push(
        <Button key="first" variant="ghost" onClick={() => handlePageChange(1)}>
          1
        </Button>,
        <span key="dots" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "ghost"}
          className={`${i === currentPage ? "text-white" : "text-gray-400"}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <span key="dots2" className="px-2 text-gray-400">
          ...
        </span>,
        <Button
          key="last"
          variant="ghost"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <main className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">منتدى الطلاب</h1>
      <NewQuestionForm />

      <div className="text-sm text-gray-500 text-center">
        عرض {paginatedQuestions.length} من {dummyQuestions.length} سؤالًا
      </div>

      <div className="space-y-3">
        {paginatedQuestions.map((q) => (
          <Link
            href={`/dashboard/forum/${q.id}`}
            key={q.id}
            className="flex items-center p-4 bg-white rounded shadow-sm border hover:bg-gray-50 transition"
          >
            <Image
              src={q.authorImg}
              alt={q.author}
              width={40}
              height={40}
              className="rounded-full ml-3"
            />
            <div className="text-right flex-1">
              <p className="text-base font-medium">{q.question}</p>
              <p className="text-xs text-gray-500 mt-1">بواسطة {q.author}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ✅ Pagination */}
      <div className="flex justify-center items-center gap-2 pt-6">
        <Button variant="ghost" size="icon" onClick={() => handlePageChange(1)}>
          <ArrowRight className="h-4 w-4" />
        </Button>

        {renderPagination()}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => handlePageChange(totalPages)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
    </main>
  );
}
