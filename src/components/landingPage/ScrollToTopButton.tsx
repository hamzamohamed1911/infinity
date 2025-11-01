"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const scrollContainer = document.querySelector(".site-scroll-landing");

    const handleScroll = () => {
      if (!scrollContainer) return;

      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight =
        scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const scrolled = (scrollTop / scrollHeight) * 100;

      setScrollPosition(scrolled);
      setIsVisible(scrollTop > 400);
    };

    scrollContainer?.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector(".site-scroll-landing");
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`fixed bottom-14 right-4 h-14 w-14 flex items-center justify-center cursor-pointer shadow-md transition-opacity duration-300 z-50 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
      style={{
        background: `conic-gradient(var(--landing-primary-500) ${scrollPosition}%, transparent 0%)`,
        borderRadius: "50%",
        padding: "6px",
      }}
    >
      <div className="bg-white h-full w-full rounded-full flex items-center justify-center">
        <FaArrowUp className="text-landing-primary" size={22} />
      </div>
    </div>
  );
};

export default ScrollToTopButton;
