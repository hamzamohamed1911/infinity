/* eslint-disable @typescript-eslint/no-unused-vars */
import { BreadCrumb } from "@/components/BreadCrumb";
import UnitSkeleton from "@/components/UnitSkeleton";
import { Suspense } from "react";
import { GetExam } from "@/lib/apis/exams.api";
import { GetUnit } from "@/lib/apis/course.api";
import { Card } from "@/components/ui/card";

async function UnitContent({
  examId,
  unitId,
}: {
  unitId: string;
  examId: string;
}) {
  const Exam = await GetExam({ exam_id: examId });
  const ExamData = Exam && "data" in Exam ? Exam.data : undefined;
  const Unit = await GetUnit({ unit_id: unitId });
  const UnitData = Unit && "data" in Unit ? Unit.data : undefined;
  console.log(ExamData);
  return (
    <section className="flex flex-col gap-4 w-full">
      {ExamData && UnitData && (
        <BreadCrumb unitData={UnitData} ExamData={ExamData} />
      )}
      <Card className="w-full lg:p-8 md:p-6 p-4 flex flex-col lg:gap-6 gap-4">
        <div className="flex flex-col lg:gap-6 gap-4">
          <p className="text-[#606060]  lg:text-xl md:text-lg text-md ">
            محاولاتك المتبقية
          </p>
          <div className="grid lg:grid-cols-7 md:grid-cols-2 grid-cols-1 gap-4 justify-between">
          {ExamData?.user_exams_retries.map((exam) => (
            <div key={exam.id} className="border-[1px] rounded-md p-2 col-span-2">
              {exam?.final_grade} الدرجة {exam?.ended_at} تاريخ
            </div>
          ))}
          </div>
        </div>
        <div className="text-[#606060] whitespace-nowrap lg:text-xl md:text-lg text-md flex gap-2 items-center">
          <p>محاولاتك المتبقية :</p>
          <span className="text-primary font-bold">{ExamData?.retries}</span>
        </div>
      </Card>
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
      <UnitContent examId={params.examId} unitId={params.unitId} />
    </Suspense>
  );
}
