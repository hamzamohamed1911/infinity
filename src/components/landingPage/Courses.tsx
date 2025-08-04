import { Card } from "@/components/ui/card";
import Image from "next/image";
import { placeholder } from "../../../public";
import Link from "next/link";
import { Button } from "../ui/button";

const dummyCourses = [
  {
    id: 1,
    title: "الإنجليزي - أولى ثانوي",
    description: "شرح شامل لمنهج أولى ثانوي مع تدريبات تفاعلية وقطع ترجمة.",
    image: placeholder,
  },
  {
    id: 2,
    title: "الإنجليزي - تانيه ثانوي",
    description:
      "شرح قواعد واستيعاب المقروء لمنهج تانية ثانوي بالتفصيل مع تدريبات.",
    image: placeholder,
  },
  {
    id: 3,
    title: "الإنجليزي - تالتة ثانوي",
    description:
      "مراجعة نهائية لمنهج الإنجليزي لتالتة ثانوي مع تدريبات على أسئلة الامتحانات.",

    image: placeholder,
  },
  {
    id: 4,
    title: "الإنجليزي -  اعدادى",
    description: "شرح مبسط لمنهج اللغة الإنجليزية للإعدادي مع تدريبات تفاعلية.",
    image: placeholder,
  },
];

const Courses = () => {
  return (
    <section id="courses" className="py-16 px-6 md:px-12 bg-[#831AD3]/10">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
        الدورات التدريبية
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dummyCourses.map((course) => (
          <Card
            key={course.id}
            className="overflow-hidden text-right bg-white rounded-2xl group relative cursor-pointer"
          >
            {/* الصورة */}
            <div className="w-full h-96 relative">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* المحتوى يظهر عند الـ hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-center items-center text-center text-white">
              <h3 className="text-lg font-bold mb-2">{course.title}</h3>
              <p className="text-sm mb-4">{course.description}</p>
              <Button className="text-white w-full hover:bg-primary-400 md:h-12 h-10 shadow-md  hover:shadow-lg text-xl">
                عرض الدورة
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8">
        <Link
          href="/my-classes"
          className="btn-link bg-primary-500 rounded-md group "
        >
          <svg
            width="180"
            height="60"
            viewBox="0 0 180 60"
            className="absolute top-0 left-0 w-full h-full border-svg"
          >
            <polyline
              points="179,1 179,59 1,59 1,1 179,1"
              className="stroke-white"
            />
            <polyline
              points="179,1 179,59 1,59 1,1 179,1"
              className="stroke-white"
            />
          </svg>
          <span className="relative z-10 text-white text-lg font-medium">
            عرض المزيد
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Courses;
