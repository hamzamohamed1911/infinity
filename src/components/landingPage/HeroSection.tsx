"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Academy } from "@/lib/types/landing";
import Counter from "@/lib/utils/Counter";

const HeroSection = ({ hero }: { hero: Academy }) => {
  return (
    <section className="bg-landing-secondary min-h-screen" id="home">
      <div className="flex flex-col md:flex-row-reverse items-center justify-center   pt-20 w-full  max-w-[90%] mx-auto">
        <motion.div
          className="md:w-1/2 mt-8 md:mt-0"
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 1, delay: 0.4 },
            scale: { duration: 1, delay: 0.4 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Image
            src={hero.logo}
            alt="المدرس"
            width={550}
            height={550}
            className="rounded-full  mx-auto"
          />
        </motion.div>
        <motion.div
          className="md:w-1/2 text-center md:text-right flex flex-col gap-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl  font-bold mb-4">
            {hero.web_config?.hero?.title}
          </h1>
          <p className="text-lg md:text-xl  mb-6 !leading-8">
            {hero.web_config?.hero?.desc}
          </p>
          <div className="w-full flex md:justify-start justify-center">
            <Link
              href="/my-classes"
              className="rounded-lg bg-white text-landing-secondary md:w-72 w-64 h-[9vh]  flex justify-center items-center hover:bg-transparent hover:border-white hover:border hover:text-white transition-colors duration-500"
            >
              اشترك دلوقتى !
            </Link>
          </div>
          <div className="w-full flex md:justify-start justify-center lg:gap-12 md:gap-8 gap-6 mt-auto my-4">
            {/* Courses Count */}
            <div className="flex flex-col ">
              <span className=" lg:text-5xl md:text-4xl text-3xl font-bold">
                <Counter
                  to={Number(hero.web_config?.hero?.courses_count) || 0}
                />
                +
              </span>
              <span className="text-lg  mt-1">عدد الكورسات</span>
            </div>

            {/* Students Count */}
            <div className="flex flex-col ">
              <span className=" lg:text-5xl md:text-4xl text-3xl font-bold">
                <Counter
                  to={Number(hero.web_config?.hero?.students_count) || 0}
                />
                +
              </span>

              <span className="text-lg  mt-1 text-start">عدد الطلاب</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
