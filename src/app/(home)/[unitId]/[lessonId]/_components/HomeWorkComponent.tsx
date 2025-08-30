"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { placeholder } from "../../../../../../public";
import { Textarea } from "@/components/ui/textarea";
import { saveAnswer, submitAnswer } from "@/lib/apis/exams.api";
import { useMutation } from "@tanstack/react-query";
import ConfirmSubmitDialog from "./ConfirmSubmitDialog";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function HomeWorkComponent({
  examData,
  examId,
}: {
  examData: ExamDetails;
  examId: string;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const confirmSubmitExam = async () => {
    await handleSubmitExam();
    setOpenDialog(false);
  };

  // Format time display

  const currentQuestion = examData.questions[currentQuestionIndex];
  const totalQuestions = examData.questions.length;

  const mutation = useMutation({
    mutationFn: (payload: SaveAnswerPayload) =>
      saveAnswer(payload, examData.id || examId),
    onSuccess: () => {
      console.log("Answer saved successfully");
    },
    onError: (error) => {
      console.error("Error saving answer:", error);
    },
  });
  const submitMutation = useMutation({
    mutationFn: (answersPayload: QuestionAnswer[]) =>
      submitAnswer(examData.id || examId, answersPayload),
    onSuccess: () => {
      console.log("Exam submitted successfully");
    },
    onError: (error) => {
      console.error("Error submitting exam:", error);
    },
  });
  const buildAnswersPayload = (): QuestionAnswer[] => {
    return examData.questions.map((q) => {
      const answerValue = answers[q.id] ?? "";

      const baseAnswer: QuestionAnswer = {
        question_id: q.id,
        question_type: q.type_id,
        answer: answerValue,
      };

      if (q.type_id !== "radio") {
        baseAnswer.url = "";
      }

      return baseAnswer;
    });
  };

  const handleSubmitExam = async () => {
    const payload = buildAnswersPayload();
    await submitMutation.mutateAsync(payload);
  };
  const submitCurrentAnswer = async () => {
    const currentQ = currentQuestion;
    const answerValue = answers[currentQ.id];

    if (answerValue !== undefined) {
      const payload: SaveAnswerPayload = {
        answer: {
          question_id: currentQ.id,
          question_type: currentQ.type_id,
          answer: answerValue,
          ...(currentQ.type_id !== "radio" && { url: "" }),
        },
      };
      await mutation.mutateAsync(payload);
    }
  };

  const handleAnswerChange = (
    questionId: number,
    optionId?: number | null,
    textAnswer?: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId ?? textAnswer ?? "",
    }));
  };

  const goToNextQuestion = async () => {
    await submitCurrentAnswer();

    if (currentQuestionIndex < examData.questions_count - 1) {
      // لسه فيه أسئلة → نروح للسؤال اللي بعده
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // ده آخر سؤال → افتح الـ dialog بعد الحفظ
      setOpenDialog(true);
    }
  };

  const goToPreviousQuestion = async () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const goToQuestion = async (index: number) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <>
      <div className="lg:px-6 md:px-4 px-2">
        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="lg:p-8 p-4 flex flex-col md:gap-6 gap-4">
            {/* End Exam Button */}
            <div className="text-center mb-6">
              <div
                onClick={() => setOpenDialog(true)}
                className="flex items-center justify-end gap-2 text-red-600 text-sm underline cursor-pointer"
              >
                <span>إنهاء الواجب</span>
                <X className="w-4 h-4" />
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-2 overflow-x-auto  justify-between pb-2 pt-6">
              <ChevronRight
                onClick={goToPreviousQuestion}
                className="w-6 h-6 text-gray-400 cursor-pointer shrink-0"
              />
              {Array.from({ length: totalQuestions }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToQuestion(index)}
                  className={`w-10 h-10 rounded-full shrink-0 border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                    index === currentQuestionIndex
                      ? "bg-secondary-900 text-white border-secondary-900"
                      : answers[examData.questions[index].id]
                      ? "bg-gray-200 text-gray-700 border-gray-300"
                      : "bg-white text-gray-500 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <ChevronLeft
                onClick={goToNextQuestion}
                className="w-6 h-6 text-gray-400 cursor-pointer shrink-0"
              />
            </div>
            <div className="text-start ">
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
            {/* Answer Options */}

            {/* text */}
            {currentQuestion.type_id === "text" && (
              <div className="flex flex-col gap-4 w-full">
                <Textarea
                  dir="rtl"
                  className="min-h-64"
                  placeholder="اكتب اجابتك هنا ..."
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(currentQuestion.id, null, e.target.value)
                  }
                />
                <div className="mb-4 rounded-3xl flex w-full  flex-col md:justify-start justify-center">
                  {imagePreview ? (
                    <div className="relative size-52 rounded-3xl">
                      <Image
                        src={imagePreview}
                        alt="image"
                        width={100}
                        height={100}
                        className="size-52 object-cover rounded-3xl"
                      />
                      <button
                        onClick={() => setImagePreview(undefined)}
                        className="absolute top-2 left-2 text-red-700  text-3xl  hover:text-red-500 transition"
                        aria-label="حذف الصورة"
                        type="button"
                      >
                        <IoMdCloseCircleOutline />
                      </button>
                    </div>
                  ) : (
                    <div className="size-52 bg-gray-200 rounded-3xl flex justify-center items-center">
                      <span>اختر صورة</span>
                    </div>
                  )}

                  {/* زرار رفع الصورة تحت الصورة */}
                  <label
                    htmlFor="imageUpload"
                    className="mt-3 flex gap-2  bg-primary text-white px-6 py-3 rounded-md justify-center items-center cursor-pointer  md:w-fit w-full"
                  >
                    <AiOutlineCloudDownload size={25} />
                    اختر صورة
                  </label>

                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            {/* radio */}
            {currentQuestion.type_id === "radio" && (
              <RadioGroup
                value={answers[currentQuestion.id]?.toString() || ""}
                onValueChange={(value) =>
                  handleAnswerChange(currentQuestion.id, parseInt(value))
                }
                dir="rtl"
                className="flex flex-col gap-6 "
              >
                {currentQuestion.options?.map((option) => (
                  <div key={option.id} className="flex items-start gap-3 ">
                    <RadioGroupItem
                      value={option.id.toString()}
                      id={option.id.toString()}
                    />
                    <Label
                      htmlFor={option.id.toString()}
                      className="flex-1 cursor-pointer"
                    >
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
                            dangerouslySetInnerHTML={{ __html: option.title }}
                          />
                        </div>
                      ) : (
                        <span
                          dangerouslySetInnerHTML={{ __html: option.title }}
                        />
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            {/* Navigation and Timer */}
            <div className="flex md:flex-row flex-col gap-4 items-center justify-between w-full">
              <Button
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="flex items-center gap-2 text-white bg-primary-500 hover:bg-primary-400 hover:text-white h-12 md:w-auto w-full"
              >
                <ChevronRight className="w-6 h-6" />
                السؤال السابق
              </Button>

              <Button
                onClick={goToNextQuestion}
                className="flex items-center gap-2 text-white bg-primary-500 hover:bg-primary-400 h-12  md:w-auto w-full"
              >
                {currentQuestionIndex < examData.questions_count - 1 ? (
                  <>
                    السؤال التالي
                    <ChevronLeft className="w-6 h-6" />
                  </>
                ) : (
                  <>
                    إنهاء الواجب
                    <X className="w-6 h-6" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <ConfirmSubmitDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={confirmSubmitExam}
      />
    </>
  );
}
