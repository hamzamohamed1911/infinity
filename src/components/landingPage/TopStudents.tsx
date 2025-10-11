"use client";

import { TopStudent } from "@/lib/types/landing";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// placeholder import
import { placeholder } from "../../../public";

const TopStudents = ({ data }: { data: TopStudent[] }) => {
  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-landing-primary mb-12 relative">
        الطلاب الأوائل
      </h2>
      <div className="relative max-w-7xl mx-auto" dir="ltr">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => {
            setTimeout(() => {
              swiper.navigation.update();
            });
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {data.map((student, idx) => (
            <SwiperSlide key={student.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
              >
                <Card
                  dir="rtl"
                  className="rounded-2xl overflow-hidden border h-[430px] border-landing-primary/10 shadow-md bg-white"
                >
                  <div className="relative w-full h-72">
                    <Image
                      src={
                        student.image
                          ? `https://cdn.infinityacademy.app/${student.image}`
                          : placeholder
                      }
                      alt={student.name}
                      fill
                      className="object-cover rounded-t-2xl"
                    />
                    {/* البادج */}
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-landing-primary to-landing-primary/80 text-white text-sm md:text-base font-semibold px-4 py-2 rounded-full shadow-lg">
                      الدرجة: {student.grade}%
                    </span>
                  </div>
                  <CardContent className="p-6 flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-landing-primary-900">
                      {student.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {student.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-next !text-landing-primary !w-10 !h-10 after:!text-4xl"></div>
        <div className="swiper-button-prev !text-landing-primary !w-10 !h-10 after:!text-4xl"></div>
      </div>
    </section>
  );
};

export default TopStudents;
