"use client";

import { useTheme } from "@/context/theme-context";
import Image from "next/image";

const BackgroundImage = () => {
  const theme = useTheme();

  return (
    <div className="w-full lg:col-span-3 col-span-1 h-full">
      <Image
        src={theme.teacherImage}
        alt="Student studying"
        width={500}
        height={300}
        quality={100}
        className=" object-contain w-full h-full"
      />
    </div>
  );
};

export default BackgroundImage;
