import { BreadCrumb } from "@/components/BreadCrumb";
import { Suspense } from "react";
import { GetExam } from "@/lib/apis/exams.api";
import { GetUnit } from "@/lib/apis/course.api";
import { Card, CardContent } from "@/components/ui/card";
import ExamButton from "../../[lessonId]/_components/ExamButton";
import Deadlines from "../../[lessonId]/_components/Deadlines";
import AssignmentSkeleton from "@/components/AssignmentSkeleton";

async function UnitContent({ hwId, unitId }: { unitId: string; hwId: string }) {
  const Exam = await GetExam({ exam_id: hwId });
  const ExamData = Exam && "data" in Exam ? Exam.data : undefined;

  const Unit = await GetUnit({ unit_id: unitId });
  const UnitData = Unit && "data" in Unit ? Unit.data : undefined;

  function formatDateTime(dateTimeString: string) {
    const dateObj = new Date(dateTimeString);
    const date = dateObj.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const time = dateObj.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { date, time };
  }

  return (
    <section className="flex flex-col gap-4 w-full p-4">
      {ExamData && UnitData && (
        <BreadCrumb
          examType="homework"
          unitData={UnitData}
          ExamData={ExamData}
        />
      )}
      <Card className="m-0 ">
        {/* عرض معلومات الواجب */}
        <CardContent className="w-full  flex flex-col lg:gap-6 gap-4 m-0">
          {ExamData && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <p className="text-[#606060]  lg:text-xl md:text-lg text-md ">
                  تفاصيل الواجب
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm grid sm:grid-cols-2 gap-4 text-gray-700">
                <div>
                  <span className="font-semibold">تاريخ البداية: </span>
                  {formatDateTime(ExamData.start_date).date}
                </div>
                <div>
                  <span className="font-semibold">تاريخ النهاية: </span>
                  {formatDateTime(ExamData.end_date).date}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:gap-6 gap-4 mt-6">
            <p className="text-[#606060]  lg:text-xl md:text-lg text-md ">
              محاولاتك السابقة
            </p>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-10 lg:gap-8 md:gap-6 gap-4">
              {ExamData?.user_exams_retries.map((exam) => {
                const examDate = new Date(exam.ended_at);
                const dateString = examDate.toLocaleDateString("ar-EG", {
                  weekday: "long",
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                });

                return (
                  <div
                    key={exam.id}
                    className="border border-gray-200 rounded-md p-4 flex gap-4 justify-center items-center bg-white shadow-sm font-semibold"
                  >
                    <div className="flex items-center gap-2 flex-wrap text-gray-700">
                      <span className="text-[#A4A4A4] font-semibold text-md">
                        تاريخ
                      </span>
                      <span className="text-secondary-900 text-sm">
                        {dateString.split(" ")[0]}
                      </span>
                      <span className="text-secondary-900 text-sm">
                        {dateString.split(" ")[1]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#A4A4A4] text-md">الدرجة</span>
                      <span className="text-secondary-900 text-sm">
                        {exam.final_grade}/{ExamData.questions_count}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="whitespace-nowrap lg:text-xl md:text-lg text-md flex gap-2 items-center">
            <p className="text-[#606060]  ">محاولاتك المتبقية :</p>
            <span className="text-primary font-bold">{ExamData?.retries}</span>
          </div>

          {ExamData && (
            <ExamButton
              unitId={unitId}
              examId={hwId}
              ExamData={ExamData}
              examType="homework"
            />
          )}
        </CardContent>
      </Card>
      <Deadlines examType={2} unitId={unitId} examId={hwId} />
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ unitId: string; hwId: string }>;
}) {
  const { unitId, hwId } = await params;

  return (
    <Suspense fallback={<AssignmentSkeleton />}>
      <UnitContent hwId={hwId} unitId={unitId} />
    </Suspense>
  );
}
