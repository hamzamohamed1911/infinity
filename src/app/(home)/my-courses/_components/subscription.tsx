/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SubscriptionDialog from "./subscriptionDialog";

export default function Subscription({
  teachers,
  profileData,
}: {
  teachers: Teacher[];
  profileData: UserProfile;
}) {
  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const handleSubscribeClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setOpen(true);
  };

  if (!teachers || teachers.length === 0) {
    return <p className="text-red-500">لا يوجد بيانات للمدرسين.</p>;
  }

  // مدرس واحد بس
  if (teachers.length === 1) {
    const teacher = teachers[0];
    return (
      <>
        <div className="flex justify-center">
          <div
            key={teacher.id}
            className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col items-center text-center gap-4 w-full max-w-sm"
          >
            <div className="relative w-28 h-28 overflow-hidden rounded-full">
              <Image
                src={teacher.image}
                alt={teacher.name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-xl text-primary-500 font-bold">
                {teacher.name}
              </h2>
            </div>

            <Button
              onClick={() => handleSubscribeClick(teacher)}
              className="text-white w-full md:h-12 h-10 shadow-md text-xl transition-all duration-300 group-hover/card:bg-primary-400 group-hover/card:shadow-lg"
            >
              اشترك الآن
            </Button>
          </div>
        </div>

        <SubscriptionDialog
          open={open}
          onOpenChange={setOpen}
          teacher={selectedTeacher}
        />
      </>
    );
  }

  // أكتر من مدرس
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col items-center text-center gap-4"
          >
            <div className="relative w-24 h-24 overflow-hidden rounded-full">
              <Image
                src={teacher.image}
                alt={teacher.name}
                fill
                className="object-cover"
              />
            </div>

            <h2 className="text-xl text-primary-500 font-bold">
              {teacher.name}
            </h2>
            <Button
              onClick={() => handleSubscribeClick(teacher)}
              className="text-white w-full md:h-12 h-10 shadow-md text-xl transition-all duration-300 group-hover/card:bg-primary-400 group-hover/card:shadow-lg"
            >
              اشترك الآن
            </Button>
          </div>
        ))}
      </div>

      <SubscriptionDialog
        open={open}
        onOpenChange={setOpen}
        teacher={selectedTeacher}
      />
    </>
  );
}
