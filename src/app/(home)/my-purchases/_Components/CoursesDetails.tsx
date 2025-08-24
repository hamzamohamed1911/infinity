import { placeholder } from "../../../../../public";
import { GetProfileData } from "@/lib/apis/profile.api";
import { GetCourse } from "@/lib/apis/course.api";
import Image, { StaticImageData } from "next/image";
import Ads from "./Ads";

const CoursesDetails = async ({ id }: { id: string }) => {
  const Profile = await GetProfileData();
  const profileData =
    Profile && "data" in Profile ? Profile?.data?.profile : undefined;
  const course = await GetCourse({ course_id: id });
  const courseData = course && "data" in course ? course.data : undefined;
  const imageSrc: string | StaticImageData = courseData?.image || placeholder;

  return (
    <div className="flex flex-col gap-6 my-6">
      <h1 className="font-bold lg:text-3xl text-2xl text-[#606060] ">
        {profileData?.classroom_name}
      </h1>
      <Ads />
      <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center gap-4 2xl:min-h-72  min-h-60">
        <div className="flex flex-col gap-4">
          <h2 className="text-[#333333] text-xl font-semibold">
            {courseData?.name}
          </h2>
          <p className="text-[#606060] text-lg">
            {courseData?.description || "لا توجد بيانات"}
          </p>
        </div>
        <div className=" w-full h-full relative 2xl:min-h-72  min-h-60">
          <Image
            alt={courseData?.name || "صورة الكورس"}
            src={imageSrc}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CoursesDetails;
