import { Card, CardContent } from "@/components/ui/card";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import { placeholder } from "../../../../../../../public";
import Link from "next/link";
import { MdEditNote, MdOndemandVideo } from "react-icons/md";
import { LuBook } from "react-icons/lu";

const AllUnits = ({ UnitsData }: { UnitsData: CourseDetails[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {UnitsData.map((unit: CourseDetails) => {
        const canAccess = unit.price === 0 || unit.booking_status === 1;

        return (
          <Card
            key={unit.id}
            className="overflow-hidden shadow-none border-none"
          >
            <Image
              src={unit.image || unit.thumbnail || placeholder}
              alt={unit.name}
              width={600}
              height={600}
              className="w-full h-80 object-cover"
            />
            <CardContent className="p-2 space-y-3 text-start">
              <h3 className="text-lg font-semibold text-[#606060]">
                {unit.name}
              </h3>
              <p className="text-sm font-medium text-[#606060] line-clamp-2">
                {unit.description}
              </p>
              <div className="flex justify-between text-[#8E8E8E]">
                <div className="flex items-center gap-1 text-sm">
                  <MdEditNote size={20} />
                  <span>{unit?.exams_count} </span>
                  <span>امتحان</span>
                </div>

                <div className="flex items-center gap-1 text-sm">
                  <LuBook size={20} />
                  <span>{unit?.homeworks_count} </span>
                  <span>واجب</span>
                </div>

                <div className="flex items-center gap-1 text-sm">
                  <MdOndemandVideo size={20} />
                  <span>{unit?.lessons?.length} </span>
                  <span>دروس</span>
                </div>
              </div>
              <div className="flex justify-end items-end">
                {unit?.price && unit.price > 0 && (
                  <div className=" text-sm font-medium p-2 w-fit self-end text-end bg-primary-500 text-white rounded-full">
                    {unit?.discount && unit.discount > 0 ? (
                      <>
                        <span className="line-through text-red-500">
                          {unit.price} ج.م
                        </span>{" "}
                        <span className="text-green-600">
                          {(unit.price ?? 0) - (unit.discount ?? 0)} ج.م
                        </span>
                      </>
                    ) : (
                      <span>{unit.price} ج.م</span>
                    )}
                  </div>
                )}
              </div>
              {canAccess ? (
                <Link
                  href={`/${unit.id}`}
                  className="group flex items-center justify-center text-lg gap-2 text-primary border-[1px] border-primary hover:bg-primary hover:text-white w-full h-12 rounded-lg transition-all duration-300"
                >
                  شوف الدروس
                  <IoIosArrowBack
                    size={25}
                    className="transform transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110"
                  />
                </Link>
              ) : (
                <Link
                  href={`/${unit.id}`}
                  className="group flex items-center justify-center gap-2 w-full h-12 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  عرض التفاصيل
                  <IoIosArrowBack
                    size={20}
                    className="transform transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110"
                  />
                </Link>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AllUnits;
