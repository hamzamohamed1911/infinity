import { Card, CardContent } from "@/components/ui/card";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import { placeholder } from "../../../../../../../public";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PaymentDialog from "@/app/(home)/[unitId]/payments/_components/PaymentDialog";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils/format-date";

const AllLessons = ({ UnitsData }: { UnitsData: CourseDetails[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {UnitsData.map((unit: CourseDetails) => (
        <Card
          key={unit.id}
          className="overflow-hidden shadow-none border-none h-full relative"
        >
          <Image
            src={unit.thumbnail || unit.image || placeholder}
            alt={unit.name}
            width={600}
            height={600}
            className="w-full h-80 object-contain"
          />
          <CardContent className="p-2 flex flex-col h-36 justify-between gap-3 text-start">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-neural-800">
                {unit.name}
              </h3>
              {unit.end_date && (
                <div className="flex gap-2 justify-start items-center text-neural-800 text-sm">
                  <span>صلاحية الدرس :</span>
                  <p>{formatDate(unit.end_date) || "لا يوجد"} </p>
                </div>
              )}

              <div className="absolute top-2 left-2">
                {Number(unit.price) > 0 && unit.booking_status !== 1 && (
                  <div className="text-sm font-medium p-2 w-fit self-end text-end bg-primary-500 text-white rounded-full">
                    {unit.discount > 0 ? (
                      <>
                        <span className="line-through text-white">
                          {unit.price} ج.م
                        </span>{" "}
                        <span className="text-green-400">
                          {Number(unit.price) - unit.discount} ج.م
                        </span>
                      </>
                    ) : (
                      <span className="text-white">{unit.price} ج.م</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            {unit.available_today ? (
              unit.booking_status || Number(unit.price) === 0 ? (
                // مشاهدة مباشرة
                <Link
                  href={`/${unit?.section_id}/${unit.id}`}
                  className="group mt-auto flex items-center justify-center gap-2 w-full h-12 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  شوف الدرس
                  <IoIosArrowBack
                    size={20}
                    className="transform transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110"
                  />
                </Link>
              ) : (
                <Dialog key={unit.id}>
                  <DialogTrigger asChild>
                    <Button className="group mt-auto flex items-center justify-center gap-2 w-full h-12 rounded-lg bg-primary text-white hover:bg-primary-700 transition-all duration-300">
                      اشترى الآن
                    </Button>
                  </DialogTrigger>
                  <PaymentDialog
                    name={unit.name}
                    model_type="lesson"
                    model_id={unit.id}
                  />
                </Dialog>
              )
            ) : (
              // غير متاح
              <Button
                disabled
                className="group mt-auto flex items-center justify-center gap-2 w-full h-12 rounded-lg bg-gray-400 text-white"
              >
                غير متاح
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AllLessons;
