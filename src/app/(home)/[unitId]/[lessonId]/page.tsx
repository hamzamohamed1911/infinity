import { BreadCrumb } from "@/components/BreadCrumb";
import { Card } from "@/components/ui/card";
import { TiAttachmentOutline } from "react-icons/ti";

import { GetUnit, GetLesson } from "@/lib/apis/course.api";
import LessonSkeleton from "@/components/LessonSkeleton";
import { Suspense } from "react";
import { MdEditNote } from "react-icons/md";
import { BiBookContent } from "react-icons/bi";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MdOndemandVideo } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Player1 from "./_components/Player1";
import Link from "next/link";
import Player2 from "./_components/Player2";
import Player3 from "./_components/Player3";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PaymentDialog from "../payments/_components/PaymentDialog";
import Image from "next/image";
import { alertSvg } from "../../../../../public";
import { Metadata } from "next";
import YoutubePlayer from "./_components/YoutubePlayer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}): Promise<Metadata> {
  const { lessonId } = await params;

  const lesson = await GetLesson({ lesson_id: lessonId });
  const LessonData = lesson?.data;

  return {
    title: LessonData?.name || "تفاصيل الدورة",
    description: LessonData?.description || "محتوى الدورة التدريبية",
    icons: {
      icon: LessonData?.thumbnail,
    },
  };
}

