import UnitSkeleton from "@/components/UnitSkeleton";
import { Suspense } from "react";
import { GetExam } from "@/lib/apis/exams.api";
import ExamComponent from "../../../[lessonId]/_components/ExamComponent";

async function Exam({ examId }: { examId: string }) {
  const Exam = await GetExam({ exam_id: examId });
  const ExamData = Exam && "data" in Exam ? Exam.data : undefined;
  return (
    <section className="flex flex-col gap-4 w-full">
      <p className="text-neural-800  lg:text-xl md:text-lg text-md font-semibold py-2 px-4">
        إمتحان {ExamData?.name}
      </p>

      {ExamData && <ExamComponent examId={examId} examData={ExamData} />}
    </section>
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;

  return (
    <Suspense fallback={<UnitSkeleton />}>
      <Exam examId={examId} />
    </Suspense>
  );
}
