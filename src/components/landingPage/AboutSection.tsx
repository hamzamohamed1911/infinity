"use client";

import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-16 px-6 md:px-12 text-center bg-[#831AD3]/10"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        عن فضاء التعليم
      </motion.h2>
      <motion.p
        className="text-lg text-white max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        فضاء التعليم هو بوابتك إلى تعليم نجمي. يقدم مدرسونا الخبراء دروسًا
        مخصصة، لمساعدتك على استكشاف عالم المعرفة بسهولة وثقة.
      </motion.p>
    </section>
  );
};

export default AboutSection;
