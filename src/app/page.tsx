/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { heroImg, logo } from "../../public";

// Star component for background animation
const Star = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    className="absolute rounded-full bg-white"
    style={style}
    animate={{
      opacity: [0.2, 1, 0.2],
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration: Math.random() * 3 + 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);
// Animated Button Component
const AnimatedButton = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) => (
  <motion.div className="relative">
    {href ? (
      <Link
        href={href}
        className={`inline-flex items-center px-6 py-3 rounded-full transition-colors ${className}`}
      >
        {children}
      </Link>
    ) : (
      <button
        className={`inline-flex items-center px-6 py-3 rounded-full transition-colors ${className}`}
      >
        {children}
      </button>
    )}
  </motion.div>
);

export default function Home() {
  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`تم الاشتراك بـ ${email}`);
    setEmail("");
  };

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

  // Generate stars with random positions and sizes
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${Math.random() * 3 + 1}px`,
    height: `${Math.random() * 3 + 1}px`,
  }));

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white font-sans overflow-hidden"
      dir="rtl"
    >
      {/* Background Stars */}
      {stars.map((star, i) => (
        <Star key={i} style={star} />
      ))}

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-20 flex justify-between items-center p-6  bg-[#831AD3]/10 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link href="/" className="flex-shrink-0 ">
          <Image src={logo} alt="main logo" width={150} height={40} priority />
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
        } bg-gray-900/90 bgt p-6 fixed top-16 right-0 w-full z-10 backdrop-blur-sm`}
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

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col md:flex-row-reverse items-center justify-center min-h-screen px-6 md:px-12 pt-20 bg-[#831AD3]/10"
      >
        <motion.div
          className="md:w-1/2 mt-8 md:mt-0"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            opacity: { duration: 1, delay: 0.4 },
            scale: { duration: 1, delay: 0.4 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Image
            src={heroImg}
            alt="المدرس"
            width={600}
            height={600}
            className="rounded-full border-4 border-[#831AD3] mx-auto"
          />
        </motion.div>
        <motion.div
          className="md:w-1/2 text-center md:text-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-7xl font-bold mb-4">
            م/ حسام دكروني
          </h1>
          <p className="text-2xl md:text-3xl text-[#606060] mb-6">
            مُدرس الفيزياء للثانوية العامة والأزهرية
          </p>
          <AnimatedButton href="/my-classes"  className="bg-[#831AD3] text-white">
            ابدأ الآن
          </AnimatedButton>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 px-6 md:px-12 text-center bg-[#831AD3]/10"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          عن فضاء التعليم
        </motion.h2>
        <motion.p
          className="text-lg text-[#606060] max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          فضاء التعليم هو بوابتك إلى تعليم نجمي. يقدم مدرسونا الخبراء دروسًا
          مخصصة، لمساعدتك على استكشاف عالم المعرفة بسهولة وثقة.
        </motion.p>
      </section>

      {/* Download Section */}
      <section id="courses" className="py-16 px-6 md:px-12  bg-[#831AD3]/10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          احصل على تطبيقنا
        </motion.h2>
        <div className="flex flex-col md:flex-row-reverse justify-center md:gap-6 gap-2 items-center">
          <AnimatedButton
            href="https://play.google.com"
            className="bg-black hover:bg-black/40 transition-colors duration-700 text-white rounded-md py-1 md:min-w-80 min-w-auto  flex justify-center items-center"
          >
            <FaGooglePlay size={50} className="mx-2 " />

            <div className="flex flex-col gap-1 text-end">
              <span className="text-xs">Get it on</span>
              <span className=" text-2xl">Google Play</span>
            </div>
          </AnimatedButton>
          <AnimatedButton
            href="https://www.apple.com/app-store/"
            className="bg-black hover:bg-black/40 transition-colors duration-700 text-white rounded-md py-1 md:min-w-80 min-w-auto  flex justify-center items-center"
          >
            <FaApple size={50} className="mx-2 " />
            <div className="flex flex-col gap-1 text-end">
              <span className="text-xs">Available on the</span>
              <span className=" text-2xl">App Store</span>
            </div>
          </AnimatedButton>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="py-16 px-6 md:px-12 bg-[#831AD3]/10 text-center"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          اشترك في نشرتنا الإخبارية
        </motion.h2>
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 p-3 rounded-full bg-gray-800 text-white border border-[#606060] focus:outline-none focus:border-[#831AD3]"
              required
            />
            <AnimatedButton className="bg-[#831AD3] text-white">
              اشترك
            </AnimatedButton>
          </motion.div>
        </form>
        <motion.p
          className="mt-8 text-[#606060]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          © 2025 فضاء التعليم. جميع الحقوق محفوظة.
        </motion.p>
      </footer>
    </div>
  );
}
