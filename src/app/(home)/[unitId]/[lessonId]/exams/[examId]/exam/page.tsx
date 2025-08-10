import UnitSkeleton from "@/components/UnitSkeleton";
import { Suspense } from "react";
import { GetExam } from "@/lib/apis/exams.api";
import ExamComponent from "../../../_components/ExamComponent";

async function Exam({ examId }: { examId: string }) {
  const Exam = await GetExam({ exam_id: examId });
  const ExamData = Exam && "data" in Exam ? Exam.data : undefined;

  return (
    <section className="flex flex-col gap-4 w-full">
      <p className="text-[#606060]  lg:text-xl md:text-lg text-md font-semibold">
        إمتحان {ExamData?.name}
      </p>

      {ExamData && <ExamComponent examId={examId} examData={ExamData} />}
    </section>
  );
}
export default function Page({
  params,
}: {
  params: { unitId: string; examId: string };
}) {
  return (
    <Suspense fallback={<UnitSkeleton />}>
      <Exam examId={params.examId} />
    </Suspense>
  );
}
