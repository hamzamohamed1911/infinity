import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AllUnits from "./_components/AllUnits";
import { GetUnits } from "@/lib/apis/course.api";
import { Suspense } from "react";
import UnitSkeleton from "@/components/UnitSkeleton";

async function UnitsContent({ courseId }: { courseId: string }) {
  const Units = await GetUnits({ course_id: courseId });
  const UnitsData = Units && "data" in Units ? Units.data : undefined;

  return (
    <section>
      <Tabs dir="rtl" defaultValue="all" className="w-full my-8">
        <TabsList
          className="w-full  gap-2 
            grid-cols-3 lg:grid sm:flex overflo-x-auto  whitespace-nowrap bg-[#F5F5F5] h-18  p-3 rounded-md"
        >
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-[#606060] rounded-md py-3"
          >
            الكل
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-[#606060] rounded-md py-3"
          >
            دروس هتخلص قريب
          </TabsTrigger>
          <TabsTrigger
            value="ending"
            className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-[#606060] rounded-md py-3"
          >
            آخر دروس شوفتها
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="all">
            <AllUnits UnitsData={UnitsData ?? []} />
          </TabsContent>
          <TabsContent value="ending">
            <AllUnits UnitsData={UnitsData ?? []} />
          </TabsContent>
          <TabsContent value="recent">
            <AllUnits UnitsData={UnitsData ?? []} />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // فك الـPromise بتاع params
  const { id } = await params;

  return (
    <Suspense fallback={<UnitSkeleton />}>
      <UnitsContent courseId={id} />
    </Suspense>
  );
}
