import { BreadCrumb } from "@/components/BreadCrumb";
import Image from "next/image";
import { placeholder } from "../../../../public";
import { RiBookMarkedLine } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import { BiBookContent } from "react-icons/bi";
import { Card } from "@/components/ui/card";

import { ChevronRight } from "lucide-react";
import { GetUnit } from "@/lib/apis/course.api";
import UnitSkeleton from "@/components/UnitSkeleton";
import { Suspense } from "react";
import Link from "next/link";
import NoDataMessage from "@/components/NoDataMessage";
async function UnitContent({ unitId }: { unitId: string }) {
  const Unit = await GetUnit({ unit_id: unitId });
  const UnitData = Unit && "data" in Unit ? Unit.data : undefined;

  return (
    <section className="flex flex-col gap-4 w-full p-4">
      {UnitData && <BreadCrumb unitData={UnitData} />}
      <div className="grid md:grid-cols-12 grid-cols-1 justify-center items-center gap-8 2xl:min-h-72  min-h-60 w-full">
        <div className="flex flex-col gap-6 col-span-5">
          <div className="flex flex-col gap-4">
            <h2 className="text-[#8E8E8E] text-xl font-semibold">
              تفاصيل الوحدة
            </h2>
            <h3 className="text-[#606060] text-xl font-semibold">
              {UnitData?.name || "لا توجد بيانات"}
            </h3>
            <p className="text-[#606060] lg:text-xl text-lg">
              {UnitData?.description || "لا توجد بيانات"}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-[#8E8E8E] text-xl font-semibold">
              في الوحدة هتلاقي
            </h2>
            <div className="text-[#606060] flex  flex-wrap lg:gap-6 gap-4">
              <span className="flex gap-2 items-center hover:bg-secondary-500 md:hover:p-4 hover:p-2 hover:text-white rounded-md">
                <RiBookMarkedLine size={30} />
                <p className="whitespace-nowrap">
                  {UnitData?.lessons_count || "لا توجد بيانات"} فيديو
                </p>
              </span>
              <span className="flex gap-2 items-center hover:bg-secondary-500 md:hover:p-4 hover:p-2 hover:text-white rounded-md">
                <MdEditNote size={30} />
                <p className="whitespace-nowrap">
                  {UnitData?.exams_count || "لا توجد بيانات"} إمتحانات
                </p>
              </span>
              <span className="flex gap-2 items-center hover:bg-secondary-500 md:hover:p-4 hover:p-2 hover:text-white rounded-md">
                <BiBookContent size={30} />
                <p className="whitespace-nowrap">
                  {UnitData?.homeworks_count || "لا توجد بيانات"} واجبات
                </p>
              </span>
            </div>
          </div>
        </div>
        <div className=" w-full h-full relative 2xl:min-h-96  min-h-72 col-span-7 ">
          <Image
            alt={UnitData?.name || "unit background"}
            src={UnitData?.image || placeholder}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
      {UnitData?.lessons && UnitData.lessons.length > 0 ? (
        <Card className="w-full p-4">
          <div className="space-y-3">
            {UnitData.lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`${unitId}/${lesson.id}`}
                className="group w-full flex justify-between items-center py-5 px-4 rounded-lg border cursor-pointer transition-all hover:border-primary hover:text-primary"
              >
                <span className="text-lg font-medium">{lesson.name}</span>
                <ChevronRight className="text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </Card>
      ) : (
        <NoDataMessage text="لا توجد دروس متاحة حاليًا." />
      )}
    </section>
  );
}
export default function Page({ params }: { params: { unitId: string } }) {
  return (
    <Suspense fallback={<UnitSkeleton />}>
      <UnitContent unitId={params.unitId} />
    </Suspense>
  );
}
