/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SubscriptionDialog from "./subscriptionDialog";
import { useTheme } from "@/context/theme-context";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ChangeSystemDialog from "@/app/profile/_profileComponents/ChangeSystemDialog";
import ChangeOnlineDialog from "@/app/profile/_profileComponents/ChangeOnlineDialog";

export default function Subscription({
  teachers,
  profileData,
}: {
  teachers: Teacher[];
  profileData: UserProfile;
}) {
  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const theme = useTheme();

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
        <div className="max-w-3xl mx-auto">
          <div className="w-full  mx-auto mb-6">
            <div className=" text-primary rounded-lg p-6  flex items-center gap-4">
              {/* أيقونة ترحيب */}

              <div>
                <h2 className="text-2xl font-bold mb-1">مرحباً بكِ 👋</h2>
                <p className="text-lg font-medium">{theme.WelcomeMsg}</p>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col justify-center lg:gap-8 md:gap-6 gap-4 items-center">
            <div
              key={teacher.id}
              className="p-4  rounded-3xl border  bg-gray-50 flex flex-col items-center text-center gap-4 w-full md:max-w-xs max-w-full"
            >
              <div className="relative w-48 h-48 overflow-hidden rounded-full">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="md:text-3xl text-2xl text-primary-500 font-bold">
                  نظام الاونلاين
                </h2>
                <p className="font-medium">خاص بطلاب الاونلاين</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="text-white w-full md:h-12 h-10 shadow-md text-xl transition-all duration-300 group-hover/card:bg-primary-400 group-hover/card:shadow-lg">
                    انضم الآن
                  </Button>
                </DialogTrigger>
                <ChangeSystemDialog />
              </Dialog>
            </div>
            <div
              key={teacher.id}
              className="p-4  border rounded-3xl bg-gray-50  flex flex-col items-center text-center gap-4 w-full md:max-w-xs max-w-full"
            >
              <div className="relative w-48 h-48 overflow-hidden rounded-full">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="md:text-3xl text-2xl  text-primary-500 font-bold">
                  نظام السنتر
                </h2>
                <p className="font-medium">خاص بطلاب السنتر</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="text-white w-full md:h-12 h-10 shadow-md text-xl transition-all duration-300 group-hover/card:bg-primary-400 group-hover/card:shadow-lg">
                    انضم الآن
                  </Button>
                </DialogTrigger>
                <ChangeOnlineDialog />
              </Dialog>
            </div>
          </div>
        </div>
      </>
    );
  }

  // أكتر من مدرس
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="w-full  mb-6">
          <div className=" text-primary rounded-lg p-6  flex items-center gap-4">
            {/* أيقونة ترحيب */}

            <div>
              <h2 className="text-2xl font-bold mb-1">مرحباً بكِ 👋</h2>
              <p className="text-lg font-medium">{theme.WelcomeMsg}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div key={teacher.id}>
              <div className="flex justify-center gap-8">
                <div
                  key={teacher.id}
                  className="p-4  rounded-3xl border  bg-gray-50 flex flex-col items-center text-center gap-4 w-full max-w-xs"
                >
                  <div className="relative w-48 h-48 overflow-hidden rounded-full">
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="md:text-3xl text-2xl text-primary-500 font-bold">
                      نظام الاونلاين
                    </h2>
                    <p className="font-medium">خاص بطلاب الاونلاين</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="text-white w-full md:h-12 h-10 shadow-md text-xl transition-all duration-300 group-hover/card:bg-primary-400 group-hover/card:shadow-lg">
                        انضم الآن
                      </Button>
                    </DialogTrigger>
                    <ChangeSystemDialog />
                  </Dialog>
                </div>
                <div
                  key={teacher.id}
                  className="p-4  border rounded-3xl bg-gray-50  flex flex-col items-center text-center gap-4 w-full max-w-xs"
                >
                  <div className="relative w-48 h-48 overflow-hidden rounded-full">
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="md:text-3xl text-2xl  text-primary-500 font-bold">
                      نظام السنتر
                    </h2>
                    <p className="font-medium">خاص بطلاب السنتر</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="text-white w-full md:h-12 h-10 shadow-md text-xl transition-all duration-300 group-hover/card:bg-primary-400 group-hover/card:shadow-lg">
                        انضم الآن
                      </Button>
                    </DialogTrigger>
                    <ChangeOnlineDialog />
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
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
