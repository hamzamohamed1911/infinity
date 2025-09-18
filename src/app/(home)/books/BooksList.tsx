"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { GetBooks } from "@/lib/apis/books.api";
import { placeholder } from "../../../../public";
import { Skeleton } from "@/components/ui/skeleton";

export default function BooksList() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    BooksApiResponse,
    Error,
    InfiniteData<BooksApiResponse>,
    [_key: string],
    number
  >({
    queryKey: ["books"],
    queryFn: async ({ pageParam = 1 }) => {
      return GetBooks({ page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.data.pagination;
      return pagination.current_page < pagination.last_page
        ? pagination.current_page + 1
        : undefined;
    },
  });

  const allBooks = data?.pages.flatMap((page) => page.data.items) ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              className="animate-pulse bg-gray-200 h-64 rounded-2xl"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">حدث خطأ أثناء تحميل البيانات</p>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 flex-1">
        {allBooks.map((book: Book) => (
          <div
            key={book.id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 h-[60vh]"
          >
            <div className="relative w-full h-56 mb-3">
              <Image
                src={book.image || placeholder}
                alt={book.name}
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <h3 className="text-lg font-semibold line-clamp-1">{book.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {book.description || "لا يوجد وصف"}
            </p>
            <p className="text-sm text-gray-500 mt-auto self-end flex">
              <span className="font-bold text-primary">{book.price} جنيه</span>
            </p>

            <Link
              href={`/books/${book.id}`}
              className="mt-4 inline-block text-center bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-400 transition-colors"
            >
              عرض التفاصيل
            </Link>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <div className="mt-auto pb-8 flex items-center justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={`bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-400 transition-colors ${
              isFetchingNextPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isFetchingNextPage ? "جارٍ التحميل..." : "عرض المزيد"}
          </button>
        </div>
      )}
    </div>
  );
}
