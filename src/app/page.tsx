// app/page.tsx
import Footer from "@/components/Footer";
import Courses from "@/components/landingPage/Courses";
import LastCourses from "@/components/landingPage/LastCourses";
import ScrollToTopButton from "@/components/landingPage/ScrollToTopButton";
import DownloadAppSection from "@/components/landingPage/DownloadAppSection";
import Store from "@/components/landingPage/Store";
import PromoVideo from "@/components/landingPage/PromoVideo";
import NavBarLanding from "@/components/landingPage/NavBarLanding";
import HeroSection from "@/components/landingPage/HeroSection";
import AboutSection from "@/components/landingPage/AboutSection";
import { getLandingPage } from "@/lib/apis/webconfig.api";

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

  return (
    <div
      className="min-h-screen bg-backgroundColor text-primary font-sans overflow-hidden"
      dir="rtl"
    >
      {/* Header */}
      <NavBarLanding />

      {/* Hero Section */}
      <HeroSection hero={landingData.data.academy} />

      {/* About Section */}
      <AboutSection data={landingData.data.academy} />

      {/* Courses Section */}
      <Courses />

      {/* Promo Video Section */}
      <PromoVideo data={landingData.data.academy} />

      {/* Last Courses Section */}
      <LastCourses />

      {/* Store Section */}
      <Store />

      {/* Download App Section */}
      <DownloadAppSection />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}
