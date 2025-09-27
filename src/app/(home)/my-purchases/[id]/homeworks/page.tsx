import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Suspense } from "react";
import ExamsComponent from "../../_Components/ExamsComponent";
import { GetExams } from "@/lib/apis/exams.api";
import PurchasesSkeleton from "../../_Components/PurchasesSkeleton";

async function HomeWorksContent({ courseId }: { courseId: string }) {
  const HomeWorks = await GetExams({ course_id: courseId, assessment_type: 2 });

  const HomeWorksData = HomeWorks && "data" in HomeWorks ? HomeWorks.data : [];
  // اليوم + بكرة
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const DeadlinesHomeWorks = HomeWorksData?.filter((exam) => {
    if (!exam.end_date) return false;
    const endDate = new Date(exam.end_date);
    return (
      endDate.toDateString() === today.toDateString() ||
      endDate.toDateString() === tomorrow.toDateString()
    );
  });

  const SolvedExamsData = HomeWorksData?.filter((exam) => exam.is_attempted);
  return (
    <section>
      <Tabs dir="rtl" defaultValue="all" className="w-full my-8">
        <TabsList
          className="w-full  gap-2 
            grid-cols-3 lg:grid sm:flex overflo-x-auto  whitespace-nowrap bg-[#F5F5F5] h-18  p-3 rounded-md"
        >
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-neural-800 rounded-md py-3"
          >
            الكل
          </TabsTrigger>
          <TabsTrigger
            value="Deadlines"
            className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-neural-800 rounded-md py-3"
          >
            ديدلاينز
          </TabsTrigger>
          <TabsTrigger
            value="Solved"
            className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-neural-800 rounded-md py-3"
          >
            تم حلها
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="all">
            <ExamsComponent type="homework" ExamsData={HomeWorksData ?? []} />
          </TabsContent>
          <TabsContent value="Deadlines">
            <ExamsComponent
              type="homework"
              ExamsData={DeadlinesHomeWorks ?? []}
            />
          </TabsContent>
          <TabsContent value="Solved">
            <ExamsComponent type="homework" ExamsData={SolvedExamsData ?? []} />
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
  // نفك الـPromise
  const { id } = await params;

  return (
    <Suspense fallback={<PurchasesSkeleton />}>
      <HomeWorksContent courseId={id} />
    </Suspense>
  );
}
