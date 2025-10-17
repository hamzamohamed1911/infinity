import UnitSkeleton from "@/components/UnitSkeleton";
import { Suspense } from "react";
import { GetAssignmentRetry } from "@/lib/apis/exams.api";
import RetryComponent from "./_components/RetryComponent";

async function Exam({ examId, retryId }: { examId: string; retryId: string }) {
  const Exam = await GetAssignmentRetry({ exam_id: examId, retry_id: retryId });
  const ExamData = Exam && "data" in Exam ? Exam.data : undefined;
  return (
    <section className="flex flex-col gap-4 w-full">
      <p className="text-neural-800 lg:text-xl md:text-lg text-md font-semibold py-2 px-4">
        إمتحان {ExamData?.name}
      </p>

      {ExamData && <RetryComponent examData={ExamData} />}
    </section>
  );
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ examId: string }>;
  searchParams: Promise<{ exam?: string }>;
}) {
  const { examId } = await params;
  const { exam } = await searchParams;

  const retryId = exam as string;

  return (
    <Suspense fallback={<UnitSkeleton />}>
      <Exam examId={examId} retryId={retryId} />
    </Suspense>
  );
}
