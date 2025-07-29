// components/skeletons/CourseDetailsSkeleton.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";

const CourseDetailsSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 my-6">
      <Skeleton className="h-8 w-64" />
      <div className="h-36 rounded-md  border-[#C285F0]/30 border-[1px] grid grid-cols-10 justify-center items-center">
        <div className="col-span-7 p-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="col-span-3 w-full h-full relative p-2">
          <Skeleton className="w-full h-full rounded-md" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 2xl:min-h-72 min-h-60">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-20 w-full" />
        </div>
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
    </div>
  );
};

export default CourseDetailsSkeleton;
