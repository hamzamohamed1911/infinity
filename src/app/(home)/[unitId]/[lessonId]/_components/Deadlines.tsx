import Image from "next/image";
import { FiChevronLeft } from "react-icons/fi";
import { studentstudying } from "../../../../../../public";
import { Progress } from "@/components/ui/progress";
import { GetExams } from "@/lib/apis/exams.api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
type ExamButtonProps = {
  unitId?: string;
  examId: string;
  examType?: number;
};

const Deadlines = async ({ unitId, examId, examType = 1 }: ExamButtonProps) => {
  const cookieStore = await cookies();
  const selectedId = cookieStore.get("selected_course_id")?.value;

  if (!selectedId || selectedId === "undefined") {
    redirect("/my-courses");
  }

  const examsList = await GetExams({
    course_id: selectedId,
    assessment_type: examType,
  });

  const ExamsData: ExamDetails[] =
    examsList && "data" in examsList && Array.isArray(examsList.data)
      ? examsList.data
      : [];
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr);
  };

  const filteredExams = ExamsData.filter((exam) => {
    const endDate = formatDate(exam.end_date);
    return (
      endDate.toDateString() === today.toDateString() ||
      endDate.toDateString() === tomorrow.toDateString()
    );
  });

  return (
    <div className="p-4">
      <p className="text-[#606060] lg:text-2xl md:text-xl text-lg font-semibold mb-6">
        ديدلاينز
      </p>

      {filteredExams.length === 0 ? (
        <p className="text-gray-500">
          {examType === 1 ? "لا توجد امتحانات قريبة" : "لا توجد واجبات قريبة"}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExams.map((exam: ExamDetails) => (
            <div
              key={exam.id}
              className="border rounded-xl overflow-hidden shadow-sm bg-white"
            >
              {/* صورة الامتحان */}
              <Image
                src={studentstudying}
                alt={exam.name}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                {/* عنوان الامتحان */}
                <h3 className="text-right font-semibold text-gray-800">
                  {exam.name}
                </h3>

                {/* Progress Bar */}
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-secondary-500">
                    <span>
                      {exam.user_degree
                        ? Math.round((exam.user_degree / exam.degree) * 100)
                        : 0}
                      %
                    </span>
                  </div>

                  <Progress
                    value={
                      exam.user_degree
                        ? Math.round((exam.user_degree / exam.degree) * 100)
                        : 0
                    }
                    className="w-full bg-gray-200 my-2"
                  />
                </div>

                {/* معلومات التاريخ وعدد الأسئلة */}
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>
                    {new Date(exam.end_date).toLocaleDateString("ar-EG")}
                  </span>
                  <span>{exam.questions_count} سؤال</span>
                </div>

                {/* زر بدء الحل */}
                <Link
                  href={
                    unitId && examId
                      ? `/${unitId}/${examId}/exams/${exam.id}`
                      : `/exam/${exam.id}`
                  }
                  className="mt-4 group w-full border border-primary text-primary flex items-center justify-center text-md gap-1 h-10 hover:bg-primary-400 hover:text-white transition rounded-md"
                >
                  <span>ابدأ حل</span>
                  <FiChevronLeft
                    size={25}
                    className="transform transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Deadlines;
