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

export default function page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<UnitSkeleton />}>
      <UnitsContent classId={params.id} />
    </Suspense>
  );
}
