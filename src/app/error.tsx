"use client";

import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="h-screen bg-backgroundColor flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <svg
            className="w-20 h-20 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Error Title */}
        <h2 className="lg:text-3xl text-2xl font-bold text-gray-800">
          عذرًا، حدث خطأ ما!
        </h2>

        {/* Error Message */}
        <p className="text-[#8E8E8E] text-lg !break-all">
          {error.message ||
            "حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى لاحقًا."}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center md:flex-row flex-col gap-4">
          <button
            onClick={reset}
            className="2xl:px-6 md:px-5 px-3 py-3 bg-primary text-white border-[2px]  lg:text-lg md:text-md text-sm font-semibold rounded-lg  hover:bg-primary-400  transition-all duration-300 cursor-pointer"
          >
            حاول مرة أخرى
          </button>
          <button
            onClick={() => router.push("/")}
            className="2xl:px-6 md:px-5 px-3 py-3 border-primary border-[2px] text-primary lg:text-lg md:text-md text-sm font-semibold rounded-lg  hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
          >
            الذهاب إلى الصفحة الرئيسية
          </button>
        </div>

        {/* Error Digest (for debugging, hidden in production) */}
        {process.env.NODE_ENV === "development" && error.digest && (
          <p className="text-sm text-gray-400 mt-4">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
