"use client";

import { joinExam } from "@/lib/apis/exams.api";
import React from "react";
import { IoRefreshOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
type ExamButtonProps = {
  ExamData: ExamDetails;
  unitId?: string;
  examId: string;
  examType?: "exam" | "homework";
};

const ExamButton = ({
  ExamData,
  unitId,
  examId,
  examType = "exam",
}: ExamButtonProps) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () =>
      joinExam({
        exam_id: ExamData.id,
        unit_id: unitId ?? undefined,
        exam_parent_id: examId,
      }),
    onSuccess: () => {
      if (examType === "homework") {
        if (unitId && examId) {
          router.push(`/${unitId}/home-works/${ExamData.id}/home-work`);
        } else {
          if (unitId && examId) {
            router.push(`/${unitId}/exams/${ExamData.id}/exam`);
          } else {
            router.push(`/exam/${ExamData.id}`);
          }
        }
        toast.success("تم بدء الواجب بنجاح!", {
          className: "!bg-primary !text-white !border-primary",
        });
      } else {
        router.push(`/${examId}/exams/${ExamData.id}/exam`);
        toast.success("تم بدء الامتحان بنجاح!", {
          className: "!bg-primary !text-white !border-primary",
        });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "حدث خطأ أثناء بدء الامتحان", {
        className: "!bg-red-500 !text-white",
      });
    },
  });

  // حساب توفر الامتحان
  const now = new Date();
  const start = new Date(ExamData.start_date);
  const end = new Date(ExamData.end_date);

  const isAvailableByTime = now >= start && now <= end;
  const isAvailableByFlag = ExamData.available_exam === 1;

  const canStartExam = isAvailableByTime && isAvailableByFlag;

  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-8">
      <button
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending || !canStartExam}
        className="bg-primary-400 hover:bg-primary-500 text-white rounded-md group flex gap-2 items-center justify-center w-52 lg:h-16 md:h-14 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 md:text-lg text-md font-medium">
          {ExamData?.is_attempted
            ? examType === "homework"
              ? "إعادة الواجب"
              : "إعادة الإمتحان"
            : examType === "homework"
            ? "ابدأ الواجب"
            : "ابدأ الإمتحان"}
        </span>
        <IoRefreshOutline
          size={33}
          className={`transition-transform duration-500 group-hover:animate-halfSpin ${
            mutation.isPending ? "animate-spin" : ""
          }`}
        />
      </button>

      {/* عرض الرسالة الراجعة من الـ API لو الامتحان مش متاح */}
      {!canStartExam && (
        <p className="text-sm text-red-500 mt-2">
          {ExamData.available_exam_message ||
            (examType === "exam"
              ? "الامتحان غير متاح حالياً"
              : "الواجب غير متاح حالياً")}
        </p>
      )}
    </div>
  );
};

export default ExamButton;
