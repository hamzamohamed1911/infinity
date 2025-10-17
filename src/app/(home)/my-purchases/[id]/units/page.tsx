import AllUnits from "./_components/AllUnits";
import { GetUnits } from "@/lib/apis/course.api";
import { Suspense } from "react";
import PurchasesSkeleton from "../../_Components/PurchasesSkeleton";

async function UnitsContent({ courseId }: { courseId: string }) {
  const Units = await GetUnits({ course_id: courseId });
  const UnitsData = Units && "data" in Units ? Units.data : undefined;

  return (
    <section>
      <div className="mt-6">
        <AllUnits UnitsData={UnitsData ?? []} />
      </div>
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // فك الـPromise بتاع params
  const { id } = await params;

  return (
    <Suspense fallback={<PurchasesSkeleton />}>
      <UnitsContent courseId={id} />
    </Suspense>
  );
}
