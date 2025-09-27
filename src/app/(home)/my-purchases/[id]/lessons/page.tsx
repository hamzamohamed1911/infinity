import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AllLessons from "./_components/AllLessons";
import { GetLessons } from "@/lib/apis/course.api";
import { Suspense } from "react";
import PurchasesSkeleton from "../../_Components/PurchasesSkeleton";

async function LessonsContent({ courseId }: { courseId: string }) {
  const Lessons = await GetLessons({ course_id: courseId });
  const LessonsData = Lessons && "data" in Lessons ? Lessons.data : undefined;
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
            <AllLessons UnitsData={LessonsData ?? []} />
          </TabsContent>
          <TabsContent value="ending">
            <AllLessons UnitsData={LessonsData ?? []} />
          </TabsContent>
          <TabsContent value="recent">
            <AllLessons UnitsData={LessonsData ?? []} />
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
  const { id } = await params;

  return (
    <Suspense fallback={<PurchasesSkeleton />}>
      <LessonsContent courseId={id} />
    </Suspense>
  );
}
