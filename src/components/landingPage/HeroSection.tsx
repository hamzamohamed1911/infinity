"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Academy } from "@/lib/types/landing";

const HeroSection = ({ hero }: { hero: Academy }) => {
  return (
    <section
      id="home"
      className="flex flex-col md:flex-row-reverse items-center justify-center min-h-screen px-6 md:px-12 pt-20 bg-[#831AD3]/10"
    >
      <motion.div
        className="md:w-1/2 mt-8 md:mt-0"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -10, 0],
          rotate: [0, 2, -2, 0],
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
          className="rounded-full border-4 border-primary mx-auto"
        />
      </motion.div>
      <motion.div
        className="md:w-1/2 text-center md:text-right flex flex-col gap-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {hero.web_config?.hero?.title}
        </h1>
        <p className="text-xl md:text-2xl text-white mb-6 leading-10">
          {hero.web_config?.hero?.desc}
        </p>
        <div className="w-full flex md:justify-start justify-center">
          <Link
            href="/my-courses"
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
              ابدأ الآن
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
