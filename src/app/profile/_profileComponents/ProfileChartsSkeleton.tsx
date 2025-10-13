import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProfileChartsSkeleton = () => {
  const skeletonData = [1, 2, 3, 4];

  return (
    <div className="min-h-screen w-full flex flex-col gap-4">
      <Skeleton className="h-10 w-40 rounded-md" />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {skeletonData.map((_, index) => (
          <div
            key={index}
            className="bg-primary-100 rounded-xl px-4 py-6 shadow gap-4 flex flex-col items-center animate-pulse"
          >
            <div className="relative h-[120px] w-[120px]">
              <Skeleton className="absolute inset-0 rounded-full" />
            </div>
            <div className="h-10 rounded-3xl w-full flex gap-2">
              <Skeleton className="rounded-3xl h-full w-1/2" />
              <Skeleton className="rounded-3xl h-full w-1/2" />
            </div>
            <Skeleton className="h-5 w-32 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileChartsSkeleton;
