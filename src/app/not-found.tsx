import Link from "next/link";
import Image from "next/image";
import { logo } from "../../public";

export default async function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-violet-50 to-violet-100 text-center p-6 animate-fadeIn">
      <Link href="/" className="flex-shrink-0 mb-8">
        <Image src={logo} alt="main logo" width={150} height={40} priority />
      </Link>

      <h2 className="2xl:text-5xl xl:text-6xl lg:text-5xl text-4xl font-extrabold text-secondary mb-4">
        الصفحة غير موجودة
      </h2>

      <p className="text-secondary text-lg md:text-xl max-w-md mb-8">
        عذرًا، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
      </p>

      {/* Go Home Button */}
      <Link
        href="/"
        className="2xl:px-6 px-5 py-3 bg-primary hover:bg-primarydark text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition-all duration-300 "
      >
        الذهاب إلى الرئيسية
      </Link>
    </div>
  );
}
