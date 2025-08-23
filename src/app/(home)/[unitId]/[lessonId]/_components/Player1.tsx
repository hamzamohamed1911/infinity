"use client";

import { FaCirclePlay } from "react-icons/fa6";

export default function Player1({ encrypted }: { encrypted: string }) {
  const handleClick = () => {
    window.open(
      `infinity://infinity.com/video?encrypted=${encrypted}`,
      "_blank"
    );
  };

  return (
    <div className="relative w-full 2xl:min-h-96 min-h-72 mt-4">
      <div className="absolute inset-0 bg-black flex items-center justify-center rounded-lg">
        <button
          onClick={handleClick}
          className="text-white px-6 py-3 bg-primary rounded-full font-bold hover:bg-primary-400 transition flex justify-center items-center gap-2"
        >
          <FaCirclePlay size={30} className="text-white" /> تشغيل الفيديو
        </button>
      </div>
    </div>
  );
}
