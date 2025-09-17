import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const PromoVideo = () => {
  return (
    <section id="promo-video" className="py-16 px-6 md:px-12 bg-[#831AD3]/10 ">
      <div className="mx-auto container 2xl:max-w-[90%] max-w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start justify-start">
          {/* Right side: Content */}
          <div className="text-right flex flex-col lg:gap-6 gap-4 col-span-2 justify-start">
            <h2 className=" md:text-4xl text-3xl font-bold text-white !leading-relaxed ">
              المحاضرة التأسيسية في الفيزياء | للثانوية العامة 2
            </h2>
            <p className="text-white lg:text-xl md:text-lg text-md leading-relaxed">
              محاضرة تأسيسية لمنهج الفيزياء للثانوية العامة والأزهرية
            </p>
            <div className="w-full flex md:justify-start justify-center">
              <Link
                href="/my-courses"
                className="btn-link bg-primary-500 rounded-md group  "
              >
                <svg
                  width="180"
                  height="60"
                  viewBox="0 0 180 60"
                  className="absolute top-0 left-0 w-full h-full border-svg"
                >
                  <polyline
                    points="179,1 179,59 1,59 1,1 179,1"
                    className="stroke-white"
                  />
                  <polyline
                    points="179,1 179,59 1,59 1,1 179,1"
                    className="stroke-white"
                  />
                </svg>
                <span className="relative z-10 text-white text-lg font-medium">
                  اكتشف دوراتنا التعليمية
                </span>
              </Link>
            </div>
          </div>

          {/* Left side: Video */}
          <Card className="w-full flex justify-center items-center aspect-video  lg:p-6 p-4  bg-white col-span-3">
            <CardContent className="p-0 w-full">
              <iframe
                className="w-full min-h-96 rounded-md"
                src="https://www.youtube.com/embed/ip3s7SvL4dY"
                title="Promo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PromoVideo;
