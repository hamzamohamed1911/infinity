import Navbar from "@/components/home/NavBar";
import BottomNavbar from "@/components/home/BottomNavbar";
import StoreSideBar from "../_storeComponents/StoreSideBar";

export default function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <>
      <Navbar id={params.id} />
      <div className=" mb-20 h-full bg-backgroundColor">
        <div className="flex lg:max-w-[90%] max-w-full container mx-auto md:px-4 px-0 lg:px-8">
          <StoreSideBar id={params.id} />
          <main className="flex-1 xl:p-8 md:p-6 p-4 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
      <BottomNavbar id={params.id} />
    </>
  );
}
