import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen bg-backgroundColor text-center p-6 animate-fadeIn">
      <Link
        href="/"
        className="lg:text-9xl md:text-7xl text-5xl text-primary-100"
      >
        404
      </Link>

      <h2 className=" lg:text-4xl text-3xl font-bold text-[#606060] ">
        الصفحة غير موجودة
      </h2>

      <p className="text-[#606060] font-medium text-lg max-w-md ">
        عذرًا، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
      </p>

      {/* Go Home Button */}
      <Link
        href="/"
        className="2xl:px-6 px-5 py-3 bg-primary hover:bg-primary-400 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition-all duration-300 "
      >
        الذهاب إلى الرئيسية
      </Link>
    </div>
  );
}
