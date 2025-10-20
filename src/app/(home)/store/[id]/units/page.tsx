import AllUnits from "@/app/(home)/my-purchases/[id]/units/_components/AllUnits";
import PurchasesSkeleton from "@/app/(home)/my-purchases/_Components/PurchasesSkeleton";
import NoDataMessage from "@/components/NoDataMessage";
import { GetUnits } from "@/lib/apis/course.api";
import { Suspense } from "react";

async function UnitsContent({ courseId }: { courseId: string }) {
  const Units = await GetUnits({ course_id: courseId });
  const UnitsData: CourseDetails[] =
    (Units && "data" in Units ? Units.data : []) ?? [];

  const availableUnits = UnitsData.filter(
    (unit) => unit.booking_status !== 1 && Number(unit.price) > 0
  );
  return (
    <section>
      {availableUnits.length > 0 ? (
        <AllUnits UnitsData={availableUnits} />
      ) : (
        <NoDataMessage text="لا توجد وحدات متاحة للشراء حاليًا" />
      )}
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<PurchasesSkeleton />}>
      <UnitsContent courseId={id} />
    </Suspense>
  );
}
