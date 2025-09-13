import { Card, CardContent } from "@/components/ui/card";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import { placeholder } from "../../../../../public";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { MdEditNote } from "react-icons/md";
import { formatDate } from "@/lib/utils/format-date";

const ExamsComponent = ({
  ExamsData,
  type,
}: {
  ExamsData: ExamDetails[];
  type: string;
}) => {
  if (!ExamsData || ExamsData.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-60">
        <p className="text-gray-500 text-lg">لا توجد بيانات</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {ExamsData.map((exam) => (
        <Card key={exam.id} className="overflow-hidden shadow-none border-none">
          <Image
            src={exam.image || placeholder}
            alt={exam.name}
            width={600}
            height={600}
            className="w-full h-80 object-cover"
          />
          <CardContent className="p-2 space-y-3 text-start">
            <h3 className="text-lg font-semibold text-[#606060]">
              {exam.name}
            </h3>
            <div className="flex gap-2 justify-center items-center ">
              <Progress
                indicatorClassName="bg-secondary-600"
                value={50}
                className="w-full bg-gray-200  my-2"
              />
              <span className="text-secondary-600">50%</span>
            </div>
            <div className="flex gap-2 justify-between items-center text-[#606060] text-sm">
              <div className="flex items-center gap-2  ">
                <MdEditNote size={20} />
                <div className="flex items-center gap-1 ">
                  <span>{exam?.questions_count} </span>
                  <span>سؤال</span>
                </div>
              </div>
              <div className="flex gap-2 justify-center items-center">
                <span>
                  {type === "homework"
                    ? "ًصلاحية الواجب :"
                    : "صلاحية الامتحان :"}
                </span>
                <p>{formatDate(exam.end_date) || "لا يوجد"} </p>
              </div>
            </div>
            <Link
              href={`/${exam.section_id}/${exam.lesson_id}${
                type === "homework" ? "/home-works" : "/exams"
              }/${exam.id}`}
              className="group flex items-center justify-center text-lg gap-2 text-primary border-[1px] border-primary hover:bg-primary hover:text-white w-full h-12 rounded-lg transition-all duration-300"
            >
              حله تاني
              <IoIosArrowBack
                size={25}
                className="transform transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110"
              />
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExamsComponent;
