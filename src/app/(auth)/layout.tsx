import AuthNavBar from "./_authComponent/AuthNavBar";
import { Toaster } from "@/components/ui/sonner";
import BackgroundImage from "./_authComponent/BackgroundImage";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthNavBar />
      <Toaster />
      <div className="bg-white  rounded-lg shadow-md  border-[2px] container mx-auto xl:max-w-[80%] max-w-full my-8 grid grid-cols-1 lg:grid-cols-7 gap-6 h-full">
        <main className="w-full flex flex-col gap-6 lg:p-6 p-4 lg:col-span-4 col-span-1 max-w-2xl mx-auto justify-center">
          {children}
        </main>
        <BackgroundImage />
      </div>
    </>
  );
}
