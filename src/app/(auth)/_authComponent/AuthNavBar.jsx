"use client";

import { useTheme } from "@/context/theme-context";
import Image from "next/image";
import Link from "next/link";

const AuthNavBar = () => {
  const { logo } = useTheme();

  return (
    <nav className="bg-primary">
      <div className="xl:max-w-[90%] container max-w-full mx-auto  h-20 w-full flex justify-center items-center ">
        <div className="container mx-auto flex justify-end p-4">
          <Link href="/" className="inline-block">
            <Image
              width={50}
              height={50}
              alt="logo"
              src={logo}
              className="w-auto h-auto"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavBar;
