"use client";

import { TopStudent } from "@/lib/types/landing";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { placeholder } from "../../../public";

const TopStudents = ({ data }: { data: TopStudent[] }) => {
  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-bold  text-center text-primary mb-12">
        الطلاب الأوائل
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((student, idx) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            viewport={{ once: true }}
          >
            <Card className="rounded-2xl overflow-hidden  border border-primary/10  transition-all ">
              <div className="relative w-full h-56">
                <Image
                  src={
                    `https://cdn.infinityacademy.app/${student.image}` ||
                    placeholder
                  }
                  alt={student.name}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full shadow-md">
                  الدرجة: {student.grade}%
                </span>
              </div>
              <CardContent className="p-6 flex flex-col gap-3">
                <h3 className="text-xl font-bold text-primary-800">
                  {student.name}
                </h3>
                <p className="text-sm text-secondary leading-relaxed line-clamp-3">
                  {student.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopStudents;
