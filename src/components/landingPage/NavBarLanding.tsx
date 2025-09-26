"use client";

import { useTheme } from "@/context/theme-context";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const NavBarLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logo } = useTheme();
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-20 flex justify-between items-center p-6  bg-[#831AD3]/10 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link href="/" className="flex-shrink-0 ">
          <Image src={logo} alt="main logo" width={80} height={40} priority />
        </Link>
        <nav className="hidden md:flex gap-4 text-xl">
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="hover:text-[#831AD3] transition-colors"
          >
            الرئيسية
          </Link>
          <Link
            href="#about"
            onClick={(e) => handleNavClick(e, "about")}
            className="hover:text-[#831AD3] transition-colors"
          >
            من نحن
          </Link>
          <Link
            href="#courses"
            onClick={(e) => handleNavClick(e, "courses")}
            className="hover:text-[#831AD3] transition-colors"
          >
            الدورات
          </Link>
          <Link
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="hover:text-[#831AD3] transition-colors"
          >
            اتصل بنا
          </Link>
        </nav>
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "×" : "☰"}
        </button>
      </motion.header>
      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-gray-900/90 bgt p-6 fixed top-20 right-0 w-full z-10 backdrop-blur-sm`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="flex flex-col space-y-4 text-right">
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="hover:text-[#831AD3] transition-colors"
          >
            الرئيسية
          </Link>
          <Link
            href="#about"
            onClick={(e) => handleNavClick(e, "about")}
            className="hover:text-[#831AD3] transition-colors"
          >
            من نحن
          </Link>
          <Link
            href="#courses"
            onClick={(e) => handleNavClick(e, "courses")}
            className="hover:text-[#831AD3] transition-colors"
          >
            الدورات
          </Link>
          <Link
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="hover:text-[#831AD3] transition-colors"
          >
            اتصل بنا
          </Link>
        </nav>
      </motion.div>
    </>
  );
};

export default NavBarLanding;
