"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Video,
  PenTool,
  Clock,
  CheckSquare,
  Layers,
  RefreshCw,
  Users,
} from "lucide-react";

const items = [
  { text: "شرح بسيط ومفهوم", icon: <BookOpen size={28} /> },
  { text: "فيديوهات برسومات توضيحية", icon: <Video size={28} /> },
  { text: "تمارين تفاعلية على الدروس", icon: <PenTool size={28} /> },
  { text: "مرونة كاملة في المذاكرة", icon: <Clock size={28} /> },
  { text: "اختبارات مستمرة", icon: <CheckSquare size={28} /> },
  { text: "محتوى متكامل ومنظم", icon: <Layers size={28} /> },
  { text: "تحديث مستمر حسب المنهج", icon: <RefreshCw size={28} /> },
  { text: "مجتمع طلابي ضخم", icon: <Users size={28} /> },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const WhyChooseUs = () => {
  return (
    <div className="container mx-auto py-16 max-w-[90%]">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9 }}
        className="text-center text-4xl sm:text-5xl font-extrabold mb-12 text-black"
      >
        ليه تشترك معانا؟
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-landing-secondary min-h-[30vh] text-white rounded-xl p-6 text-center font-medium flex flex-col items-start justify-between gap-4 shadow-lg hover:shadow-2xl transition-shadow"
          >
            <div className="flex justify-between items-start gap-3 w-full">
              <div className="text-white text-3xl font-bold w-8 h-8 rounded-full flex items-center justify-center ">
                {index + 1}
              </div>
              <div>{item.icon}</div>
            </div>
            <p className="mt-2 font-semibold   text-2xl max-w-40 !leading-normal">
              {item.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WhyChooseUs;
