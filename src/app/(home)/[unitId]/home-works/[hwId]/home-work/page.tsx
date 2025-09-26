import UnitSkeleton from "@/components/UnitSkeleton";
import { Suspense } from "react";
import { GetExam } from "@/lib/apis/exams.api";
import HomeWorkComponent from "../../../[lessonId]/_components/HomeWorkComponent";

async function Exam({ hwId }: { hwId: string }) {
  const Exam = await GetExam({ exam_id: hwId });
  const ExamData = Exam && "data" in Exam ? Exam.data : undefined;

  return (
    <section className="flex flex-col gap-4 w-full">
      <p className="text-[#606060]  lg:text-xl md:text-lg text-md font-semibold p-4">
        واجب {ExamData?.name}
      </p>

      {ExamData && <HomeWorkComponent examId={hwId} examData={ExamData} />}
    </section>
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ unitId: string; hwId: string }>;
}) {
  const { hwId } = await params;

  return (
    <Suspense fallback={<UnitSkeleton />}>
      <Exam hwId={hwId} />
    </Suspense>
  );
}
