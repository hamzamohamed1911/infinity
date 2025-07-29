"use client";

import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logo, userImage } from "../../../public";
import { IoGridOutline } from "react-icons/io5";
import { BiStore } from "react-icons/bi";
import { GrHelpBook } from "react-icons/gr";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/actions/auth";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSidebar } from "@/lib/context/SidebarContext";
import { useQuery } from "@tanstack/react-query";
import { GetProfileData } from "@/lib/apis/profile.api";
import { Skeleton } from "../ui/skeleton";

const Navbar = ({id}:{id:string}) => {
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => GetProfileData(),
    
  });

  const profile =
    profileData && "data" in profileData ? profileData.data.profile : undefined;

  const handleLogout = async () => {
    try {
      await logout();
      await signOut({ redirect: false });
      setIsLogoutModalOpen(false);
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطأ غير معروف");
    }
  };

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
      <nav className="bg-primarydark shadow-md top-0 z-50">
        <div className="xl:max-w-[90%] container max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 gap-2">
            <button
              className="sm:hidden flex items-center text-white text-2xl"
              onClick={toggleSidebar}
            >
              <RxHamburgerMenu />
            </button>
            {/* User Profile */}
            {isLoading ? (
              <div className="sm:flex hidden  h-20 gap-2 items-center">
                <Skeleton className="size-10 bg-gray-300 rounded-full animate-pulse" />
              </div>
            ) : (
              <div className="ml-4 sm:ml-6 sm:flex hidden justify-center items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="focus:bg-transparent hover:bg-transparent focus:border-none"
                    asChild
                  >
                    <Button variant="ghost" className="flex items-center gap-4">
                      <Image
                        src={profile?.avatar || userImage}
                        alt="صورة المستخدم"
                        width={32}
                        height={32}
                        className="h-10 w-10 rounded-full"
                      />
                      <span className="text-white text-md flex flex-col gap-1">
                        <p className="text-lg font-medium text-start">
                          {profile?.name || "مستخدم"}
                        </p>
                        <span>
                          نظام :{" "}
                          <span className="text-[#B3EA86] text-lg">
                            {profile?.status === "1"
                              ? "أونلاين"
                              : profile?.status === "2"
                              ? "سنتر"
                              : "غير مشترك"}
                          </span>
                        </span>
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 mt-4">
                    <DropdownMenuLabel className="!text-end">
                      حسابي
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link
                        href="/profile"
                        className="flex items-center justify-evenly w-full"
                      >
                        <FaCog className="h-4 w-4 mr-2" />
                        الملف الشخصي
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => setIsLogoutModalOpen(true)}
                    >
                      <span className="flex items-center justify-evenly w-full">
                        <FaSignOutAlt className="h-4 w-4 mr-2" />
                        تسجيل الخروج
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Navigation Links */}
            <div className="md:flex hidden items-center gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-3 h-12 justify-center rounded-md text-md font-medium transition-colors whitespace-nowrap ${
                    pathname === item.href
                      ? "bg-white text-primarydark"
                      : "hover:bg-white hover:text-primarydark text-white"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
            {/* Search */}
            <div className="flex items-center">
              <div className="relative">
                <Input
                  type="text"
                  className="pe-10 md:w-64 w-auto bg-white focus:ring-none focus:border-none rounded-3xl"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pe-3">
                  <FaSearch
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
            {/* Logo */}
            <div className="flex items-center">
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
      <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <DialogContent className="sm:max-w-sm flex flex-col gap-8 items-center text-center">
          <DialogHeader className="flex flex-col gap-4">
            <DialogTitle className="text-center">
              تأكيد تسجيل الخروج
            </DialogTitle>
            <DialogDescription>
              {error || "هل أنت متأكد أنك تريد تسجيل الخروج؟"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button className="text-white" onClick={handleLogout}>
              تسجيل الخروج
            </Button>
            <Button
              className="border-primary border-2 text-primary hover:bg-primary hover:text-white bg-transparent"
              onClick={() => setIsLogoutModalOpen(false)}
            >
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
