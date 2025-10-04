"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function StartCourseButton({ courseId }: { courseId: string }) {
  const router = useRouter();

  const handleStart = async () => {
    await fetch("/api/set-course-id", {
      method: "POST",
      body: JSON.stringify({ courseId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // بعد ما نحفظه نعمل redirect أو تحديث الصفحة
    router.push(`/my-purchases/${courseId}`);
  };

  return (
    <Button
      onClick={handleStart}
      className="w-full flex justify-center items-center border border-primary bg-white text-primary hover:bg-primary hover:text-white py-5 text-lg rounded-lg transition-all duration-500"
    >
      ابدأ الان
    </Button>
  );
}
