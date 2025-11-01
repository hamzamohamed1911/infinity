"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Clock, X } from "lucide-react";
import Image from "next/image";
import { placeholder } from "../../../../../../public";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import ConfirmSubmitDialog from "./ConfirmSubmitDialog";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useSession } from "next-auth/react";
import { saveAnswer, submitAnswer } from "@/lib/apis/submit-exam.api";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react"; // أيقونة الصح

export default function ExamComponent({
  examData,
  examId,
}: {
  examData: ExamDetails;
  examId: string;
}) {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [imageFiles, setImageFiles] = useState<Record<number, File | null>>({});
  const [timeRemaining, setTimeRemaining] = useState(examData.period * 60);
  const [openDialog, setOpenDialog] = useState(false);
  const [shownAnswers, setShownAnswers] = useState<Record<number, boolean>>({});

  const [imagePreviews, setImagePreviews] = useState<Record<number, string>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(
    new Set()
  );
  // المؤقت
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentQuestion = examData.questions[currentQuestionIndex];
  const totalQuestions = examData.questions.length;

  // mutations
  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      saveAnswer(formData, examData.id || examId, token ?? ""),
    onError: (error) => console.error("Error saving answer:", error),
  });

  const submitMutation = useMutation({
    mutationFn: (formData: FormData) =>
      submitAnswer(examData.id || examId, formData, token ?? ""),
    onError: (error) => console.error("Error submitting exam:", error),
  });

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

  // التعامل مع رفع صورة
  const handleImageChange = (
    questionId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFiles((prev) => ({ ...prev, [questionId]: file }));
      setImagePreviews((prev) => ({
        ...prev,
        [questionId]: URL.createObjectURL(file),
      }));
    }
  };

  // مسح الصورة
  const removeImage = (questionId: number) => {
    setImageFiles((prev) => ({ ...prev, [questionId]: null }));
    setImagePreviews((prev) => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });
  };

  // بناء الـ FormData لإجابة السؤال الحالي
  const buildCurrentAnswerFormData = (): FormData | null => {
    const currentQ = currentQuestion;
    const answerValue = answers[currentQ.id];

    if (answerValue === undefined) return null;

    const formData = new FormData();
    // استعمل answer[...] بدل answers[0][...]
    formData.append("answer[question_id]", currentQ.id.toString());
    formData.append("answer[question_type]", currentQ.type_id);
    formData.append("answer[answer]", answerValue.toString());

    if (currentQ.type_id !== "radio") {
      const file = imageFiles[currentQ.id];
      if (file) {
        formData.append("answers[0][url]", file);
      }
    }

    return formData;
  };

  const submitCurrentAnswer = async () => {
    const formData = buildCurrentAnswerFormData();
    if (formData) {
      await mutation.mutateAsync(formData);
    }
  };

  const handleSubmitExam = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      examData.questions.forEach((q, index) => {
        const answerValue = answers[q.id] ?? "";
        formData.append(`answers[${index}][question_id]`, q.id.toString());
        formData.append(`answers[${index}][question_type]`, q.type_id);
        formData.append(`answers[${index}][answer]`, answerValue.toString());

        const file = imageFiles[q.id];
        if (file) {
          formData.append(`answers[${index}][url]`, file);
        }
      });

      await submitMutation.mutateAsync(formData);
      router.push(`/${examData.section_id}/exams/${examData.id}`);
    } catch (err) {
      console.error("فشل في الإرسال:", err);
      router.push(`/${examData.section_id}/exams/${examData.id}`);
    }
  }, [isSubmitting, answers, imageFiles, examData, router, submitMutation]);
  useEffect(() => {
    if (isSubmitting) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitting, handleSubmitExam]);
  const confirmSubmitExam = async () => {
    await handleSubmitExam();
    setOpenDialog(false);
  };

  // تنقل بين الأسئلة
  const goToNextQuestion = async () => {
    await submitCurrentAnswer();
    setVisitedQuestions((prev) => new Set(prev).add(currentQuestionIndex));

    if (currentQuestionIndex < examData.questions_count - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setOpenDialog(true);
    }
  };

  const goToPreviousQuestion = async () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const goToQuestion = async (index: number) => {
    setVisitedQuestions((prev) => new Set(prev).add(currentQuestionIndex));
    setCurrentQuestionIndex(index);
  };

  return (
    <>
      <div className="lg:px-6 md:px-4 px-2">
        <Card className="mb-6">
          <CardContent className="lg:p-8 p-4 flex flex-col md:gap-6 gap-4">
            <div className="text-center mb-6 w-full flex items-center justify-end">
              <Button
                onClick={() => setOpenDialog(true)}
                className=" gap-2 text-white bg-primary-600 hover:bg-primary-500 transition-colors h-12 md:w-auto "
              >
                <span>إنهاء الامتحان</span>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="w-full flex justify-center items-center">
              <span className="w-fit flex items-center gap-2 text-[#DF6100] border border-[#DF6100] rounded-md px-6 h-12 font-medium text-lg shadow-sm">
                <span>{formatTime(timeRemaining)}</span>
                <Clock className="w-4 h-4" />
              </span>
            </div>

            {/* الخطوات */}
            <div className="flex items-center gap-2 overflow-x-auto justify-between pb-2 pt-6">
              <ChevronRight
                onClick={goToPreviousQuestion}
                className="w-6 h-6 text-gray-400 cursor-pointer shrink-0"
              />
              {Array.from({ length: totalQuestions }, (_, index) => {
                const isCurrent = index === currentQuestionIndex;
                const hasAnswer = !!answers[examData.questions[index].id];
                const isVisited = visitedQuestions.has(index) || hasAnswer;

                let styles = "";

                if (isCurrent) {
                  styles = "bg-secondary-800 text-white border-secondary-900";
                } else if (hasAnswer) {
                  styles = "border-green-500 bg-green-100 text-green-700";
                } else if (isVisited) {
                  styles = "border-red-500 bg-red-50 text-red-700";
                } else {
                  styles =
                    "bg-white text-gray-500 border-gray-300 hover:border-gray-400";
                }

                return (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
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

            {/* نوع الإجابة */}
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

                <div className="mb-4 rounded-3xl flex w-full flex-col md:justify-start justify-center">
                  {imagePreviews[currentQuestion.id] ? (
                    <div className="relative size-52 rounded-3xl">
                      <Image
                        src={imagePreviews[currentQuestion.id]}
                        alt="image"
                        width={100}
                        height={100}
                        className="size-52 object-cover rounded-3xl"
                      />
                      <button
                        onClick={() => removeImage(currentQuestion.id)}
                        className="absolute top-2 left-2 text-red-700 text-3xl hover:text-red-500 transition"
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

                  <label
                    htmlFor={`imageUpload-${currentQuestion.id}`}
                    className="mt-3 flex gap-2 bg-primary text-white px-6 py-3 rounded-md justify-center items-center cursor-pointer md:w-fit w-full"
                  >
                    <AiOutlineCloudDownload size={25} />
                    اختر صورة
                  </label>

                  <input
                    key={currentQuestion.id}
                    id={`imageUpload-${currentQuestion.id}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(currentQuestion.id, e)}
                    className="hidden"
                  />
                </div>
              </div>
            )}
            {currentQuestion.type_id === "radio" &&
              examData.show_correct_answer === 1 && (
                <div className="w-full flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setShownAnswers((prev) => ({
                        ...prev,
                        [currentQuestion.id]: !prev[currentQuestion.id],
                      }))
                    }
                    className={`border-primary-500 w-32 ${
                      shownAnswers[currentQuestion.id]
                        ? "text-red-500 border-red-400 hover:text-red-400"
                        : "text-primary-500 hover:text-primary-400"
                    } hover:bg-transparent bg-transparent transition-colors`}
                  >
                    الإجابة
                  </Button>
                </div>
              )}

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
                  <div
                    key={option.id}
                    className="flex items-start gap-3 relative"
                  >
                    <RadioGroupItem
                      value={option.id.toString()}
                      id={option.id.toString()}
                    />

                    <Label
                      htmlFor={option.id.toString()}
                      className="flex-1 cursor-pointer rounded-md font-semibold text-xl text-primary flex items-center gap-2"
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

                      {shownAnswers[currentQuestion.id] &&
                        Number(option.is_correct) === 1 && (
                          <CheckCircle className="text-green-600 w-6 h-6" />
                        )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

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
                className="flex items-center gap-2 text-white bg-primary-500 hover:bg-primary-400 h-12 md:w-auto w-full"
              >
                {currentQuestionIndex < examData.questions_count - 1 ? (
                  <>
                    السؤال التالي
                    <ChevronLeft className="w-6 h-6" />
                  </>
                ) : (
                  <>
                    إنهاء الامتحان
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
