"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface CardSkeletonProps {
  length?: number; // عدد الكروت
}

export default function CardSkeleton({ length = 8 }: CardSkeletonProps) {
  return (
    <div className="container mx-auto flex w-full p-4">
      <div className="xl:m-8 lg:m-6 md:m-4 m-2  flex flex-col gap-4 w-full">
   <Skeleton className="h-8 lg:w-72 w-48 bg-gray-200 rounded" />

        <div className="my-6 xl:gap-8 md:gap-6 gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-4  sm:px-0 w-full">
          {Array.from({ length }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <Skeleton className="relative h-72 w-full bg-gray-200" />

              <div className="p-4 flex flex-col gap-2">
                <Skeleton className="h-7 w-3/4 bg-gray-200 rounded" />

                {/* Date Text */}
                <Skeleton className="h-5 w-1/2 bg-gray-200 rounded" />

                {/* Start Button */}
                <Skeleton className="h-12 w-full bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
