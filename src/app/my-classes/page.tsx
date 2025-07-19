"use client"
import Image from "next/image";
import AuthNavBar from "../(auth)/_authComponent/AuthNavBar";
import { userImage } from "../../../public";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const featuredCourses = [
    {
      id: 1,
      title: "الأول الثانوي",
      date: "15/12/2023",
      isLive: false,
      image: userImage,
    },
    {
      id: 2,
      title: "الأول الثانوي",
      date: "22/12/2023",
      isLive: true,
      hasSupport: true,
      image: userImage,
    },
    {
      id: 3,
      title: "الأول الثانوي",
      date: "22/12/2023",
      isLive: true,
      hasSupport: true,
      image: userImage,
    },
    {
      id: 4,
      title: "الأول الثانوي",
      instructor: "أ. نور الدين",
      date: "22/12/2023",
      isLive: true,
      hasSupport: true,
      image: userImage,
    },
  ];

  const handleOpenModal = (courseId: number) => {
    setSelectedCourseId(courseId);
    setOpen(true);
  };

  const handleCancelJoin = () => {
    console.log(`Cancelling join for course ID: ${selectedCourseId}`);
    setOpen(false);
  };

  return (
    <>
      <AuthNavBar />
      <section>
        <div className="container mx-auto flex w-full p-4">
          <div className="xl:m-8 lg:m-6 md:m-4 m-2  flex flex-col gap-4 w-full">
            <h2 className="text-secondary lg:text-3xl text-2xl font-[500]">
              صفوف انت منضم إليها
            </h2>
            <div className="my-6 xl:gap-8 md:gap-6 gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-4  sm:px-0 w-full">
              {featuredCourses.map((course) => (
                <div
                  key={course.id}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white "
                >
                  <div className="relative h-80 w-full overflow-hidden bg-cyan-400">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <h3 className="mb-2 text-xl font-bold">{course.title}</h3>
                    <p className="text-md text-secondary">
                      منضم من: <strong>{course.date}</strong>
                    </p>

                    <Button className="w-full border border-primary bg-white text-primary hover:bg-primary hover:text-white py-5 text-lg rounded-lg">
                      البدأ
                    </Button>

                    <div className="mt-3 w-full flex items-center justify-center gap-1 text-lg text-primary hover:text-primarydark underline ">
                      <Dialog   open={open && selectedCourseId === course.id} onOpenChange={(isOpen) => setOpen(isOpen)}>
                        <DialogTrigger asChild>
                          <button onClick={() => handleOpenModal(course.id)}>
                            إلغاء الإنضمام
                          </button>
                        </DialogTrigger>
                        <DialogContent    className="sm:max-w-[500px] no-close-icon no-x ">
                          <DialogHeader className="!text-start text-secondary flex flex-col gap-4" >
                            <DialogTitle >خد بالك!</DialogTitle>
                            <DialogDescription className="text-xl" >
                           هل أنت متأكد من إلغاء الانضمام؟
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="flex flex-row gap-4 w-full">
                            <Button
                              variant="outline"
                              className="border-primary text-primary w-full"
                              onClick={() => setOpen(false)}
                            >
                              العودة
                            </Button>
                            <Button
                              className="bg-primary text-white w-full"
                              onClick={handleCancelJoin}
                            >
                              إلغاء الإنضمام
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
};

export default Page;