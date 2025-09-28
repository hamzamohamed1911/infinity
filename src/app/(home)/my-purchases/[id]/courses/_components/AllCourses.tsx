import { Card, CardContent } from "@/components/ui/card";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import { placeholder } from "../../../../../../../public";
import Link from "next/link";
import { MdEditNote, MdOndemandVideo } from "react-icons/md";
import { LuBook } from "react-icons/lu";

const AllCourses = ({ CoursesData }: { CoursesData: CourseType[] }) => {
  console.log("CoursesData", CoursesData);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {CoursesData.map((course: CourseType) => (
        <Card
          key={course.id}
          className="overflow-hidden shadow-none border-none"
        >
          <Image
            src={course.thumbnail || placeholder}
            alt={course.name}
            width={600}
            height={600}
            className="w-full h-80 object-cover"
          />
          <CardContent className="p-2 space-y-3 text-start">
            <h3 className="text-lg font-semibold text-neural-800">
              {course.name}
            </h3>
            <div className="flex justify-between text-[#8E8E8E]">
              <div className="flex items-center gap-1 text-sm">
                <MdEditNote size={20} />
                <span>{course?.exams?.length} </span>
                <span>امتحان</span>
              </div>

              <div className="flex items-center gap-1 text-sm">
                <LuBook size={20} />
                <span>{course?.books?.length} </span>
                <span>كتب</span>
              </div>

              <div className="flex items-center gap-1 text-sm">
                <MdOndemandVideo size={20} />
                <span>{course?.lessons?.length} </span>
                <span>دروس</span>
              </div>
            </div>
            <div className="flex justify-end items-end">
              {/* لو الكورس مدفوع ولسه ما اتشراش */}
              {course?.price &&
                course.price > 0 &&
                !course?.is_purchased_before && (
                  <div className=" text-sm font-medium p-2 w-fit self-end text-end bg-primary-500 text-white rounded-full">
                    {course?.discount && course.discount > 0 ? (
                      <>
                        <span className="line-through text-red-500">
                          {course.price} ج.م
                        </span>{" "}
                        <span className="text-green-600">
                          {(course.price ?? 0) - (course.discount ?? 0)} ج.م
                        </span>
                      </>
                    ) : (
                      <span>{course.price} ج.م</span>
                    )}
                  </div>
                )}
            </div>

            {course.price === 0 ? (
              <Link
                href={`/course/${course.id}`}
                className="group flex items-center justify-center text-lg gap-2 text-primary border-[1px] border-primary hover:bg-primary hover:text-white w-full h-12 rounded-lg transition-all duration-300"
              >
                إبدأ التعلم
                <IoIosArrowBack
                  size={25}
                  className="transform transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110"
                />
              </Link>
            ) : (
              <Link
                href={`/course/${course.id}`}
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
      ))}
    </div>
  );
};

export default AllCourses;
