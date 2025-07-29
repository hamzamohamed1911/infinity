// app/(routes)/units/[unitId]/unit-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const UnitSkeleton = () => {
  return (
    <section className="flex flex-col gap-4 w-full">
      <Skeleton className="h-6 w-1/4" /> 

      <div className="grid md:grid-cols-12 grid-cols-1 gap-8 2xl:min-h-72 min-h-60 w-full">
        {/* Text Section */}
        <div className="flex flex-col gap-6 col-span-5">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-1/3" />
            <div className="flex gap-4 justify-around">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full h-full col-span-7">
          <Skeleton className="h-full w-full min-h-72 rounded-lg" />
        </div>
      </div>

      {/* Lessons List */}
      <Card className="w-full p-4 space-y-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-lg" />
        ))}
      </Card>
    </section>
  );
};

export default UnitSkeleton;
