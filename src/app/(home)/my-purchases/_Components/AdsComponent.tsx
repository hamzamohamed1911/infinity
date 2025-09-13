"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";

const AdsComponent = ({ adsData }: { adsData: ads[] }) => {
  return (
    <div className=" w-full container mx-auto  justify-center items-center p-4">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
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
