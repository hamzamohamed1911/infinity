import BottomNavbar from "@/components/home/BottomNavbar";
import Navbar from "@/components/home/NavBar";
import { SidebarProvider } from "@/lib/context/SidebarContext";
import ProfileSideBar from "./_profileComponents/ProfileSideBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const selectedId = cookieStore.get("selected_course_id")?.value;
  if (!selectedId || selectedId === "undefined") {
    redirect("/my-classes");
  }

  return (
    <>
      <SidebarProvider>
        <Navbar id={selectedId || ""} />
        <BottomNavbar id={selectedId || ""} />
        <div className="bg-backgroundColor h-full">
          <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <ProfileSideBar />
            <main className="flex-1 max-auto container xl:max-w-[80%] max-w-full xl:p-8 md:p-6 p-4 h-full mb-14">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
