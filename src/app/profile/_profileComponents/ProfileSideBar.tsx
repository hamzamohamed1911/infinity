"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { RiBookMarkedLine } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import { BiBookContent } from "react-icons/bi";
import { useSidebar } from "@/lib/context/SidebarContext";
import { FaArrowLeft } from "react-icons/fa6";
import { MdInsertChartOutlined } from "react-icons/md";

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
      href: "/profile/dashboard",
      label: "لوحة التحكم",
      icon: <MdInsertChartOutlined className="text-2xl" />,
    },
    {
      href: "/profile/videos",
      label: "الفيديوهات",
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
  ];
  const currentRouteLabel =
    SideBarItems.find((item) => item.href === pathname)?.label || "غير معروف";
  return (
    <aside
      className={`fixed inset-y-0  h-full left-0 md:w-72 w-full overflow-auto border-[1px] border-[#E8E8E8] md:bg-white bg-[#F7F7F8] md:my-8 my-0 md:rounded-2xl rounded-none transition-transform duration-300 ease-in-out z-40 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:block ${
        isSidebarOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white h-16 md:hidden flex justify-between items-center px-4 text-primary">
        <p className="text-xl font-bold ">{currentRouteLabel}</p>
        <button onClick={() => closeSidebar()}>
          <FaArrowLeft size={22} />
        </button>
      </div>
      {/* Sidebar content */}
      {SideBarItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-2 my-5 rounded-md text-xl font-medium transition-colors ${
            pathname === item.href
              ? "bg-[#509319] text-white my-5 ps-2 h-[68px]"
              : "transition-all duration-600 hover:text-white hover:bg-[#509319] ps-4 hover:ps-2 h-[56px] hover:h-[68px] hover:text-2xl text-[#606060]"
          }`}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </aside>
  );
};

export default ProfileSideBar;
