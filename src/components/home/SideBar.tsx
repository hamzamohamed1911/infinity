"use client";

import { MdOndemandVideo } from "react-icons/md";
import { FaAward } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { RiBookMarkedLine } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import { BiBookContent } from "react-icons/bi";
import { TbBellSchool } from "react-icons/tb";
import { LuBook } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";

import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";

import { useSidebar } from "@/lib/context/SidebarContext";

const SideBar = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const { isSidebarOpen, closeSidebar } = useSidebar();

  const SideBarItems = [
    {
      href: `/my-purchases/${id}`,
      label: "الرئيسية",
      icon: <AiOutlineHome className="text-2xl" />,
    },
    {
      href: `/my-purchases/${id}/courses`,
      label: "كورسات",
      icon: <FaAward className="text-2xl" />,
    },
    {
      href: `/my-purchases/${id}/units`,
      label: "الوحدات",
      icon: <RiBookMarkedLine className="text-2xl" />,
    },
    {
      href: `/my-purchases/${id}/lessons`,
      label: "الدروس",
      icon: <MdOndemandVideo className="text-2xl" />,
    },
    {
      href: `/my-purchases/${id}/exams`,
      label: "إمتحانات",
      icon: <MdEditNote className="text-2xl" />,
    },
    {
      href: `/my-purchases/${id}/homeworks`,
      label: "واجبات",
      icon: <BiBookContent className="text-2xl" />,
    },
    {
      href: `/my-purchases/${id}/live`,
      label: "لايف",
      icon: <TbBellSchool className="text-2xl" />,
    },
    {
      href: `/my-purchases/${id}/forum`,
      label: "منتدى",
      icon: <FiUsers className="text-2xl" />,
    },
    {
      href: `/books`,
      label: "كتب",
      icon: <LuBook className="text-2xl" />,
    },
  ];

  const currentRouteLabel =
    SideBarItems.find((item) => item.href === pathname)?.label || "غير معروف";

  return (
    <>
      {/* Desktop Sidebar ثابت */}
      <aside className="hidden lg:block md:w-72 shrink-0 border-[1px] border-[#E8E8E8] bg-white my-8 rounded-2xl overflow-auto ">
        {SideBarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 my-5 rounded-md text-xl font-medium transition-colors ${
              pathname === item.href
                ? "bg-secondary-500 text-white my-5 ps-2 h-[68px]"
                : "transition-all duration-600 hover:text-white hover:bg-secondary-500 ps-4 hover:ps-2 h-[56px] hover:h-[68px] hover:text-2xl text-neural-800"
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
                    ? "bg-secondary-900 text-white my-3 ps-2 h-[68px]"
                    : "transition-all duration-600 hover:text-white hover:bg-secondary-900 ps-4 hover:ps-2 h-[56px] hover:h-[68px] hover:text-2xl text-neural-800"
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

export default SideBar;
