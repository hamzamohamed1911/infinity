import { BreadCrumb } from "@/components/BreadCrumb";
import Image from "next/image";
import { placeholder } from "../../../../public";
import { RiBookMarkedLine } from "react-icons/ri";

import { Card } from "@/components/ui/card";

import { ChevronRight, ExternalLink } from "lucide-react";
import { GetUnit } from "@/lib/apis/course.api";
import UnitSkeleton from "@/components/UnitSkeleton";
import { Suspense } from "react";
import Link from "next/link";
import NoDataMessage from "@/components/NoDataMessage";
import PaymentDialog from "./payments/_components/PaymentDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
            </div>
          </div>
          {UnitData && Number(UnitData.price || 0) > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <div className="w-full h-full flex justify-end items-end">
                  <Button
                    className="bg-primary text-white px-6 py-4 rounded-full hover:bg-primary-400    transition-all duration-300"
                    asChild
                  >
                    <a href="#purchase" className="flex items-center gap-2">
                      اشترى الان
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </DialogTrigger>
              <PaymentDialog
                name={UnitData.name}
                model_type={UnitData.type ? UnitData.type : "lecture"}
                model_id={UnitData.id}
              />
            </Dialog>
          )}
        </div>
        <div className=" w-full h-full relative 2xl:min-h-96  min-h-72 col-span-7 ">
          <Image
            alt={UnitData?.name || "unit background"}
            src={UnitData?.image || UnitData?.thumbnail || placeholder}
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
export default async function Page({
  params,
}: {
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;

  return (
    <Suspense fallback={<UnitSkeleton />}>
      <UnitContent unitId={unitId} />
    </Suspense>
  );
}
