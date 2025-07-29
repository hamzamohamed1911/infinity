import { BreadCrumb } from "@/components/BreadCrumb";
import { Card } from "@/components/ui/card";

import { GetUnit } from "@/lib/apis/course.api";
import UnitSkeleton from "@/components/UnitSkeleton";
import { Suspense } from "react";
import { unitBg } from "../../../../../public";
import Image from "next/image";
import { MdEditNote } from "react-icons/md";
import { BiBookContent } from "react-icons/bi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

async function LessonContent({ unitId }: { unitId: string }) {
  const Unit = await GetUnit({ unit_id: unitId });
  const UnitData = Unit && "data" in Unit ? Unit.data : undefined;

  return (
    <section className="flex flex-col gap-4 w-full">
      {UnitData && <BreadCrumb lessonData={UnitData} unitData={UnitData} />}
      <div className="grid grid-cols-12 gap-8">
        <div className="  col-span-7 flex flex-col gap-4">
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
                  <Image
                    alt="unit background"
                    src={unitBg}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </TabsContent>
              <TabsContent value="player2">محتوى هتخلص قريب</TabsContent>
              <TabsContent value="player3">محتوى آخر المشاهدات</TabsContent>
            </div>
          </Tabs>

          <Card className="w-full lg:p-8 md:p-6 p-4 flex flex-col lg:gap-6 gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-[#8E8E8E] text-lg font-semibold">
                تفاصيل الدورة
              </h2>

              <p className="text-[#606060] lg:text-xl text-lg">
                دورة اللغة الإنجليزية هذه مصممة لتعليم المهارات الأساسية في
                المحادثة والقراءة والكتابة. ستساعدك على تحسين فهمك للغة
                الإنجليزية وتطبيقها في الحياة اليومية.
              </p>
            </div>
            <div className="flex flex-col lg:gap-8 md:gap-6 gap-4">
              {/* عدد المشاهدات */}
              <div className="text-[#606060]  lg:text-xl text-lg flex gap-2 items-center">
                عدد المشاهدات المتبقية:
                <span className="text-[#5C1294] font-bold">4</span>
              </div>

              {/* امتحان المحاضرة */}
              <div className="text-[#8E8E8E] lg:text-xl text-lg flex gap-4 items-center">
                إمتحان المحاضرة:
                <div className="text-[#3187FF] underline flex gap-2 items-center cursor-pointer">
                  <MdEditNote size={24} />
                  <span>إمتحان الوحدة الأولى</span>
                </div>
              </div>

              {/* واجب المحاضرة */}
              <div className="text-[#8E8E8E] lg:text-xl text-lg flex gap-4 items-center">
                واجب المحاضرة:
                <div className="text-[#3187FF] underline flex gap-2 items-center cursor-pointer">
                  <BiBookContent size={24} />
                  <span>4 واجبات</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-5">
          <Card className="w-full p-4">
            <Accordion type="single" collapsible className="w-full">
              <div className="space-y-3">
                {UnitData?.lessons.map((lesson) => (
                  <AccordionItem key={lesson.id} value={lesson.id.toString()}>
                    <AccordionTrigger className="text-lg font-medium border px-4 py-3 rounded-lg hover:border-primary hover:text-primary group transition-all">
                      {lesson.name}
                    </AccordionTrigger>
                    <AccordionContent className="border p-4">
                      <span>اذهب للدرس</span>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>
            </Accordion>
          </Card>
        </div>
      </div>
    </section>
  );
}
export default function Page({ params }: { params: { unitId: string } }) {
  return (
    <Suspense fallback={<UnitSkeleton />}>
      <LessonContent unitId={params.unitId} />
    </Suspense>
  );
}
