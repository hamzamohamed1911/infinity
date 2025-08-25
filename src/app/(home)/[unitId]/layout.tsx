import Navbar from "@/components/home/NavBar";
import BottomNavbar from "@/components/home/BottomNavbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const selectedId = cookieStore.get("selected_course_id")?.value;
  if (!selectedId || selectedId === "undefined") {
  redirect("/my-classes");
}
  return (
    <>
      <Navbar id={selectedId || ""}/>
      <div className="bg-backgroundColor md:mb-0 mb-20">
        <div className="flex lg:max-w-[90%] max-w-full container mx-auto p-4">
          <main className=" min-h-screen  md:m-6 m-0 w-full">{children}</main>
        </div>
      </div>
      <BottomNavbar id={selectedId || ""}/>
    </>
  );
}
