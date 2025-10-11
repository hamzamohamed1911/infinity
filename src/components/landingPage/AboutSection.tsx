"use client";

import { Academy } from "@/lib/types/landing";
import { motion } from "framer-motion";

const AboutSection = ({ data }: { data: Academy }) => {
  console.log(data);
  return (
    <section id="about" className="py-16  text-center ">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-8 !leading-relaxed text-landing-primary"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {data?.web_config?.about?.title}
      </motion.h2>
      <motion.p
        className="text-lg text-landing-primary max-w-2xl mx-auto !leading-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {data?.web_config?.about?.desc}
      </motion.p>
    </section>
  );
};

export default AboutSection;
