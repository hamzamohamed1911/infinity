"use client";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa6";
import Image from "next/image";
import { useTheme } from "@/context/theme-context";

const Footer = () => {
  const { logo } = useTheme();

  return (
    <footer
      id="contact"
      className="py-16 px-6 md:px-12 bg-[#831AD3]/10 text-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right items-start">
        {/* Right Side: Logo & Description */}
        <div className="flex flex-col items-center md:items-start gap-4 md:gap-6">
          <Image src={logo} alt="Logo" width={100} height={100} />
          <p className="text-sm md:text-base leading-loose">
            منصة تعليمية تقدم محتوى متميز يساعدك في تطوير مهاراتك وتحقيق أهدافك
            التعليمية.
          </p>
        </div>

        {/* Center: Social Media */}
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <h3 className="text-lg text-white">تواصل مع المُدرس</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
            <a
              href="https://wa.me/your-number"
              target="_blank"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={25} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <FaFacebookF size={25} />
            </a>
            <a href="https://x.com" target="_blank" aria-label="X Twitter">
              <FaXTwitter size={25} />
            </a>
            <a
              href="https://t.me/your-telegram"
              target="_blank"
              aria-label="Telegram"
            >
              <FaTelegram size={25} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram size={25} />
            </a>
            <a href="https://tiktok.com" target="_blank" aria-label="TikTok">
              <FaTiktok size={25} />
            </a>
            <a href="https://youtube.com" target="_blank" aria-label="YouTube">
              <FaYoutube size={25} />
            </a>
          </div>
        </div>

        {/* Left Side: Support */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <span className="text-lg text-white flex flex-col gap-2">
            <h3>تواصل مع الدعم الفني للمنصة</h3>
            <a
              href="#"
              className="text-white underline md:text-start text-center w-full md:w-auto  block"
            >
              تقديم شكوى
            </a>
          </span>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <p className="mt-12 text-md md:text-lg tracking-wide text-center text-white">
        جميع الحقوق محفوظة.{" "}
        <span className="text-primary font-semibold">انفنتي</span> © 2025
      </p>
    </footer>
  );
};

export default Footer;
