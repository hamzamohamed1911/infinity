"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
const AdsComponent = ({ adsData }: { adsData: ads[] }) => {
  return (
    <div className=" w-full container mx-auto  justify-center items-center p-4">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1000}
      >
        {adsData.map((ad) => (
          <SwiperSlide key={ad.id}>
            <a href={ad.link} target="_blank" rel="noopener noreferrer">
              <Image
                src={ad.file}
                alt={`Ad ${ad.id}`}
                width={300}
                height={300}
                className="rounded-2xl w-full object-cover h-[250px]"
                priority
                quality={100}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdsComponent;
