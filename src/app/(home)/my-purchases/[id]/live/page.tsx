import { GetLive } from "@/lib/apis/course.api";
import { Suspense } from "react";
import AllLive from "./_components/AllLive";
import PurchasesSkeleton from "../../_Components/PurchasesSkeleton";
import NoDataMessage from "@/components/NoDataMessage";

async function UnitsContent({ classId }: { classId: string }) {
  const live = await GetLive({ class_id: classId });
  const liveData: LiveItem[] = Array.isArray(live?.data) ? live.data : [];
  return (
    <section>
      <div className="mt-6">
        {liveData.length === 0 ? (
          <NoDataMessage text="لا توجد دروس اونلاين متاحة حالياً" />
        ) : (
          <AllLive liveData={liveData} />
        )}
      </div>
    </section>
  );
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <Suspense fallback={<PurchasesSkeleton />}>
      <UnitsContent classId={id} />
    </Suspense>
  );
}
