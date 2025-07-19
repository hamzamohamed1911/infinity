import BottomNavbar from "@/components/home/BottomNavbar";
import Navbar from "@/components/home/NavBar";
import SideBar from "@/components/home/SideBar";
import { SidebarProvider } from "@/lib/context/SidebarContext";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <SidebarProvider>
      <Navbar />
      <BottomNavbar/>
      <div className="bg-[#F7F7F8]">
        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <SideBar />
          <main className="flex-1  mx-auto  max-auto container xl:max-w-[80%] max-w-full xl:p-8 md:p-6 p-4 min-h-screen bg-re">{children}</main>
        </div>
      </div>
      </SidebarProvider>
    </>
  );
}
