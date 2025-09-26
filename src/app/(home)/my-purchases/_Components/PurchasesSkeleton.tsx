import { Skeleton } from "@/components/ui/skeleton";

const PurchasesSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="animate-pulse bg-gray-200 h-80 rounded-2xl"
          />
        ))}
      </div>
    </div>
  );
};

export default PurchasesSkeleton;
