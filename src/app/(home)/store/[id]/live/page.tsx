import { GetLive } from "@/lib/apis/course.api";
import { Suspense } from "react";
import NoDataMessage from "@/components/NoDataMessage";
import PurchasesSkeleton from "@/app/(home)/my-purchases/_Components/PurchasesSkeleton";
import AllLive from "@/app/(home)/my-purchases/[id]/live/_components/AllLive";

async function UnitsContent({ classId }: { classId: string }) {
  const live = await GetLive({ class_id: classId });
  const liveData: LiveItem[] = Array.isArray(live?.data) ? live.data : [];
  const availableLives = liveData.filter(
    (item) =>
      Number(item.price) > 0 &&
      !item.is_purchased_before &&
      item.booking_status === 0
  );

  console.log("liveData", availableLives);
  return (
    <section>
      <div className="mt-6">
        {availableLives.length === 0 ? (
          <NoDataMessage text="لا توجد دروس اونلاين متاحة حالياً" />
        ) : (
          <AllLive liveData={availableLives} />
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
