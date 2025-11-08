"use client";

import { TopStudent } from "@/lib/types/landing";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

// placeholder import
import { placeholder } from "../../../public";

const TopStudents = ({ data }: { data: TopStudent[] }) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <section className="py-16 max-w-[90%] mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9 }}
        className="text-center text-4xl sm:text-5xl font-extrabold mb-12 text-black"
      >
        الطلاب الأوائل
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {data.map((student, idx) => (
          <motion.div
            key={student.id}
            variants={cardVariants}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <Card
              dir="rtl"
              className="rounded-2xl overflow-hidden border h-[430px] border-landing-primary/10 shadow-sm bg-white"
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
        ))}
      </motion.div>
    </section>
  );
};

export default TopStudents;
