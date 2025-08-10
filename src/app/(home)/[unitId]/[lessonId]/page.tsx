import { BreadCrumb } from "@/components/BreadCrumb";
import { Card } from "@/components/ui/card";

import { GetUnit, GetLesson } from "@/lib/apis/course.api";
import LessonSkeleton from "@/components/LessonSkeleton";
import { Suspense } from "react";
import { MdEditNote } from "react-icons/md";
import { BiBookContent } from "react-icons/bi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MdOndemandVideo } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Player1 from "./_components/Player1";
import Link from "next/link";
import Player2 from "./_components/Player2";
import Player3 from "./_components/Player3";

async function LessonContent({
  unitId,
  lessonId,
}: {
  unitId: string;
  lessonId: string;
}) {
  const Unit = await GetUnit({ unit_id: unitId });
  const lesson = await GetLesson({ lesson_id: lessonId });

  const UnitData = Unit && "data" in Unit ? Unit.data : undefined;
  const LessonData = Unit && "data" in lesson ? lesson.data : undefined;
  if (!LessonData) {
    return (
      <div className="text-center h-screen flex justify-center items-center text-red-600 text-xl font-bold">
        {lesson?.message ?? "حدث خطأ أثناء تحميل المحاضرة."}
      </div>
    );
  }
  return (
    <section className="flex flex-col gap-4 w-full">
      {LessonData && UnitData && (
        <BreadCrumb
          lessonData={LessonData}
          unitData={UnitData as CourseDetails}
        />
      )}
      <div className="grid md:grid-cols-12 grid-cols-1 lg:gap-8 md:gap-6 gap-4">
        <div className="col-span-12 md:col-span-7 flex flex-col gap-4">
          <Tabs dir="rtl" defaultValue="player1" className="w-full my-8">
            <TabsList
              className="w-full bg-transparent gap-2 justify-start
      flex overflo-x-auto  whitespace-nowrap"
            >
              <TabsTrigger
                value="player1"
                className="data-[state=active]:bg-[#3F7414] data-[state=active]:font-semibold  md:text-md text-sm data-[state=active]:text-white data-[state=active]:border-none border border-[#99E35D] text-[#3F7414] rounded-md py-2 px-4"
              >
                مشغل 1
              </TabsTrigger>
              <TabsTrigger
                value="player2"
                className="data-[state=active]:bg-[#3F7414] data-[state=active]:font-semibold md:text-md text-sm data-[state=active]:text-white data-[state=active]:border-none border border-[#99E35D] text-[#3F7414] rounded-md py-2 px-4"
              >
                مشغل 2
              </TabsTrigger>
              <TabsTrigger
                value="player3"
                className="data-[state=active]:bg-[#3F7414] data-[state=active]:font-semibold  md:text-md text-sm data-[state=active]:text-white data-[state=active]:border-none border border-[#99E35D] text-[#3F7414] rounded-md py-2 px-4"
              >
                مشغل 3
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="player1">
                {" "}
                <div className="w-full h-full relative 2xl:min-h-96  min-h-72">
                  <Player1 encrypted={LessonData.encrypted_video_link} />
                </div>
              </TabsContent>
              <TabsContent value="player2">
                <Player2 encrypted={LessonData.encrypted_video_link} />
              </TabsContent>
              <TabsContent value="player3">
                <Player3 googleDriveId={LessonData.google_drive_id} />
              </TabsContent>
            </div>
          </Tabs>

          <Card className="w-full lg:p-8 md:p-6 p-4 flex flex-col lg:gap-6 gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-[#8E8E8E] text-lg font-semibold">
                تفاصيل الدورة
              </h2>

              <p className="text-[#606060] lg:text-xl md:text-lg text-md">
                {LessonData?.description || "لا توجد بيانات"}
              </p>
            </div>
            <div className="flex flex-col lg:gap-8 md:gap-6 gap-4">
              {/* عدد المشاهدات */}
              <div className="text-[#606060] whitespace-nowrap lg:text-xl md:text-lg text-md flex gap-2 items-center">
                عدد المشاهدات المتبقية:
                <span className="text-primary font-bold">
                  {LessonData?.remaining_views}
                </span>
              </div>
              {LessonData?.enable_assessments && (
                <>
                  {/* امتحان المحاضرة */}
                  <div className="text-[#8E8E8E] whitespace-nowrap lg:text-xl md:text-lg text-md flex flex-wrap gap-4 items-center">
                    إمتحانات المحاضرة:
                    <div className="text-[#3187FF] underline flex gap-2 flex-wrap items-center cursor-pointer">
                      <MdEditNote className="shrik-0" size={24} />
                      <span>{LessonData?.sub_exams.length} إمتحانات</span>
                    </div>
                    <ol className="list-decimal ps-5 flex flex-col gap-2 w-full">
                      {LessonData?.sub_exams.map((exam) => (
                        <li key={exam.id}>
                          <Link
                            href={`/${unitId}/${LessonData.id}/exams/${exam.id}`}
                            className="text-secondary-900 underline text-lg hover:text-secondary-800 transition-colors"
                          >
                            {exam.name}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                  {/* واجب المحاضرة */}
                  <div className="text-[#8E8E8E] lg:text-xl md:text-lg text-md flex flex-wrap gap-4 items-center">
                    واجب المحاضرة:
                    <div className="text-[#3187FF] underline flex gap-2 items-center cursor-pointer">
                      <BiBookContent size={24} />
                      <span>{LessonData?.sub_homeworks.length} واجبات</span>
                    </div>
                    <ol className="list-decimal ps-5 flex flex-col gap-2 w-full">
                      {LessonData?.sub_homeworks.map((homework) => (
                        <li key={homework.id}>
                          <Link
                            href={`/${unitId}/${LessonData.id}/home-work/${homework.id}`}
                            className="text-secondary-900 underline text-lg hover:text-secondary-800 transition-colors"
                          >
                            {homework.name}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-between md:gap-4 gap-2 w-full">
              <Button
                variant="ghost"
                className="group flex items-center justify-center font-semibold shadow-md lg:text-lg md:text-md text-xs lg:gap-2 gap-1 text-secondary-900  hover:bg-secondary-900 hover:text-white w-full lg:h-14 h-12 rounded-lg transition-all duration-300"
              >
                <FaArrowRight className="transform transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                المحاضرة السابقة
              </Button>
              <Button
                variant="ghost"
                className="group flex items-center justify-center font-semibold shadow-md lg:text-lg md:text-md text-xs lg:gap-2 gap-1 text-secondary-900  hover:bg-secondary-900 hover:text-white w-full lg:h-14 h-12 rounded-lg transition-all duration-300"
              >
                المحاضرة التالية
                <FaArrowLeft className="transform transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110" />
              </Button>
            </div>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-5">
          {LessonData?.sub_lessons.length > 0 ? (
            <Card className="w-full p-4">
              <Accordion type="single" collapsible className="w-full">
                <div className="space-y-3 ">
                  {LessonData?.sub_lessons.map((lesson: SubLesson) => (
                    <AccordionItem key={lesson.id} value={lesson.id.toString()}>
                      <AccordionTrigger className="md:text-xl text-lg border px-4 py-4 rounded-lg hover:border-primary hover:text-primary group transition-all">
                        {lesson.name}
                      </AccordionTrigger>
                      <AccordionContent className="border border-b-0 pb-0 text-primary md:text-xl text-lg">
                        <Link
                          href={`/${unitId}/${lesson.id}`}
                          className="border-[1px] border-primary p-4 flex justify-between gap-2"
                        >
                          <div className="flex gap-2">
                            <MdOndemandVideo size={24} />{" "}
                            <span> الدرس {lesson.name} </span>
                          </div>
                          <Checkbox checked={lesson.is_viewed} />
                        </Link>
                        <div className="border-[1px] border-primary p-4 flex justify-between gap-2">
                          <div className="flex gap-2">
                            <BiBookContent size={24} />{" "}
                            <span> واجب الدرس {lesson.name} </span>
                          </div>
                          <Checkbox />
                        </div>
                        <div className="border-[1px] border-primary p-4 flex justify-between gap-2">
                          <div className="flex gap-2">
                            <MdEditNote size={24} />{" "}
                            <span> امتحان الدرس {lesson.name} </span>
                          </div>
                          <Checkbox />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </div>
              </Accordion>
            </Card>
          ) : (
            <div className="h-[30vh] flex justify-center items-center">
              {" "}
              <p className="text-xl text-[#8E8E8E]">
                عذرا لا توجد دروس متاحه حاليا
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default function Page({
  params,
}: {
  params: { unitId: string; lessonId: string };
}) {
  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LessonContent lessonId={params.lessonId} unitId={params.unitId} />
    </Suspense>
  );
}
