import { SidebarProvider } from "@/lib/context/SidebarContext";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <main>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
