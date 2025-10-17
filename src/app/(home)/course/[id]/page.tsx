import Image from "next/image";
import { RiBookMarkedLine } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import { BiBookContent } from "react-icons/bi";
import { Card } from "@/components/ui/card";

import { ChevronRight, ExternalLink } from "lucide-react";
import UnitSkeleton from "@/components/UnitSkeleton";
import { Suspense } from "react";
import Link from "next/link";
import NoDataMessage from "@/components/NoDataMessage";
import { placeholder } from "../../../../../public";
import { GetBundle } from "@/lib/apis/course.api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PaymentDialog from "../../[unitId]/payments/_components/PaymentDialog";
async function CourseContent({ id }: { id: string }) {
  const bundle = await GetBundle({ bundle_id: id });
  const UnitData = bundle && "data" in bundle ? bundle.data : undefined;
  return (
    <section className="flex flex-col gap-4 w-full p-4">
      <div className="grid md:grid-cols-12 grid-cols-1 justify-center items-center gap-8 2xl:min-h-72  min-h-60 w-full">
        <div className="flex flex-col gap-6 col-span-5">
          <div className="flex flex-col gap-4">
            <h2 className="text-[#8E8E8E] text-xl font-semibold">
              تفاصيل الكورس
            </h2>
            <h3 className="text-neural-800 text-xl font-semibold">
              {UnitData?.name || "لا توجد بيانات"}
            </h3>
            <p className="text-neural-800 lg:text-xl text-lg !leading-relaxed">
              {UnitData?.description || "لا توجد بيانات"}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-[#8E8E8E] text-xl font-semibold">
              في الكورس هتلاقي
            </h2>
            <div className="text-neural-800 flex  flex-wrap lg:gap-6 gap-4">
              {(UnitData?.books?.length ?? 0) > 0 && (
                <span className="flex gap-2 items-center hover:bg-secondary-500 md:hover:p-4 hover:p-2 hover:text-white rounded-md">
                  <RiBookMarkedLine size={30} />
                  <p className="whitespace-nowrap">
                    {UnitData?.books?.length ?? 0} كتاب
                  </p>
                </span>
              )}

              {(UnitData?.lessons?.length ?? 0) > 0 && (
                <span className="flex gap-2 items-center hover:bg-secondary-500 md:hover:p-4 hover:p-2 hover:text-white rounded-md">
                  <MdEditNote size={30} />
                  <p className="whitespace-nowrap">
                    {UnitData?.lessons?.length ?? 0} دروس
                  </p>
                </span>
              )}

              {(UnitData?.exams?.length ?? 0) > 0 && (
                <span className="flex gap-2 items-center hover:bg-secondary-500 md:hover:p-4 hover:p-2 hover:text-white rounded-md">
                  <BiBookContent size={30} />
                  <p className="whitespace-nowrap">
                    {UnitData?.exams?.length ?? 0} إمتحانات
                  </p>
                </span>
              )}
            </div>
          </div>
          {UnitData && Number(UnitData.price || 0) > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <div className="w-full h-full flex justify-end items-end">
                  <Button
                    className="bg-primary-600  hover:bg-primary-500 text-white px-6 py-4 rounded-full     transition-all duration-300 cursor-pointer"
                    asChild
                  >
                    <span className="flex items-center gap-2">
                      اشترى الان
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  </Button>
                </div>
              </DialogTrigger>
              <PaymentDialog
                name={UnitData.name}
                model_type={UnitData.type ? UnitData.type : "bundle"}
                model_id={UnitData.id}
              />
            </Dialog>
          )}
        </div>

        <div className=" w-full h-full relative 2xl:min-h-96  min-h-72 col-span-7 ">
          <Image
            alt={UnitData?.name || "unit background"}
            src={UnitData?.thumbnail || placeholder}
            fill
            className="object-contain rounded-lg"
          />
        </div>
      </div>

      {UnitData?.lessons && UnitData.lessons.length > 0 ? (
        <Card className="w-full p-4">
          <div className="space-y-3">
            {UnitData.lessons.map((lesson) =>
              UnitData.booking_status || Number(UnitData.price) === 0 ? (
                <Link
                  key={lesson.id}
                  href={`/${lesson.section_id || "undefined"}/${lesson.id}`}
                  className="group w-full flex justify-between items-center py-5 px-4 rounded-lg border cursor-pointer transition-all hover:border-primary hover:text-primary"
                >
                  <span className="text-lg font-medium">{lesson.name}</span>
                  <ChevronRight className="text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ) : (
                <div
                  key={lesson.id}
                  className="group w-full flex justify-between items-center py-5 px-4 rounded-lg border cursor-not-allowed"
                >
                  <span className="text-lg font-medium">{lesson.name}</span>
                  <ChevronRight className="text-muted-foreground" />
                </div>
              )
            )}
          </div>
        </Card>
      ) : (
        <NoDataMessage text="لا توجد دروس متاحة حاليًا." />
      )}
    </section>
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<UnitSkeleton />}>
      <CourseContent id={id} />
    </Suspense>
  );
}
