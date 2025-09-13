import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const AssignmentSkeleton = () => {
  return (
    <section className="flex flex-col gap-4 w-full p-4">
      {/* BreadCrumb */}
      <Skeleton className="h-6 w-1/3 animate-pulse" />

      {/* Card Exam Details */}
      <Card className="m-0">
        <CardContent className="w-full flex flex-col lg:gap-6 gap-4 m-0">
          {/* تفاصيل الامتحان */}
          <div className="mt-6 space-y-4">
            <Skeleton className="h-6 w-1/4 animate-pulse" />
            <div className="bg-white p-4 rounded-xl shadow-sm grid sm:grid-cols-2 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className={`h-4 ${
                    i % 2 === 0 ? "w-3/4" : "w-1/2"
                  } animate-pulse`}
                />
              ))}
            </div>
          </div>

          {/* محاولاتك السابقة */}
          <div className="flex flex-col lg:gap-6 gap-4 mt-6">
            <Skeleton className="h-6 w-1/5 animate-pulse" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-10 lg:gap-8 md:gap-6 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-14 w-full rounded-md shadow-sm animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* محاولاتك المتبقية */}
          <div className="flex gap-2 items-center">
            <Skeleton className="h-6 w-32 animate-pulse" />
            <Skeleton className="h-6 w-8 animate-pulse" />
          </div>

          {/* زر الامتحان */}
          <div className="flex justify-center items-center mt-8">
            <Skeleton className="h-12 w-52 rounded-md animate-pulse" />
          </div>
        </CardContent>
      </Card>

      {/* Deadlines */}
      <div className="p-4">
        <Skeleton className="h-6 w-1/5 mb-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="border rounded-xl overflow-hidden shadow-sm bg-white"
            >
              <Skeleton className="w-full h-48 animate-pulse" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-2/3 animate-pulse" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-full animate-pulse" />
                  <Skeleton className="h-3 w-5/6 animate-pulse" />
                </div>
                <div className="flex justify-between mt-2">
                  <Skeleton className="h-3 w-16 animate-pulse" />
                  <Skeleton className="h-3 w-16 animate-pulse" />
                </div>
                <Skeleton className="h-10 w-full mt-4 rounded-md animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssignmentSkeleton;
