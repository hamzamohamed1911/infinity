/* eslint-disable @typescript-eslint/no-unused-vars */
// app/page.tsx
import Footer from "@/components/Footer";
import Classes from "@/components/landingPage/Classes";
import LastCourses from "@/components/landingPage/LastCourses";
import ScrollToTopButton from "@/components/landingPage/ScrollToTopButton";
import DownloadAppSection from "@/components/landingPage/DownloadAppSection";
import Store from "@/components/landingPage/Store";
import PromoVideo from "@/components/landingPage/PromoVideo";
import NavBarLanding from "@/components/landingPage/NavBarLanding";
import HeroSection from "@/components/landingPage/HeroSection";
import AboutSection from "@/components/landingPage/AboutSection";
import { getLandingPage } from "@/lib/apis/webconfig.api";
import TopStudents from "@/components/landingPage/TopStudents";

export async function generateMetadata() {
  try {
    const landingData = await getLandingPage();
    return {
      title: landingData?.data?.academy.name,
      description:
        landingData?.data?.academy.desc ||
        "مرحبًا بك في أكاديميتنا عبر الإنترنت، مكانك المثالي لاكتساب المعرفة وتطوير مهاراتك.",
    };
  } catch {
    return {
      title: "أكاديمية أونلاين",
      description:
        "مرحبًا بك في أكاديميتنا عبر الإنترنت، مكانك المثالي لاكتساب المعرفة وتطوير مهاراتك.",
    };
  }
}
export default async function Home() {
  const landingData = await getLandingPage();
  if (!landingData) {
    return <p className="text-center text-primary mt-20">فشل تحميل البيانات</p>;
  }
  console.log();

  return (
    <div
      className="min-h-screen relative bg-backgroundColor text-primary font-sans overflow-hidden container max-w-[90%] mx-auto"
      dir="rtl"
    >
      {/*  header */}
      {landingData.data.academy.web_config.header.active === "on" && (
        <NavBarLanding data={landingData.data.academy} />
      )}

      {/* Hero Section */}
      {landingData.data.academy.web_config.hero.active === "on" && (
        <HeroSection hero={landingData.data.academy} />
      )}

      {/* About Section */}
      {landingData.data.academy.web_config.about.active === "on" && (
        <AboutSection data={landingData.data.academy} />
      )}

      {/* Courses Section */}
      <Classes data={landingData.data.courses} />

      {/* Last Courses Section */}
      <LastCourses data={landingData.data.courses} />

      {/* books Store Section */}
      <Store products={landingData.data.products} />

      {/* Top Students */}
      <TopStudents data={landingData.data.top_student} />

      {/* Promo Video Section */}
      {landingData.data.academy.web_config.video.active === "on" && (
        <PromoVideo data={landingData.data.academy} />
      )}

      {/* Download App Section */}
      <DownloadAppSection />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Footer */}
      {landingData.data.academy.web_config.footer.active === "on" && (
        <Footer data={landingData.data.academy} />
      )}
    </div>
  );
}
