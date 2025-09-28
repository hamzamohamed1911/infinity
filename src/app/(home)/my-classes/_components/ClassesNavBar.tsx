"use client";

import ProfileNavBar from "@/components/home/ProfileNavBar";
import { useTheme } from "@/context/theme-context";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const ClassesNavBar = () => {
  const { logo } = useTheme();
  const { data: session } = useSession();
  const token = session?.user?.token;

  return (
    <nav className="bg-primary-700">
      <div className="xl:max-w-[90%] container max-w-full mx-auto  h-20 w-full flex justify-center items-center ">
        <div className="container mx-auto flex justify-between p-4">
          {token && <ProfileNavBar />}
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

export default ClassesNavBar;
