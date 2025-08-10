import Image from "next/image";
import { FiChevronLeft } from "react-icons/fi";
import { studentstudying } from "../../../../../../public";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const exams = [
  {
    id: 1,
    title: "امتحان الوحدة الأولى",
    date: "30/12/2025",
    questions: 30,
    progress: 40,
    image: studentstudying,
  },
  {
    id: 2,
    title: "امتحان الوحدة الأولى",
    date: "30/12/2025",
    questions: 30,
    progress: 60,
    image: studentstudying,
  },
  {
    id: 3,
    title: "امتحان الوحدة الأولى",
    date: "30/12/2025",
    questions: 30,
    progress: 90,
    image: studentstudying,
  },
];

const Deadlines = () => {
  return (
    <div className="p-4">
      <p className="text-[#606060] lg:text-2xl md:text-xl text-lg font-semibold mb-6">
        ديدلاينز
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="border rounded-xl overflow-hidden shadow-sm bg-white"
          >
            {/* صورة الامتحان */}
            <Image
              src={exam.image}
              alt={exam.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              {/* عنوان الامتحان */}
              <h3 className="text-right font-semibold text-gray-800">
                {exam.title}
              </h3>

              {/* Progress Bar */}
              <div className="mt-2">
                <div className="flex justify-between text-xs text-secondary-500">
                  <span>{exam.progress}%</span>
                </div>

                <Progress
                  value={exam.progress}
                  className="w-full bg-gray-200 my-2"
                />
              </div>
              {/* معلومات التاريخ وعدد الأسئلة */}
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{exam.date}</span>
                <span>{exam.questions} سؤال</span>
              </div>

              {/* زر بدء الحل */}
              <Button
                variant="ghost"
                className="mt-4 group w-full border border-primary text-primary flex items-center justify-center text-md gap-1 h-10 rounded-md hover:bg-primary-400 hover:text-white transition"
              >
                <span>ابدأ حل</span>
                <FiChevronLeft
                  size={25}
                  className="transform transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110"
                />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deadlines;
