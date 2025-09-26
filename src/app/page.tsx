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

export default function Home() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white font-sans overflow-hidden"
      dir="rtl"
    >
      {/* Header */}
      <NavBarLanding />
      {/* Hero Section */}
      <HeroSection />
      {/* About Section */}
      <AboutSection />
      {/* Courses Section */}
      <Courses />
      {/* Promo video Section */}
      <PromoVideo />
      {/* Last Courses Section */}
      <LastCourses />
      {/* Store */}
      <Store />
      {/* Download Section */}
      <DownloadAppSection />
      {/* scroll button */}
      <ScrollToTopButton />
      {/* Footer */}
      <Footer />
    </div>
  );
}
