import UnitSkeleton from "@/components/UnitSkeleton";
import { Suspense } from "react";
import { GetAssignmentRetry } from "@/lib/apis/exams.api";
import RetryComponent from "../../../exams/[examId]/retry/_components/RetryComponent";
import { MdChevronRight } from "react-icons/md";
import Link from "next/link";

async function Exam({ hwId, retryId }: { hwId: string; retryId: string }) {
  const Exam = await GetAssignmentRetry({ exam_id: hwId, retry_id: retryId });
  const ExamData = Exam && "data" in Exam ? Exam.data : undefined;
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex flex-wrap items-center gap-2 text-neural-800 text-sm md:text-base">
        {/* /238/exams/117 */}
        <Link className="hover:underline flex items-center gap-1" href="/">
          الصفحه الرئيسيه
          <MdChevronRight className="text-neural-500 shrink-0  lg:text-xl text-lg" />
        </Link>
        <Link
          href={`/${ExamData?.section_id}`}
          className="hover:underline flex items-center gap-1"
        >
          {ExamData?.section_name}
          <MdChevronRight className="text-neural-500 shrink-0  lg:text-xl text-lg" />
        </Link>
        <span className="font-bold md:text-lg text-base">
          واجب {ExamData?.name}
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
  params: Promise<{ hwId: string }>;
  searchParams: Promise<{ homework?: string }>;
}) {
  const { hwId } = await params;
  const { homework } = await searchParams;

  const retryId = homework as string;

  return (
    <Suspense fallback={<UnitSkeleton />}>
      <Exam hwId={hwId} retryId={retryId} />
    </Suspense>
  );
}
