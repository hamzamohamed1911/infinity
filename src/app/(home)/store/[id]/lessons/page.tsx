import AllLessons from "@/app/(home)/my-purchases/[id]/lessons/_components/AllLessons";
import PurchasesSkeleton from "@/app/(home)/my-purchases/_Components/PurchasesSkeleton";
import NoDataMessage from "@/components/NoDataMessage";
import { GetLessons } from "@/lib/apis/course.api";
import { Suspense } from "react";

async function LessonsContent({ courseId }: { courseId: string }) {
  const Lessons = await GetLessons({ course_id: courseId });
  const LessonsData = Lessons && "data" in Lessons ? Lessons.data : undefined;

  const availableLessons =
    LessonsData?.filter(
      (lesson) => lesson.booking_status !== 1 && Number(lesson.price) > 0
    ) ?? [];

  return (
    <section>
      {availableLessons?.length > 0 ? (
        <AllLessons UnitsData={availableLessons ?? []} />
      ) : (
        <NoDataMessage text="لا توجد دروس متاحة للشراء حاليًا " />
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
      <LessonsContent courseId={id} />
    </Suspense>
  );
}
