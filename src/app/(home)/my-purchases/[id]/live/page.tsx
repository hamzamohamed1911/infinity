import { GetLive } from "@/lib/apis/course.api";
import { Suspense } from "react";
import UnitSkeleton from "@/components/UnitSkeleton";
import AllLive from "./_components/AllLive";

async function UnitsContent({ classId }: { classId: string }) {
  const live = await GetLive({ class_id: classId });
  const liveData: LiveItem[] = Array.isArray(live?.data) ? live.data : [];

  return (
    <section>
      <div className="mt-6">
        <AllLive liveData={liveData ?? []} />
      </div>
    </section>
  );
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params; // لازم await هنا
  return (
    <Suspense fallback={<UnitSkeleton />}>
      <UnitsContent classId={id} />
    </Suspense>
  );
}
