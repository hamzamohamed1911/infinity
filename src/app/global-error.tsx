"use client";

import Link from "next/link";
import Image from "next/image";
import { logo } from "../../public";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-backgroundColor text-center p-6 animate-fadeIn">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 mb-8">
            <Image
              src={logo}
              alt="main logo"
              width={150}
              height={40}
              priority
            />
          </Link>

          <h2 className="2xl:text-5xl xl:text-6xl lg:text-5xl text-4xl font-extrabold text-gray-800 mb-4">
           حدث خطأ ما !
          </h2>

          <p className="text-[#8E8E8E] text-lg md:text-xl max-w-md mb-8">
            عذرًا، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى أو العودة إلى
            الصفحة الرئيسية.
            {error.digest && `رمز الخط: ${error.digest})`}
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => reset()}
              className="2xl:px-6 px-5 py-3 bg-primary text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-primary-400 transition-all duration-300"
            >
              حاول مرة أخرى
            </button>
            <Link
              href="/"
              className="2xl:px-6 px-5 py-3 bg-gray-200 text-secondary text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-300 transition-all duration-300"
            >
              الذهاب إلى الرئيسي
            </Link>
          </div>
        </div>

        <style jsx global>{`
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </body>
    </html>
  );
}
