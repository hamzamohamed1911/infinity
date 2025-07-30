import Image from "next/image";
import {  placeholder } from "../../../../public";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import { Suspense } from "react";
import CardSkeleton from "@/components/CardSkeleton";
import { GetClassesData } from "@/lib/apis/profile.api";
import { fetchTeachers } from "../../api/register";
import StartCourseButton from "@/components/StartCourseButton";
import AuthNavBar from "@/app/(auth)/_authComponent/AuthNavBar";
import NoDataMessage from "@/components/NoDataMessage";
// import { DialogTrigger } from "@radix-ui/react-dialog";

async function MyClassesContent() {
  const teachersResponse = await fetchTeachers();
  const teachers = teachersResponse?.data || [];
  const actualTeacher = teachers.length === 1 ? teachers[0].id : undefined;
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
            <h2 className="text-secondary lg:text-3xl md:text-2xl text-xl font-[500]">
              صفوف انت منضم إليها
            </h2>
            {(!ClassesData || ClassesData.length === 0) && (
              <NoDataMessage text="لا توجد صفوف متاحة حاليًا." />
            )}
            <div className="my-6 xl:gap-8 md:gap-6 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  sm:px-0 w-full">
              {ClassesData?.map((course) => (
                <div
                  key={course.id}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white "
                >
                  <div className="relative h-80 w-full overflow-hidden bg-cyan-400">
                    <Image
                      src={course?.image || course.thumbnail || placeholder}
                      alt={course.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <h3 className="mb-2 text-xl font-bold">{course.name}</h3>
                    {course?.description && (
                      <p className="text-md text-secondary truncate">
                        <strong>{course?.description}</strong>
                      </p>
                    )}

                    <StartCourseButton courseId={course.id} />

                    {/* <div className="mt-3 w-full flex items-center justify-center gap-1 text-lg text-primary hover:text-primarydark underline ">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button>إلغاء الإنضمام</button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] no-close-icon no-x ">
                          <DialogHeader className="!text-start text-secondary flex flex-col gap-4">
                            <DialogTitle>خد بالك!</DialogTitle>
                            <DialogDescription className="text-xl">
                              هل أنت متأكد من إلغاء الانضمام؟
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="flex flex-row gap-4 w-full">
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                className="border-primary text-primary w-full"
                              >
                                العودة
                              </Button>
                            </DialogClose>

                            <Button className="bg-primary text-white w-full">
                              إلغاء الإنضمام
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div> */}
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
      <AuthNavBar />
      <MyClassesContent />
    </Suspense>
  );
}
