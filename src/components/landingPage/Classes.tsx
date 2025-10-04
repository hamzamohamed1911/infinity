"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { placeholder } from "../../../public";
import { Button } from "../ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Badge } from "../ui/badge";

const Classes = ({ data }: { data: CourseDetails[] }) => {
  return (
    <section id="courses" className="py-16 relative">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary">
        الدورات التدريبية
      </h2>

      <div dir="ltr" className="relative max-w-7xl mx-auto">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          loop={true}
          watchOverflow={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          onSlideChange={(swiper) => {
            setTimeout(() => {
              swiper.navigation.update();
            });
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="relative"
        >
          {data.map((course) => (
            <SwiperSlide key={course.id}>
              <Card className="overflow-hidden text-right bg-white rounded-2xl group relative cursor-pointer h-full">
                <div className="w-full h-72 relative">
                  <Image
                    src={course.image || course.thumbnail || placeholder}
                    alt={course.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {course.price > 0 && (
                    <Badge className="absolute top-3 left-3 bg-primary text-white text-sm px-3 py-1 rounded-md shadow-md">
                      {course.price} ج.م
                    </Badge>
                  )}
                </div>

                {/* Overlay */}
                <div className="absolute justify-evenly inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col items-center text-center text-white">
                  <h3 className="text-lg font-bold mb-2">{course.name}</h3>
                  <p className="text-sm mb-4 line-clamp-4">
                    {course.description}
                  </p>
                  <Button className="w-full bg-primary-600 hover:bg-primary-500 text-white hover:shadow-lg lg:h-14 h-12 shadow-md lg:text-xl rounded-md transition-colors text-lg font-semibold disabled:opacity-50">
                    عرض الدورة
                  </Button>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 👇 أزرار الـ Navigation */}
        <div className="swiper-button-next !text-primary !w-10 !h-10 after:!text-4xl"></div>
        <div className="swiper-button-prev !text-primary !w-10 !h-10 after:!text-4xl"></div>
      </div>
    </section>
  );
};

export default Classes;
