"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { placeholder } from "../../../../../../../../public";
import { CheckCircle, XCircle } from "lucide-react";

export default function RetryComponent({
  examData,
}: {
  examData: ExamDetails;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = examData.questions[currentQuestionIndex];
  const totalQuestions = examData.questions.length;

  const currentAnswer = examData.answers.find(
    (a) => a.question_id === currentQuestion.id
  );

  const goToNextQuestion = () => {
    if (currentQuestionIndex < examData.questions_count - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="lg:px-6 md:px-4 px-2">
      <Card className="mb-6">
        <CardContent className="lg:p-8 p-4 flex flex-col md:gap-6 gap-4">
          {/* التنقل بين الأسئلة */}
          <div className="flex items-center gap-2 overflow-x-auto justify-between pb-2 pt-6">
            <ChevronRight
              onClick={goToPreviousQuestion}
              className="w-6 h-6 text-gray-400 cursor-pointer shrink-0"
            />
            {Array.from({ length: totalQuestions }, (_, index) => {
              const isCurrent = index === currentQuestionIndex;
              const styles = isCurrent
                ? "bg-secondary-700 text-white border-secondary-800"
                : "bg-white text-gray-500 border-gray-300 hover:border-gray-400";
              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 rounded-full shrink-0 border-2 flex items-center justify-center text-sm font-medium transition-colors ${styles}`}
                >
                  {index + 1}
                </button>
              );
            })}
            <ChevronLeft
              onClick={goToNextQuestion}
              className="w-6 h-6 text-gray-400 cursor-pointer shrink-0"
            />
          </div>

          {/* السؤال */}
          <div className="text-start">
            <div className="text-sm text-gray-500 mb-2">
              السؤال {currentQuestionIndex + 1} من {totalQuestions}
            </div>
            <h2
              className="text-xl font-medium text-gray-800 mb-4"
              dangerouslySetInnerHTML={{ __html: currentQuestion?.title }}
            />
            {currentQuestion.url && (
              <div className="mb-6">
                <Image
                  width={100}
                  height={100}
                  src={currentQuestion.url || placeholder}
                  alt="Question image"
                  className="max-w-md mx-auto rounded-lg shadow-sm"
                />
              </div>
            )}
          </div>

          {/* الإجابات */}
          <div className="mt-2 border-t pt-4">
            <h3 className="font-semibold text-gray-700 mb-3">إجابتك:</h3>

            {/* الأسئلة النصية */}
            {currentQuestion.type_id === "text" && (
              <div className="flex flex-col gap-3">
                <p className="p-3 bg-gray-100 rounded-md text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {currentAnswer?.answer || "— لا توجد إجابة"}
                </p>

                {currentAnswer?.url && (
                  <Image
                    width={200}
                    height={200}
                    src={currentAnswer.url}
                    alt="Answer image"
                    className="rounded-md border max-w-xs"
                  />
                )}
              </div>
            )}
            {/* الأسئلة الاختيارية */}
            {currentQuestion.type_id === "radio" && (
              <div className="flex flex-col gap-3">
                {currentQuestion.options?.map((option) => {
                  const isSelected =
                    Number(currentAnswer?.answer) === option.id;
                  const isCorrect = option.is_correct === true;

                  // نحدد اللون والعلامة حسب الحالة
                  let borderColor = "border-gray-200";
                  let bgColor = "bg-white";
                  let Icon = null;

                  if (isSelected && isCorrect) {
                    borderColor = "border-secondary-600";
                    bgColor = "bg-secondary-50";
                    Icon = (
                      <CheckCircle className="text-secondary-600" size={20} />
                    );
                  } else if (isSelected && !isCorrect) {
                    borderColor = "border-red-600";
                    bgColor = "bg-red-50";
                    Icon = <XCircle className="text-red-600" size={20} />;
                  } else if (!isSelected && isCorrect) {
                    // لو هو الصح والطالب ما اختاروش
                    borderColor = "border-secondary-600";
                    bgColor = "bg-secondary-50";
                    Icon = (
                      <CheckCircle className="text-secondary-600" size={20} />
                    );
                  }

                  return (
                    <div
                      key={option.id}
                      className={`flex items-center gap-3 p-3 rounded-md border ${borderColor} ${bgColor}`}
                    >
                      {Icon}
                      {option.url ? (
                        <div className="flex items-center gap-3">
                          <Image
                            width={100}
                            height={100}
                            src={option.url || placeholder}
                            alt="Option"
                            className="w-16 h-16 object-cover rounded"
                          />
                          <span
                            className="leading-7"
                            dangerouslySetInnerHTML={{ __html: option.title }}
                          />
                        </div>
                      ) : (
                        <span
                          className="leading-7"
                          dangerouslySetInnerHTML={{ __html: option.title }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
