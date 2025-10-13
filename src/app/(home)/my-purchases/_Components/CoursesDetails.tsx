import { placeholder } from "../../../../../public";
import { GetCourse } from "@/lib/apis/course.api";
import Image, { StaticImageData } from "next/image";
import Ads from "./Ads";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

const CoursesDetails = async ({ id }: { id: string }) => {
  const course = await GetCourse({ course_id: id });
  const courseData = course && "data" in course ? course.data : undefined;
  const imageSrc: string | StaticImageData = courseData?.image || placeholder;

  return (
    <div className="flex flex-col gap-6 my-6 w-full">
      <div className="flex items-center gap-2 text-neural-800 text-sm md:text-base">
        <Link
          href="/my-classes"
          className="hover:underline flex items-center gap-1"
        >
          الدورات التدريبية
          <MdChevronRight className="text-neural-500" />
        </Link>

        <span className="font-bold md:text-lg text-base">
          {courseData?.name}
        </span>
      </div>

      <Ads />
      <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center gap-4 2xl:min-h-72  min-h-60">
        <div className="flex flex-col gap-4">
          <h2 className="text-neural-1000 text-xl font-semibold">
            {courseData?.name}
          </h2>
          <p className="text-neural-800 text-lg">
            {courseData?.description || "لا توجد بيانات"}
          </p>
        </div>
        <div className=" w-full h-full relative 2xl:min-h-72  min-h-60">
          <Image
            alt={courseData?.name || "صورة الكورس"}
            src={imageSrc}
            fill
            className="object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CoursesDetails;
