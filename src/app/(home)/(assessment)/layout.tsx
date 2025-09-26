import Navbar from "@/components/home/NavBar";
import BottomNavbar from "@/components/home/BottomNavbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const selectedId = cookieStore.get("selected_course_id")?.value;
  if (!selectedId || selectedId === "undefined") {
    redirect("/my-courses");
  }
  return (
    <>
      <Navbar id={selectedId || ""} />
      <div className="bg-backgroundColor md:mb-0 mb-20">
        <div className="flex lg:max-w-[90%] max-w-full container mx-auto  lg:p-4 md:p-2 py-0">
          <main className=" min-h-screen  md:m-6 m-0 w-full">{children}</main>
        </div>
      </div>
      <BottomNavbar id={selectedId || ""} />
    </>
  );
}