async function LessonContent({
  unitId,
  lessonId,
}: {
  unitId: string;
  lessonId: string;
}) {
  const validUnitId =
    unitId && unitId !== "undefined" && unitId !== "null" ? unitId : null;

  const Unit = validUnitId
    ? await GetUnit({ unit_id: validUnitId })
    : undefined;
  const lesson = await GetLesson({ lesson_id: lessonId });

  const UnitData = Unit?.data;
  const LessonData = lesson?.data;
  console.log("LessonData", LessonData);

  if (!LessonData) {
    const preRequisites = lesson?.preRequisites || [];
    if (preRequisites.length > 0) {
      return (
        <div className="text-center h-screen max-w-xl mx-auto flex flex-col gap-4 justify-center items-center">
          <div className="w-24 sm:w-28 md:w-36 lg:w-40">
            <Image
              src={alertSvg}
              alt="alert icons"
              width={150}
              height={150}
              className="h-auto w-full"
            />
          </div>

          <p className="text-center !leading-10 text-red-600 lg:text-2xl md:text-xl text-lg font-bold">
            {lesson?.message}
          </p>
          <div className="flex flex-col gap-4 max-h-[80vh] overflow-auto">
            {preRequisites.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Button className="text-white w-full bg-primary-500  hover:bg-primary-400 lg:h-12 h-10 shadow-md hover:shadow-lg text-xl transition-all duration-500">
                    اشترى الآن {item.name}
                  </Button>
                </DialogTrigger>
                <PaymentDialog
                  name={item.name}
                  model_type={item.type}
                  model_id={item.id}
                />
              </Dialog>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="text-center h-screen max-w-xl mx-auto flex flex-col gap-4 justify-center items-center">
        <Image src={alertSvg} width={150} height={150} alt="alert icons" />
        <p className="text-center !leading-10 text-red-600 lg:text-2xl md:text-xl text-lg font-bold">
          {lesson?.message}
        </p>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4 w-full md:p-4 p-0">
      {LessonData && UnitData && (
        <div className="p-4">
          <BreadCrumb
            lessonData={LessonData}
            unitData={UnitData as CourseDetails}
          />
        </div>
      )}
      <div className="grid md:grid-cols-12 grid-cols-1 lg:gap-8 md:gap-6 gap-4">
        <div className="col-span-12 md:col-span-7 flex flex-col gap-4">
          <Tabs
            dir="rtl"
            defaultValue="player"
            className="w-full lg:my-8 md:my-6 my-4"
          >
            <TabsList
              className="w-full bg-transparent gap-2 justify-start
      flex overflo-x-auto  whitespace-nowrap"
            >
              <TabsTrigger
                value="player"
                className="data-[state=active]:bg-[#3F7414] data-[state=active]:font-semibold  md:text-md text-sm data-[state=active]:text-white data-[state=active]:border-none border border-[#99E35D] text-[#3F7414] rounded-md py-2 px-4"
              >
                مشغل 1
              </TabsTrigger>
              {LessonData.vimeo_id && (
                <TabsTrigger
                  value="vimeo"
                  className="data-[state=active]:bg-[#3F7414] data-[state=active]:font-semibold md:text-md text-sm data-[state=active]:text-white data-[state=active]:border-none border border-[#99E35D] text-[#3F7414] rounded-md py-2 px-4"
                >
                  مشغل 2
                </TabsTrigger>
              )}

              {LessonData.google_drive_id && (
                <TabsTrigger
                  value="google-drive"
                  className="data-[state=active]:bg-[#3F7414] data-[state=active]:font-semibold  md:text-md text-sm data-[state=active]:text-white data-[state=active]:border-none border border-[#99E35D] text-[#3F7414] rounded-md py-2 px-4"
                >
                  مشغل 3
                </TabsTrigger>
              )}
              {LessonData.encrypted_video_link && (
                <TabsTrigger
                  value="youtube"
                  className="data-[state=active]:bg-[#3F7414] data-[state=active]:font-semibold  md:text-md text-sm data-[state=active]:text-white data-[state=active]:border-none border border-[#99E35D] text-[#3F7414] rounded-md py-2 px-4"
                >
                  مشغل 4
                </TabsTrigger>
              )}
            </TabsList>

            <div className="mt-6">
              <TabsContent value="player">
                <div className="w-full h-full relative 2xl:min-h-96  min-h-72">
                  <Player1 encrypted={LessonData.encrypted_video_link} />
                </div>
              </TabsContent>
              <TabsContent value="vimeo">
                <Player2 encrypted={LessonData.encrypted_video_link} />
              </TabsContent>
              <TabsContent value="google-drive">
                <Player3 googleDriveId={LessonData.google_drive_id} />
              </TabsContent>
              <TabsContent value="youtube">
                <YoutubePlayer encrypted={LessonData.encrypted_video_link} />
              </TabsContent>
            </div>
          </Tabs>

          <Card className="w-full lg:p-8 md:p-6 p-0 md:flex flex-col lg:gap-6 gap-4  hidden">
            <div className="flex flex-col gap-4">
              <h2 className="text-neural-900 text-lg font-semibold">
                تفاصيل الدورة
              </h2>

              <p className="text-neural-800 lg:text-xl md:text-lg text-md">
                {LessonData?.description || "لا توجد بيانات"}
              </p>
            </div>
            <div className="flex flex-col lg:gap-8 md:gap-6 gap-4">
              {/* عدد المشاهدات */}
              <div className="text-neural-800 whitespace-nowrap lg:text-xl md:text-lg text-md flex gap-2 items-center">
                عدد المشاهدات المتبقية:
                <span className="text-primary font-bold">
                  {LessonData?.remaining_views}
                </span>
              </div>
              {LessonData?.enable_assessments ? (
                <>
                  {/* امتحان المحاضرة */}
                  <div className="text-neural-900 whitespace-nowrap lg:text-xl md:text-lg text-md flex flex-wrap gap-4 items-center">
                    إمتحانات المحاضرة:
                    <div className="text-[#3187FF] underline flex gap-2 flex-wrap items-center cursor-pointer">
                      <MdEditNote className="shrik-0" size={24} />
                      <span>
                        {LessonData?.sub_exams.length > 0
                          ? LessonData.sub_exams.length
                          : ""}
                        إمتحانات
                      </span>
                    </div>
                    <ol className="list-decimal ps-5 flex flex-col gap-2 w-full">
                      {LessonData?.sub_exams.map((exam) => (
                        <li key={exam.id}>
                          <Link
                            href={`/${unitId}/exams/${exam.id}`}
                            className="text-secondary-900 underline text-lg hover:text-secondary-800 transition-colors"
                          >
                            {exam.name}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                  {/* واجب المحاضرة */}
                  <div className="text-neural-900 lg:text-xl md:text-lg text-md flex flex-wrap gap-4 items-center">
                    واجب المحاضرة :
                    <div className="text-[#3187FF] underline flex gap-2 items-center cursor-pointer">
                      <BiBookContent size={24} />
                      <span>
                        {LessonData?.sub_homeworks.length > 0
                          ? LessonData.sub_homeworks.length
                          : ""}
                        واجبات
                      </span>
                    </div>
                    <ol className="list-decimal ps-5 flex flex-col gap-2 w-full">
                      {LessonData?.sub_homeworks.map((homework) => (
                        <li key={homework.id}>
                          <Link
                            href={`/${unitId}/home-works/${homework.id}`}
                            className="text-secondary-900 underline text-lg hover:text-secondary-800 transition-colors"
                          >
                            {homework.name}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="text-neural-900 lg:text-xl md:text-lg text-md flex flex-col gap-4 ">
                    <p>المرفقات</p>
                    <div className="text-[#3187FF] underline flex gap-2 items-center cursor-pointer">
                      <TiAttachmentOutline size={24} />
                      <span>
                        {LessonData?.attachments.length > 0
                          ? LessonData.attachments.length
                          : ""}
                      </span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 flex flex-col gap-2">
                      {LessonData.attachments.map((url, i) => (
                        <li key={i}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary-900 underline text-lg hover:text-secondary-800 transition-colors"
                          >
                            تحميل المرفق {i + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                ""
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
          <div className="w-full  p-4 md:hidden flex flex-col lg:gap-6 gap-4  ">
            <p className="text-neural-800 text-xl ">
              {LessonData?.name || "لا توجد بيانات"}
            </p>
            {/* ✅ Tabs بسيطة من shadcn */}
            <Tabs
              dir="rtl"
              defaultValue="lectures"
              className="w-full mt-2 !shadow-none"
            >
              <TabsList className="bg-transparent !shadow-none flex gap-6 border-b  w-full justify-start">
                <TabsTrigger
                  value="lectures"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-neural-700 font-medium rounded-none pb-2 transition-all duration-300 !shadow-none"
                >
                  دروس فرعية
                </TabsTrigger>
                <TabsTrigger
                  value="attachments"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-neural-700 font-medium rounded-none pb-2 transition-all duration-300 !shadow-none"
                >
                  المرفقات
                </TabsTrigger>
              </TabsList>

              {/* المحتوى */}
              <div className="mt-4">
                <TabsContent value="lectures">
                  {LessonData?.sub_lessons.map(
                    (lesson: SubLesson, index: number) => (
                      <div key={lesson.id}>
                        <Link
                          href={`/${unitId}/${lesson.id}`}
                          className="p-4 flex justify-between gap-2 text-primary "
                        >
                          <div className="flex gap-2 items-center">
                            <span className="font-bold text-primary">
                              {index + 1}
                            </span>
                            <MdOndemandVideo
                              size={22}
                              className="text-primary"
                            />
                            <span className="text-md">{lesson.name}</span>
                          </div>
                          <Checkbox
                            className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                            checked={lesson.is_viewed}
                          />
                        </Link>
                      </div>
                    )
                  )}
                </TabsContent>

                <TabsContent
                  className="flex flex-col gap-4"
                  value="attachments"
                >
                  <div className="text-neural-900 text-lg flex flex-col gap-4 ">
                    واجب المحاضرة:
                    <div className="text-[#3187FF] underline flex gap-2 items-center cursor-pointer">
                      <BiBookContent size={24} />
                      <span className="text-md">
                        {LessonData?.sub_homeworks.length} واجبات
                      </span>
                    </div>
                    <ol className="list-decimal ps-5 flex flex-col gap-2 w-full">
                      {LessonData?.sub_homeworks.map((homework) => (
                        <li key={homework.id}>
                          <Link
                            href={`/${unitId}/home-works/${homework.id}`}
                            className="text-secondary-900 text-sm underline  hover:text-secondary-800 transition-colors"
                          >
                            {homework.name}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="text-neural-900 text-lg flex flex-col gap-4 ">
                    <p> المرفقات :</p>
                    <div className="text-primary underline flex gap-2 items-center cursor-pointer">
                      <TiAttachmentOutline size={24} />
                      <span className="text-md">
                        {LessonData?.attachments.length} مرفق
                      </span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 flex flex-col gap-2">
                      {LessonData.attachments.map((url, i) => (
                        <li key={i}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary-900 text-sm underline  hover:text-secondary-800 transition-colors"
                          >
                            تحميل المرفق {i + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 md:block hidden">
          {LessonData?.sub_lessons.length > 0 ? (
            <Card className="w-full p-4">
              <div className="flex flex-col  gap-3 ">
                <div className="flex gap-2 items-center">
                  <MdOndemandVideo size={24} />
                  <span className="text-neural-900 text-xl"> دروس فرعية </span>
                </div>
                {LessonData?.sub_lessons.map((lesson: SubLesson) => (
                  <div key={lesson.id}>
                    <Link
                      href={`/${unitId}/${lesson.id}`}
                      className="border-[1px] border-primary p-4 flex justify-between gap-2 text-primary"
                    >
                      <div className="flex gap-2">
                        <MdOndemandVideo size={24} />
                        <span> {lesson.name} </span>
                      </div>
                      <Checkbox
                        className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                        checked={lesson.is_viewed}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <div className="h-[30vh] flex justify-center items-center"></div>
          )}
        </div>
      </div>
    </section>
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ unitId: string; lessonId: string }>;
}) {
  const { unitId, lessonId } = await params;

  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LessonContent lessonId={lessonId} unitId={unitId} />
    </Suspense>
  );
}
