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
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import { IoCloseSharp } from "react-icons/io5";

const NavBarLanding = ({ data }: { data: Academy }) => {
  const { logo } = useTheme();
  const [open, setOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("home");
  const router = useRouter();
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
      let foundActive = false;

      for (const id of sections) {
        const section = document.getElementById(id);
        if (
          section &&
          section.offsetTop - 100 <= window.scrollY &&
          section.offsetTop + section.offsetHeight > window.scrollY
        ) {
          setActiveSection(id);
          foundActive = true;
          break;
        }
      }

      if (
        !foundActive &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10
      ) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      {/* Desktop Navbar */}
      <motion.header
        className="hidden md:flex fixed top-6 right-0 left-0 z-50 justify-center w-full"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className="flex items-center justify-between gap-6 px-8 py-2 max-w-7xl w-full mx-auto 
          rounded-full bg-backgroundColor/80 backdrop-blur-xl shadow-md border border-backgroundColor/10"
        >
          <div className="flex justify-center items-center gap-4">
            <Button
              onClick={() => router.push("/login")}
              className="rounded-lg bg-landing-primary-500 hover:bg-transparent hover:text-landing-primary-500 border border-landing-primary-500 text-white transition-colors duration-300"
            >
              تسجيل الدخول
            </Button>
            <Button
              onClick={() => router.push("/register")}
              className="rounded-lg  bg-transparent hover:bg-landing-primary-500 hover:text-white border border-landing-primary-500 text-landing-primary-500 transition-colors duration-300"
            >
              حساب جديد
            </Button>
          </div>
          {/* Navigation Links */}
          <nav className="flex gap-4 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`px-4 py-2 rounded-full transition-colors text-landing-primary ${
                  activeSection === link.id
                    ? "bg-landing-primary text-white shadow-md"
                    : "hover:bg-landing-primary/20"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Media */}

          <div className="flex justify-center items-center gap-4">
            <div className="flex gap-2 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  target="_blank"
                  className="p-2 rounded-full text-landing-primary hover:text-landing-primary-400 transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>

            {/* Logo */}

            <Link href="/" className="flex-shrink-0">
              <Image src={logo} alt="main logo" width={60} height={60} />
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mobile Bottom Navbar */}
      <motion.header
        className="md:hidden fixed top-4 right-0 left-0 z-50 flex justify-between items-center 
  bg-backgroundColor/80 backdrop-blur-lg border border-backgroundColor/10 rounded-full 
  shadow-md mx-4 px-4 py-2"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src={logo} alt="main logo" width={45} height={45} />
        </Link>

        {/* Menu Button (Sheet Trigger) */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 rounded-full bg-landing-primary text-white">
              <Menu size={22} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-backgroundColor text-foreground h-full flex flex-col justify-between px-4 py-2 z-50 max-w-[80%]"
          >
            <div>
              <SheetHeader className="bg-white h-16 flex justify-between items-center text-primary w-full">
                <SheetTitle className="sr-only">قائمة التنقل</SheetTitle>

                <Image src={logo} alt="main logo" width={60} height={60} />

                <SheetClose className="text-black">
                  <IoCloseSharp size={22} />
                </SheetClose>
              </SheetHeader>

              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.id}>
                    <Link
                      href={`#${link.id}`}
                      onClick={(e) => {
                        handleNavClick(e, link.id);
                        setOpen(false);
                      }}
                      className={`flex items-center gap-3 text-lg font-medium px-3 py-2 rounded-md transition-colors ${
                        activeSection === link.id
                          ? "bg-landing-primary text-white"
                          : "text-muted-foreground hover:bg-landing-primary/10"
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </div>
            <div>
              <div className=" flex flex-col gap-3">
                <Button
                  onClick={() => router.push("/login")}
                  className="h-10 rounded-lg bg-landing-primary-500 hover:bg-transparent hover:text-landing-primary-500 border border-landing-primary-500 text-white transition-colors duration-300"
                >
                  تسجيل الدخول
                </Button>
                <Button
                  onClick={() => router.push("/register")}
                  className=" h-10 rounded-lg bg-transparent hover:bg-landing-primary-500 hover:text-white border border-landing-primary-500 text-landing-primary-500 transition-colors duration-300"
                >
                  حساب جديد
                </Button>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                {socialLinks.map((social, idx) => (
                  <Link
                    key={idx}
                    href={social.href}
                    target="_blank"
                    className="p-2 rounded-full text-landing-primary hover:text-landing-primary-400 transition-colors"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </motion.header>
    </>
  );
};

export default NavBarLanding;
