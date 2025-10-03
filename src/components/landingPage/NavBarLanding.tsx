"use client";

import { useTheme } from "@/context/theme-context";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Home,
  BookOpen,
  Store,
  Phone,
  Youtube,
} from "lucide-react";
import { Academy } from "@/lib/types/landing";

const NavBarLanding = ({ data }: { data: Academy }) => {
  const { logo } = useTheme();
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { id: "home", label: "الرئيسية", icon: <Home size={20} /> },
    { id: "courses", label: "الدورات", icon: <BookOpen size={20} /> },
    { id: "store", label: "المتجر", icon: <Store size={20} /> },
    { id: "contact", label: "اتصل بنا", icon: <Phone size={20} /> },
  ];

  const socialLinks = [
    {
      href: `${data.web_config.header.facebook_link || ""}`,
      icon: <Facebook className="w-4 h-4" />,
    },
    {
      href: `${data.web_config.header.twitter_link || ""}`,
      icon: <Twitter className="w-4 h-4" />,
    },
    {
      href: `${data.web_config.header.instagram_link || ""}`,
      icon: <Instagram className="w-4 h-4" />,
    },
    {
      href: `${data.web_config.header.linkedin_link || ""}`,
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      href: `${data.web_config.header.youtube_link || ""}`,
      icon: <Youtube className="w-4 h-4" />,
    },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(targetId);
    }
  };

  // highlight active section while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => l.id);
      for (const id of sections) {
        const section = document.getElementById(id);
        if (
          section &&
          section.offsetTop - 100 <= window.scrollY &&
          section.offsetTop + section.offsetHeight > window.scrollY
        ) {
          setActiveSection(id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      {/* Desktop Navbar */}
      <motion.header
        className="hidden md:flex fixed top-6 right-0 left-0 z-50 justify-center"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className="flex items-center justify-center gap-6 px-8 py-2 w-fit mx-auto 
          rounded-full bg-backgroundColor/80 backdrop-blur-xl shadow-md border border-backgroundColor/10"
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src={logo} alt="main logo" width={60} height={60} />
          </Link>

          {/* Navigation Links */}
          <nav className="flex gap-4 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeSection === link.id
                    ? "bg-primary text-white shadow-md"
                    : "hover:bg-primary/20"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Media */}
          <div className="flex gap-2 text-muted-foreground">
            {socialLinks.map((social, idx) => (
              <Link
                key={idx}
                href={social.href}
                target="_blank"
                className="p-2 rounded-full text-primary hover:text-primary-400 transition-colors"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Mobile Bottom Navbar */}
      <motion.nav
        className="md:hidden fixed top-4 right-0 left-0 z-50 mx-auto max-w-md
        rounded-2xl bg-backgroundColor/90 backdrop-blur-lg shadow-lg border border-backgroundColor/10
        flex justify-around py-2"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => handleNavClick(e, link.id)}
            className={`flex flex-col items-center justify-center text-xs px-2 py-1 rounded-lg transition-colors ${
              activeSection === link.id
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-primary/10"
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </motion.nav>
    </>
  );
};

export default NavBarLanding;
