import UnitSkeleton from "@/components/UnitSkeleton";
import { Suspense } from "react";
import { GetAssignmentRetry } from "@/lib/apis/exams.api";
import RetryComponent from "./_components/RetryComponent";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

async function Exam({ examId, retryId }: { examId: string; retryId: string }) {
  const Exam = await GetAssignmentRetry({ exam_id: examId, retry_id: retryId });
  const ExamData = Exam && "data" in Exam ? Exam.data : undefined;
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex flex-wrap items-center gap-2 text-neural-800 text-sm md:text-base">
        {/* /238/exams/117 */}
        <Link
          href={`/${ExamData?.section_id}`}
          className="hover:underline flex items-center gap-1"
        >
          {ExamData?.section_name}
          <MdChevronRight className="text-neural-500 shrink-0  lg:text-xl text-lg" />
        </Link>
        <span className="font-bold md:text-lg text-base">
          إمتحان {ExamData?.name}
        </span>
      </div>

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
