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
import { Academy } from "@/lib/types/landing";

const Footer = ({ data }: { data: Academy }) => {
  return (
    <footer id="contact" className="py-16 px-6 md:px-12 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right items-start">
        {/* Right Side: Logo & Description */}
        <div className="flex flex-col items-center md:items-start gap-4 md:gap-6">
          <Image src={data.logo} alt="Logo" width={100} height={100} />
          <p className="text-sm md:text-base !leading-relaxed text-secondary">
            {data.desc}
          </p>
        </div>

        {/* Center: Social Media */}
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <h3 className="text-lg text-primary">تواصل مع المُدرس</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 ">
            {data.web_config.header.phone && (
              <a
                href={data.web_config.header.phone}
                target="_blank"
                aria-label="WhatsApp"
                className="text-primary hover:text-primary-400"
              >
                <FaWhatsapp size={25} />
              </a>
            )}
            {data.web_config.header.facebook_link && (
              <a
                href={data.web_config.header.facebook_link || ""}
                target="_blank"
                aria-label="Facebook"
                className="text-primary hover:text-primary-400"
              >
                <FaFacebookF size={25} />
              </a>
            )}
            {data.web_config.header.twitter_link && (
              <a
                href={data.web_config.header.twitter_link || ""}
                target="_blank"
                aria-label="X Twitter"
                className="text-primary hover:text-primary-400"
              >
                <FaXTwitter size={25} />
              </a>
            )}

            <a
              href="https://t.me/your-telegram"
              target="_blank"
              aria-label="Telegram"
              className="text-primary hover:text-primary-400"
            >
              <FaTelegram size={25} />
            </a>
            {data.web_config.header.instagram_link && (
              <a
                href={data.web_config.header.instagram_link || ""}
                target="_blank"
                aria-label="Instagram"
                className="text-primary hover:text-primary-400"
              >
                <FaInstagram size={25} />
              </a>
            )}

            <a
              href="https://tiktok.com"
              target="_blank"
              aria-label="TikTok"
              className="text-primary hover:text-primary-400"
            >
              <FaTiktok size={25} />
            </a>
            {data.web_config.header.youtube_link && (
              <a
                href={data.web_config.header.youtube_link || ""}
                target="_blank"
                aria-label="YouTube"
                className="text-primary hover:text-primary-400"
              >
                <FaYoutube size={25} />
              </a>
            )}
          </div>
        </div>

        {/* Left Side: Support */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <span className="text-lg text-primary flex flex-col gap-2">
            <h3>تواصل مع الدعم الفني للمنصة</h3>
            <a
              href="#"
              className="text-primary hover:text-primary-400 underline md:text-start text-center w-full md:w-auto  block"
            >
              تقديم شكوى
            </a>
          </span>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <p className="mt-12 text-md md:text-lg tracking-wide text-center text-secondary">
        جميع الحقوق محفوظة.
        <span className="text-primary font-semibold">انفنتي</span> © 2025
      </p>
    </footer>
  );
};

export default Footer;
