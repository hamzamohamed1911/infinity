"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / windowHeight) * 100;

      setScrollPosition(scrolled);

      if (scrollTop > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (isVisible) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`fixed bottom-14 right-4 h-14 w-14 flex items-center justify-center cursor-pointer shadow-md transition-opacity duration-300 z-40 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
      style={{
        background: `conic-gradient(var(--landing-primary-500) ${scrollPosition}%, transparent 0%)`,
        borderRadius: "50%",
        padding: "6px",
      }}
    >
      {/* Inner div with solid white background */}
      <div className="bg-white h-full w-full rounded-full flex items-center justify-center">
        <FaArrowUp className="text-landing-primary" size={22} />
      </div>
    </div>
  );
};

export default ScrollToTopButton;
