import { Card, CardContent } from "@/components/ui/card";
import { Academy } from "@/lib/types/landing";
import Link from "next/link";

const PromoVideo = ({ data }: { data: Academy }) => {
  const videoLink = data?.web_config?.video.link;
  let embedLink = "";

  if (videoLink) {
    const videoId = videoLink.split("v=")[1]?.split("&")[0]; // يجيب الـ video ID
    if (videoId) embedLink = `https://www.youtube.com/embed/${videoId}`;
  }

  return (
    <section id="promo-video" className="py-16 px-6 md:px-12 bg-[#831AD3]/10 ">
      <div className="mx-auto container 2xl:max-w-[90%] max-w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start justify-start">
          <div className="text-right flex flex-col lg:gap-6 gap-4 col-span-2 justify-start">
            <h2 className=" md:text-4xl text-3xl font-bold text-white !leading-relaxed ">
              {data?.web_config?.video.title}
            </h2>
            <p className="text-white lg:text-xl md:text-lg text-md leading-relaxed">
              {data?.web_config?.video.desc}
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
                  اكتشف دوراتنا
                </span>
              </Link>
            </div>
          </div>

          {/* Left side: Video */}
          <Card className="w-full flex justify-center items-center aspect-video lg:p-6 p-4 bg-white col-span-3">
            <CardContent className="p-0 w-full">
              {embedLink ? (
                <iframe
                  className="w-full min-h-96 rounded-md"
                  src={embedLink}
                  title="Promo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p className="text-center text-black">لا يوجد فيديو متاح</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PromoVideo;
