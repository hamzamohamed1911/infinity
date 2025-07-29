import { SidebarProvider } from "@/lib/context/SidebarContext";
import { Toaster } from "sonner";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <main>
          <Toaster />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
