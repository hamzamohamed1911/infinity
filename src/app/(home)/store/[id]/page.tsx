import { Suspense } from "react";
import { GetCoursesbundles } from "@/lib/apis/course.api";
import PurchasesSkeleton from "../../my-purchases/_Components/PurchasesSkeleton";
import AllCourses from "../../my-purchases/[id]/courses/_components/AllCourses";

async function UnitsContent({ courseId }: { courseId: string }) {
  // 📦 جلب البيانات
  const courses = await GetCoursesbundles({ course_id: courseId });
  const ClassesData = courses && "data" in courses ? courses.data : [];

  const availableCourses = ClassesData?.filter(
    (course: CourseType) =>
      course.is_purchased_before === false && Number(course.price) > 0
  );

  return (
    <section className="mt-6">
      <AllCourses CoursesData={availableCourses || []} />
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
