"use client";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const DownloadAppSection = () => {
  return (
    <section id="app" className="py-16  ">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-8 text-landing-primary"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        احصل على تطبيقنا
      </motion.h2>
      <div className="flex flex-col md:flex-row-reverse justify-center md:gap-6 gap-2 items-center">
        <Link
          href="https://play.google.com"
          className="bg-black px-6 py-3 hover:bg-black/90 transition-colors duration-700 text-white rounded-md w-72 flex justify-center items-center gap-4"
        >
          <FaGooglePlay size={40} />
          <div className="flex flex-col gap-1 text-end">
            <span className="text-xs">Get it on</span>
            <span className=" text-2xl">Google Play</span>
          </div>
        </Link>

        <Link
          href="https://www.apple.com/app-store/"
          className="bg-black px-6 py-3 hover:bg-black/90 transition-colors duration-700 text-white rounded-md w-72 flex justify-center items-center gap-4"
        >
          <FaApple size={40} />
          <div className="flex flex-col gap-1 text-end">
            <span className="text-xs">Available on the</span>
            <span className=" text-2xl">App Store</span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default DownloadAppSection;
