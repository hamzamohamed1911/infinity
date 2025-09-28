import Image from "next/image";
import { placeholder } from "../../../../public";

import { Suspense } from "react";
import CardSkeleton from "@/components/CardSkeleton";
import { GetClassesData, GetProfileData } from "@/lib/apis/profile.api";
import { fetchTeachers } from "../../api/register";
import StartCourseButton from "@/components/StartCourseButton";
import NoDataMessage from "@/components/NoDataMessage";
import Subscription from "./_components/subscription";
import ClassesNavBar from "./_components/ClassesNavBar";

async function MyClassesContent() {
  const Profile = await GetProfileData();
  const profileData =
    Profile && "data" in Profile ? Profile?.data?.profile : undefined;

  const teachersResponse = await fetchTeachers();
  const teachers = teachersResponse?.data || [];
  const actualTeacher = teachers.length === 1 ? teachers[0].id : undefined;
  if (profileData?.status === "-") {
    return (
      <section className="container mx-auto xl:max-w-[90%] max-w-full flex w-full p-4">
        <div className="lg:m-6 md:m-4 m-2 w-full">
          <Subscription profileData={profileData} teachers={teachers || []} />
        </div>
      </section>
    );
  }
  if (!actualTeacher) {
    return <p className="text-red-500">لا يوجد مدرس محدد.</p>;
  }
  const classes = await GetClassesData({ teacherId: actualTeacher });
  const ClassesData = classes && "data" in classes ? classes.data : undefined;

  return (
    <>
      <section>
        <div className="container mx-auto xl:max-w-[90%] max-w-full flex w-full p-4">
          <div className=" lg:m-6 md:m-4 m-2  flex flex-col gap-4 w-full">
            <h2 className="text-neural-800  lg:text-3xl md:text-2xl text-xl font-[500]">
              الصفوف الدراسيه
            </h2>
            {(!ClassesData || ClassesData.length === 0) && (
              <NoDataMessage text="لا توجد صفوف متاحة حاليًا." />
            )}
            <div className="my-6 xl:gap-8 md:gap-6 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  sm:px-0 w-full">
              {ClassesData?.map((course) => (
                <div
                  key={course.id}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white flex flex-col"
                >
                  {/* الصورة */}
                  <div className="relative h-80 w-full overflow-hidden bg-cyan-400">
                    <Image
                      src={course?.image || course.thumbnail || placeholder}
                      alt={course.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* المحتوى */}
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <h3 className="md:text-lg text-md text-neural-800 font-bold">
                      {course.name}
                    </h3>

                    <div className="mt-auto">
                      <StartCourseButton courseId={course.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function page() {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <ClassesNavBar />
      <MyClassesContent />
    </Suspense>
  );
}
