import { Suspense } from "react";
import { GetExams } from "@/lib/apis/exams.api";
import PurchasesSkeleton from "@/app/(home)/my-purchases/_Components/PurchasesSkeleton";
import ExamsComponent from "@/app/(home)/my-purchases/_Components/ExamsComponent";
import NoDataMessage from "@/components/NoDataMessage";

async function ExamContent({ courseId }: { courseId: string }) {
  const exams = await GetExams({ course_id: courseId, assessment_type: 1 });

  const ExamsData = exams && "data" in exams ? exams.data : [];

  const availableExams =
    ExamsData?.filter(
      (exam) => exam.available_exam === 1 && Number(exam.price) > 0
    ) ?? [];

  return (
    <section>
      <div className="mt-6">
        {availableExams.length > 0 ? (
          <ExamsComponent type="exam" ExamsData={availableExams ?? []} />
        ) : (
          <NoDataMessage text="لا توجد اختبارات متاحة للشراء حاليًا " />
        )}
      </div>
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
      <ExamContent courseId={id} />
    </Suspense>
  );
}
