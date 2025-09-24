import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Suspense } from "react";
import UnitSkeleton from "@/components/UnitSkeleton";
import AllCourses from "./_components/AllCourses";
import { GetCoursesbundles } from "@/lib/apis/course.api";

async function UnitsContent({ courseId }: { courseId: string }) {
  const courses = await GetCoursesbundles({ course_id: courseId });
  const ClassesData = courses && "data" in courses ? courses.data : undefined;

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
            كورساتى
          </TabsTrigger>
          <TabsTrigger
            value="ending"
            className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-[#606060] rounded-md py-3"
          >
            هتخلص قريب
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="all">
            <AllCourses CoursesData={ClassesData ?? []} />
          </TabsContent>
          <TabsContent value="ending">ending</TabsContent>
          <TabsContent value="recent">recent</TabsContent>
        </div>
      </Tabs>
    </section>
  );
}

export default function page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<UnitSkeleton />}>
      <UnitsContent courseId={params.id} />
    </Suspense>
  );
}
