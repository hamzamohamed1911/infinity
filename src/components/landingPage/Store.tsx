import { Card } from "@/components/ui/card";
import Image from "next/image";
import { placeholder } from "../../../public";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";

const dummyCourses = [
  {
    id: 1,
    title: "كورس المراجعة الخامسة",
    description: "شرح شامل لمنهج أولى ثانوي مع تدريبات تفاعلية وقطع ترجمة.",
    price: 200,
    image: placeholder,
  },
  {
    id: 2,
    title: "كورس المراجعة الولى",
    description:
      "شرح قواعد واستيعاب المقروء لمنهج تانية ثانوي بالتفصيل مع تدريبات.",
    price: 100,
    image: placeholder,
  },
  {
    id: 3,
    title: "كورس المراجعة التالته",
    description:
      "مراجعة نهائية لمنهج الإنجليزي لتالتة ثانوي مع تدريبات على أسئلة الامتحانات.",
    price: 500,

    image: placeholder,
  },
  {
    id: 4,
    title: "الإنجليزي -  اعدادى",
    description: "شرح مبسط لمنهج اللغة الإنجليزية للإعدادي مع تدريبات تفاعلية.",
    price: 1000,
    image: placeholder,
  },
  {
    id: 5,
    title: "كورس المراجعة الخامسة",
    description: "شرح شامل لمنهج أولى ثانوي مع تدريبات تفاعلية وقطع ترجمة.",
    price: 200,
    image: placeholder,
  },
  {
    id: 6,
    title: "كورس المراجعة الولى",
    description:
      "شرح قواعد واستيعاب المقروء لمنهج تانية ثانوي بالتفصيل مع تدريبات.",
    price: 100,
    image: placeholder,
  },
  {
    id: 7,
    title: "كورس المراجعة التالته",
    description:
      "مراجعة نهائية لمنهج الإنجليزي لتالتة ثانوي مع تدريبات على أسئلة الامتحانات.",
    price: 500,

    image: placeholder,
  },
  {
    id: 8,
    title: "الإنجليزي -  اعدادى",
    description: "شرح مبسط لمنهج اللغة الإنجليزية للإعدادي مع تدريبات تفاعلية.",
    price: 1000,
    image: placeholder,
  },
];

const Store = () => {
  return (
    <section id="courses" className="py-16 px-6 md:px-12 ">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary">
        المتجر
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
            <div
              className="absolute bottom-0 left-0 w-full h-1/2 bg-black/70 
    translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
    transition-all duration-500 ease-in-out p-4 text-white flex flex-col justify-end"
            >
              <div className="text-center">
                <h3 className="text-lg font-bold mb-1">{course.title}</h3>
                <p className="text-sm mb-2">{course.description}</p>
                <p className="text-md font-semibold mb-4 text-white">
                  {course.price} جنيه
                </p>
              </div>

              <div className="flex gap-2 justify-center items-center w-full group/card">
                <Button className="text-white w-full md:h-12 h-10 shadow-md text-xl transition-all duration-300 group-hover/card:bg-primary-400 group-hover/card:shadow-lg">
                  اشترك الآن
                </Button>
                <Button className="bg-primary w-12 h-12 text-white shadow-md transition-all duration-300 group-hover/card:bg-primary-400 group-hover/card:shadow-lg flex items-center justify-center">
                  <ShoppingBag size={28} className="md:size-10 size-8" />
                </Button>
              </div>
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

export default Store;
