"home layout.jsx";
import SideBar from "@/components/home/SideBar";
import CoursesDetails from "../_Components/CoursesDetails";
import Navbar from "@/components/home/NavBar";
import BottomNavbar from "@/components/home/BottomNavbar";
import CourseDetailsSkeleton from "../_Components/CourseDetailsSkeleton";
import { Suspense } from "react";

export default function HomeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <>
      <Navbar id={params.id} />
      <div className="bg-backgroundColor mb-20 min-h-screen">
        <div className="flex lg:max-w-[90%] max-w-full container mx-auto md:px-4 px-0 lg:px-8">
          <SideBar id={params.id} />
          <main className="flex-1 xl:p-8 md:p-6 p-4 overflow-hidden">
            <Suspense fallback={<CourseDetailsSkeleton />}>
              <CoursesDetails id={params.id} />
            </Suspense>
            {children}
          </main>
        </div>
      </div>
      <BottomNavbar id={params.id} />
    </>
  );
}
