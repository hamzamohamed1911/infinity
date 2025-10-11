"use client";

import Link from "next/link";
import Image from "next/image";

import { IoGridOutline } from "react-icons/io5";
import { BiStore } from "react-icons/bi";
import { GrHelpBook } from "react-icons/gr";
import { usePathname } from "next/navigation";

import { RxHamburgerMenu } from "react-icons/rx";
import { useSidebar } from "@/lib/context/SidebarContext";

import { useTheme } from "@/context/theme-context";
import Search from "./Search";
import ProfileNavBar from "./ProfileNavBar";

const Navbar = ({
  id,
  showMenuButton = true,
}: {
  id: string;
  showMenuButton?: boolean;
}) => {
  const { logo } = useTheme();

  const pathname = usePathname();

  const { toggleSidebar } = useSidebar();

  const navItems = [
    {
      href: `/my-purchases/${id}`,
      label: "مشترياتي",
      icon: <IoGridOutline className="h-6 w-6" />,
    },
    {
      href: `/store/${id}`,
      label: "المتجر",
      icon: <BiStore className="h-6 w-6" />,
    },
    {
      href: "/questions-bank",
      label: "بنك الاسئلة",
      icon: <GrHelpBook className="h-6 w-6" />,
    },
  ];

  return (
    <>
      <nav className="bg-primary-700  shadow-md top-0 z-50">
        <div className="xl:max-w-[90%] container max-w-full mx-auto md:px-4 px-2 lg:px-6 xl:px-8">
          <div className="flex justify-between h-20 lg:gap-6 md:gap-4 gap-2">
            {showMenuButton && (
              <button
                className="md:hidden flex items-center text-white text-2xl"
                onClick={toggleSidebar}
              >
                <RxHamburgerMenu />
              </button>
            )}
            {/* User Profile */}
            <ProfileNavBar />
            {/* Navigation Links */}
            <div className="lg:flex hidden items-center gap-4">
              {navItems.map((item) => {
                const isActive = item.href.startsWith("/my-purchases")
                  ? pathname.startsWith("/my-purchases")
                  : item.href.startsWith("/store")
                  ? pathname.startsWith("/store")
                  : pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 px-3 h-12 justify-center rounded-md text-md font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? "bg-white text-primary"
                        : "hover:bg-white hover:text-primary text-white"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </div>
            {/* Search */}
            <Search />

            {/* Logo */}
            <div className="flex items-center shrink-0">
              <Link href="/">
                <Image
                  src={logo}
                  alt="شعار"
                  width={50}
                  height={50}
                  className="w-auto h-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
