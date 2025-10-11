import Navbar from "@/components/home/NavBar";
import BottomNavbar from "@/components/home/BottomNavbar";
import StoreSideBar from "../_storeComponents/StoreSideBar";
import { Suspense } from "react";
import CourseDetailsSkeleton from "../../my-purchases/_Components/CourseDetailsSkeleton";
import CoursesDetails from "../../my-purchases/_Components/CoursesDetails";

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  // فك الـ Promise بتاع params
  const { id } = await params;

  return (
    <>
      <Navbar id={id} />
      <div className="mb-20 h-full bg-backgroundColor">
        <div className="flex lg:max-w-[90%] max-w-full container mx-auto md:px-4 px-0 lg:px-8">
          <StoreSideBar id={id} />
          <main className="flex-1 xl:p-8 md:p-6 p-4 overflow-hidden">
            <Suspense fallback={<CourseDetailsSkeleton />}>
              <CoursesDetails id={id} />
            </Suspense>
            {children}
          </main>
        </div>
      </div>
      <BottomNavbar id={id} />
    </>
  );
}
