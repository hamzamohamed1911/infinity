import Navbar from "@/components/home/NavBar";
import BottomNavbar from "@/components/home/BottomNavbar";

export default function LessonLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <>
      <Navbar id={params.id} />
      <div className="bg-[#F7F7F8]">
        <div className="flex lg:max-w-[90%] max-w-full container mx-auto p-4">
          <main className=" min-h-screen  lg:m-6 m-4 w-full">{children}</main>
        </div>
      </div>
      <BottomNavbar id={params.id} />
    </>
  );
}
