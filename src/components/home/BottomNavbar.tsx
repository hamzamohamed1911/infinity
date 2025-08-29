"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { BiStore } from "react-icons/bi";
import { IoGridOutline } from "react-icons/io5";
import { GrHelpBook } from "react-icons/gr";
import { motion } from "framer-motion";



export default function BottomNavbar({id}:{id:string}) {
  const navItems = [
  { href: "/profile", icon: User, label: "الملف الشخصى" },
  { href: `/my-purchases/${id}`, icon: IoGridOutline, label: "مشترياتى" },
  { href: `/store/${id}`, icon: BiStore, label: "المتجر" },
  { href: "/questions-bank", icon: GrHelpBook, label: "بنك الاسئلة" },
];
  const pathname = usePathname();

  return (
    <nav className="fixed md:hidden bottom-0 left-0 right-0 bg-primary shadow-md rounded-lg z-[9999]">
      <div className="flex justify-around items-center py-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                href={item.href}
                className={`flex flex-col gap-1 items-center text-xs py-2 ${
                  isActive
                    ? "text-primary bg-white rounded-md px-4 font-semibold"
                    : "text-white"
                }`}
              >
                <motion.div
                  animate={{ scale: isActive ? 1.2 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={24} />
                </motion.div>
                <span>{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </nav>
  );
}