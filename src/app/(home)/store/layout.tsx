import StoreSideBar from "./_storeComponents/StoreSideBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-[#F7F7F8]">
        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <StoreSideBar />
          <main className="flex-1  mx-auto  max-auto container xl:max-w-[80%] max-w-full xl:p-8 md:p-6 p-4 min-h-screen bg-re">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
