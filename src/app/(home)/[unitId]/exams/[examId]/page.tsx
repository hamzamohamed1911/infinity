import { BreadCrumb } from "@/components/BreadCrumb";
import { Suspense } from "react";
import { GetExam } from "@/lib/apis/exams.api";
import { GetUnit } from "@/lib/apis/course.api";
import { Card, CardContent } from "@/components/ui/card";
import Deadlines from "../../[lessonId]/_components/Deadlines";
import ExamButton from "../../[lessonId]/_components/ExamButton";
import AssignmentSkeleton from "@/components/AssignmentSkeleton";
import Link from "next/link";

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
  // دالة لتنسيق التاريخ والوقت

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
        <BreadCrumb unitData={UnitData} ExamData={ExamData} />
      )}
      <Card className="m-0 ">
        <CardContent className="w-full  flex flex-col lg:gap-6 gap-4 m-0">
          {/* عرض معلومات الامتحان */}
          {ExamData && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <p className="text-neural-800  lg:text-xl md:text-lg text-md ">
                  تفاصيل الامتحان
                </p>
              </div>
              {ExamData.show_dates_and_times && (
                <div className="bg-white p-4 rounded-xl shadow-sm grid sm:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <span className="font-semibold">تاريخ البداية: </span>
                    {formatDateTime(ExamData.start_date).date}
                  </div>
                  <div>
                    <span className="font-semibold">تاريخ النهاية: </span>
                    {formatDateTime(ExamData.end_date).date}
                  </div>
                  <div>
                    <span className="font-semibold">وقت البداية: </span>
                    {formatDateTime(ExamData.start_date).time}
                  </div>
                  <div>
                    <span className="font-semibold">وقت النهاية: </span>
                    {formatDateTime(ExamData.end_date).time}
                  </div>
                  <div className="sm:col-span-2">
                    <span className="font-semibold">زمن الامتحان: </span>
                    {ExamData.period} دقيقة
                  </div>
                </div>
              )}
            </div>
          )}
          {(ExamData?.user_exams_retries?.length ?? 0) > 0 && (
            <div className="flex flex-col lg:gap-6 gap-4 mt-6">
              <p className="text-neural-800  lg:text-xl md:text-lg text-md ">
                محاولاتك السابقة
              </p>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-10 lg:gap-8 md:gap-6 gap-4">
                {ExamData?.user_exams_retries.map((exam, index) => {
                  const start = formatDateTime(exam.started_at);
                  const end = formatDateTime(exam.ended_at);

                  return (
                    <div
                      key={exam.id}
                      className="border border-gray-200 rounded-md p-4 flex flex-col gap-4 bg-white shadow-sm font-semibold w-full"
                    >
                      {/* عنوان المحاولة + الدرجة */}
                      <div className="w-full flex justify-between items-center border-b pb-2">
                        <p className="text-md text-gray-700 font-semibold">
                          المحاولة {index + 1}
                        </p>
                        <span className="text-secondary-900 text-sm">
                          {exam.final_grade}/{ExamData.questions_count}
                        </span>
                      </div>

                      {/* وقت البداية */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[#A4A4A4] font-semibold text-md">
                          وقت البداية
                        </span>
                        <span className="text-secondary-900 text-sm">
                          {start.date} – {start.time}
                        </span>
                      </div>

                      {/* وقت النهاية */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[#A4A4A4] font-semibold text-md">
                          وقت النهاية
                        </span>
                        <span className="text-secondary-900 text-sm">
                          {end.date} – {end.time}
                        </span>
                      </div>

                      {/* الحالة */}
                      {exam.message && (
                        <div className="flex flex-col gap-1">
                          <span className="text-[#A4A4A4] font-semibold text-md">
                            الحالة
                          </span>
                          <span className="text-secondary-900 text-sm">
                            {exam.message}
                          </span>
                        </div>
                      )}

                      {/* الزرار */}
                      <div className="mt-2 w-full flex justify-end">
                        <Link
                          href={`${examId}/retry?exam=${exam.id}`}
                          type="button"
                          className="px-4 py-2 rounded-md bg-primary-500 text-white text-sm hover:bg-primary-600 transition"
                        >
                          اظهار الإجابات
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="whitespace-nowrap lg:text-xl md:text-lg text-md flex gap-2 items-center">
            <p className="text-neural-800  ">محاولاتك المتبقية :</p>
            <span className="text-primary font-bold">{ExamData?.retries}</span>
          </div>

          {ExamData && (
            <ExamButton unitId={unitId} examId={examId} ExamData={ExamData} />
          )}
        </CardContent>
      </Card>

      <Deadlines examType={1} unitId={unitId} examId={examId} />
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ unitId: string; examId: string }>;
}) {
  const { unitId, examId } = await params; // لازم await هنا

  return (
    <Suspense fallback={<AssignmentSkeleton />}>
      <UnitContent examId={examId} unitId={unitId} />
    </Suspense>
  );
}
