"use client";

import { usePathname, useRouter } from "next/navigation";
import { BiBookContent, BiStore } from "react-icons/bi";
import { MdEditNote } from "react-icons/md";
import { IoGridOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaAward } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function BottomNavbar({ id }: { id: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { href: `/my-purchases/${id}`, icon: IoGridOutline, label: "مشترياتى" },
    { href: `/store/${id}`, icon: BiStore, label: "المتجر" },
    { href: `/my-purchases/${id}/courses`, icon: FaAward, label: "كورساتى " },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/my-purchases"))
      return pathname.startsWith("/my-purchases");
    if (href.startsWith("/store")) return pathname.startsWith("/store");
    return pathname === href;
  };

  return (
    <nav className="fixed lg:hidden bottom-0 left-0 right-0 bg-primary-700 shadow-md rounded-lg z-[9999]">
      <div className="flex justify-around items-center py-1 relative">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <a
                href={item.href}
                className={`flex flex-col gap-1 items-center text-xs py-2 ${
                  isActive(item.href)
                    ? "text-primary bg-white rounded-md px-4 font-semibold"
                    : "text-white"
                }`}
              >
                <Icon size={24} />
                <span>{item.label}</span>
              </a>
            </motion.div>
          );
        })}

        {/* Dropdown for Evaluations */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col gap-1 items-center text-xs py-2 text-white z-50"
            >
              <BiBookContent size={24} />
              <span>تقييمات</span>
            </motion.button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="center"
            className="bg-white rounded-xl p-2 -w-[140px] bottom-full mb-2 md:hidden block"
          >
            <DropdownMenuItem
              onClick={() => router.push(`/my-purchases/${id}/homeworks`)}
              className="flex justify-between items-center text-lg gap-2 cursor-pointer z-50"
            >
              <BiBookContent className="text-primary-600  shrink-0" size={28} />
              واجبات
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`/my-purchases/${id}/exams`)}
              className="flex justify-between items-center text-lg gap-2 cursor-pointer z-50"
            >
              <MdEditNote className="text-primary-600 " size={28} />
              امتحانات
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
