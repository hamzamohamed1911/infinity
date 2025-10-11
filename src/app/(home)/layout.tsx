import CallSupport from "@/components/CallSupport";
import { SidebarProvider } from "@/lib/context/SidebarContext";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <CallSupport />
        <main>{children}</main>
      </SidebarProvider>
    </>
  );
}
