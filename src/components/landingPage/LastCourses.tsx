"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { placeholder } from "../../../public";
import { Button } from "../ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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
  {
    id: 5,
    title: "الإنجليزي - أولى ثانوي",
    description: "شرح شامل لمنهج أولى ثانوي مع تدريبات تفاعلية وقطع ترجمة.",
    image: placeholder,
  },
  {
    id: 6,
    title: "الإنجليزي - تانيه ثانوي",
    description:
      "شرح قواعد واستيعاب المقروء لمنهج تانية ثانوي بالتفصيل مع تدريبات.",
    image: placeholder,
  },
  {
    id: 7,
    title: "الإنجليزي - تالتة ثانوي",
    description:
      "مراجعة نهائية لمنهج الإنجليزي لتالتة ثانوي مع تدريبات على أسئلة الامتحانات.",
    image: placeholder,
  },
  {
    id: 8,
    title: "الإنجليزي -  اعدادى",
    description: "شرح مبسط لمنهج اللغة الإنجليزية للإعدادي مع تدريبات تفاعلية.",
    image: placeholder,
  },
];

const LastCourses = () => {
  return (
    <section id="courses" className="py-16 px-6 md:px-12 ">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary">
        اخر الكورسات
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        dir="rtl"
        className="max-w-7xl mx-auto"
      >
        {dummyCourses.map((course) => (
          <SwiperSlide key={course.id}>
            <Card className="overflow-hidden text-right bg-white rounded-2xl group relative cursor-pointer h-full">
              <div className="w-full h-72 relative">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-center items-center text-center text-white">
                <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                <p className="text-sm mb-4">{course.description}</p>
                <Button className="text-white w-full hover:bg-primary-400 md:h-12 h-10 shadow-md hover:shadow-lg text-xl">
                  عرض الكورس
                </Button>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default LastCourses;
