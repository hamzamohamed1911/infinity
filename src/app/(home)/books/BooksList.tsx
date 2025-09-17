"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { GetBooks } from "@/lib/apis/books.api";
import { placeholder } from "../../../../public";
import { Skeleton } from "@/components/ui/skeleton";

export default function BooksList() {
  const [page, setPage] = useState(1);
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  const { data, isLoading, isError, isFetching } = useQuery<BooksApiResponse>({
    queryKey: ["books", page],
    queryFn: async () => {
      const response = await GetBooks({ page });
      return response as BooksApiResponse;
    },
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (data?.data?.items) {
      setAllBooks((prevBooks) => [...prevBooks, ...data.data.items]);
    }
  }, [data]);

  if (isLoading && page === 1) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              className="animate-pulse bg-gray-200 h-64 rounded-2xl"
            ></Skeleton>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-center text-red-500">حدث خطأ أثناء تحميل البيانات</p>
    );
  }

  const pagination = data.data.pagination;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 flex-1">
        {allBooks.map((book: Book) => (
          <div
            key={book.id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 h-[60vh]"
          >
            <div>
              <div className="relative w-full h-56 mb-3">
                <Image
                  src={book.image || placeholder}
                  alt={book.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <h3 className="text-lg font-semibold line-clamp-1">
                {book.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {book.description || "لا يوجد وصف"}{" "}
                {/* Handle null description */}
              </p>
              <p className="text-sm text-gray-500">
                السعر:
                <span className="font-bold text-primary">
                  {book.price} جنيه
                </span>
              </p>
            </div>

            <Link
              href={`/books/${book.id}`}
              className="mt-4 inline-block text-center bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-400 transition-colors"
            >
              عرض التفاصيل
            </Link>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {page < pagination.last_page && (
        <div className="mt-auto pb-8 flex items-center justify-center">
          <button
            onClick={() => setPage((old) => old + 1)}
            disabled={isFetching}
            className={`bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-400 transition-colors ${
              isFetching ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isFetching ? "جارٍ التحميل..." : "عرض المزيد"}
          </button>
        </div>
      )}
    </div>
  );
}
