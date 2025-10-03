"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { placeholder } from "../../../public";
import { Button } from "../ui/button";

const Classes = ({ data }: { data: CourseDetails[] }) => {
  return (
    <section id="courses" className="py-16  ">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary">
        الدورات التدريبية
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((cls) => (
          <Card
            key={cls.id}
            className="overflow-hidden text-right bg-white rounded-2xl group relative cursor-pointer"
          >
            {/* الصورة */}
            <div className="w-full h-96 relative">
              <Image
                src={cls.image || cls.thumbnail || placeholder}
                alt={cls.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* المحتوى يظهر عند الـ hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-center items-center text-center text-white">
              <h3 className="text-lg font-bold mb-2">{cls.name}</h3>
              <p className="text-sm mb-4 line-clamp-6">{cls.description}</p>
              <Button className="text-white w-full hover:bg-primary-400 md:h-12 h-10 shadow-md  hover:shadow-lg text-xl">
                عرض الدورة
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Classes;
