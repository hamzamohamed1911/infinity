
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <div className="bg-backgroundColor">
          <main className=" mx-auto  max-auto container xl:max-w-[80%] max-w-full xl:p-8 md:p-6 p-4 min-h-screen ">
            {children}
          </main>
        </div>
    </>
  );
}
