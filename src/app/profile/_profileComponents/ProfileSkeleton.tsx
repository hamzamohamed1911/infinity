// components/profile/ProfileSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <section className="min-h-screen w-full animate-pulse">
      <h1 className="font-bold md:text-4xl text-3xl text-secondary my-4">
        الملف الشخصي
      </h1>
      <div className="w-[80%] mx-auto bg-[#E8E8E8] h-[0.5px] my-8" />

      <div className="flex flex-col gap-6 text-secondary my-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-full flex md:flex-row flex-col gap-4 justify-between">
            <div className="md:w-1/2 flex flex-col gap-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            <div className="md:w-1/2 flex flex-col gap-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      </div>
    </section>
  );
};

export default ProfileSkeleton;
