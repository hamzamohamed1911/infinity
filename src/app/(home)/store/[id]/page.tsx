import { Suspense } from "react";
import { GetCoursesbundles } from "@/lib/apis/course.api";
import PurchasesSkeleton from "../../my-purchases/_Components/PurchasesSkeleton";
import AllCourses from "../../my-purchases/[id]/courses/_components/AllCourses";
import NoDataMessage from "@/components/NoDataMessage";

async function UnitsContent({ courseId }: { courseId: string }) {
  // 📦 جلب البيانات
  const courses = await GetCoursesbundles({ course_id: courseId });
  const ClassesData = courses && "data" in courses ? courses.data : [];
  console.log("ClassesData", ClassesData);
  const availableCourses =
    ClassesData?.filter(
      (course: CourseType) =>
        course.is_purchased_before === false && Number(course.price) > 0
    ) || [];

  return (
    <section>
      {availableCourses?.length > 0 ? (
        <AllCourses CoursesData={availableCourses || []} />
      ) : (
        <NoDataMessage text="لا توجد  كورسات متاحه للشراء حاليًا" />
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
