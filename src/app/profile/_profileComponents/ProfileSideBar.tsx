"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { RiBookMarkedLine } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import { BiBookContent } from "react-icons/bi";
import { useSidebar } from "@/lib/context/SidebarContext";
import { FaArrowLeft } from "react-icons/fa6";
import { Receipt } from "lucide-react";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";

const ProfileSideBar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, closeSidebar } = useSidebar();

  const SideBarItems = [
    {
      href: "/profile",
      label: "الملف الشخصى",
      icon: <AiOutlineHome className="text-2xl" />,
    },
    {
      href: "/profile/view-details",
      label: "تفاصيل المشاهدات",
      icon: <RiBookMarkedLine className="text-2xl" />,
    },
    {
      href: "/profile/exams",
      label: "إمتحانات",
      icon: <MdEditNote className="text-2xl" />,
    },
    {
      href: "/profile/homeworks",
      label: "واجبات",
      icon: <BiBookContent className="text-2xl" />,
    },
    {
      href: "/profile/invoices",
      label: "الفواتير",
      icon: <Receipt className="text-2xl" />,
    },
  ];
  const currentRouteLabel =
    SideBarItems.find((item) => item.href === pathname)?.label || "غير معروف";
  return (
    <>
      <aside className="hidden lg:block md:w-72 shrink-0 border-[1px] border-[#E8E8E8] bg-white my-8 rounded-2xl overflow-auto ">
        {SideBarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 my-5 rounded-md text-xl font-medium transition-colors ${
              pathname === item.href
                ? "bg-secondary-700 text-white my-5 ps-2 h-[68px]"
                : "transition-all duration-600 hover:text-white hover:bg-secondary-700 ps-4 hover:ps-2 h-[56px] hover:h-[68px] hover:text-2xl text-neural-800"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </aside>

      {/* Mobile Sidebar بالـ Sheet */}
      <Sheet open={isSidebarOpen} onOpenChange={closeSidebar}>
        <SheetContent side="left" className="p-0 w-full bg-backgroundColor ">
          <SheetHeader className="bg-white h-16 flex justify-between items-center px-4 text-primary w-full">
            <p className="text-lg font-bold ">{currentRouteLabel}</p>
            <button onClick={closeSidebar}>
              <FaArrowLeft size={22} />
            </button>
          </SheetHeader>

          {/* Sidebar content */}
          <div className="overflow-auto h-full  pb-36">
            {SideBarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={`flex items-center gap-2 my-3 rounded-md text-lg font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-secondary-700 text-white my-3 ps-2 h-[68px]"
                    : "transition-all duration-600 hover:text-white hover:bg-secondary-700 ps-4 hover:ps-2 h-[56px] hover:h-[68px] hover:text-2xl text-neural-800"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileSideBar;
