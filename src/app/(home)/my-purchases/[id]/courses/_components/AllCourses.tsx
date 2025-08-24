import { Card, CardContent } from "@/components/ui/card";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import { placeholder } from "../../../../../../../public";
import Link from "next/link";

const AllCourses = ({ CoursesData }: { CoursesData: Dclasses[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {CoursesData.map((course: Dclasses) => (
        <Card
          key={course.id}
          className="overflow-hidden shadow-none border-none"
        >
          <Image
            src={course.thumbnail || placeholder}
            alt={course.name}
            width={600}
            height={600}
            className="w-full h-80 object-cover"
          />
          <CardContent className="p-2 space-y-3 text-start">
            <h3 className="text-lg font-semibold text-[#606060]">
              {course.name}
            </h3>
            <Link
              href={`/${course.id}`}
              className="group flex items-center justify-center text-lg gap-2 text-primary border-[1px] border-primary hover:bg-primary hover:text-white w-full h-12 rounded-lg transition-all duration-300"
            >
              إبدأ التعلم
              <IoIosArrowBack
                size={25}
                className="transform transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110"
              />
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AllCourses;
