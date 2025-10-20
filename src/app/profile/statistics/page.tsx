import { Suspense } from "react";
import ProfileCharts from "../_profileComponents/ProfileCharts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GetStatistics } from "@/lib/apis/profile.api";
import ProfileChartsSkeleton from "../_profileComponents/ProfileChartsSkeleton";

async function DahsboardContnet() {
  const cookieStore = await cookies();
  const selectedId = cookieStore.get("selected_course_id")?.value;

  if (!selectedId || selectedId === "undefined") {
    redirect("/my-classes");
    return;
  }
  const Statistics = await GetStatistics(selectedId);
  const dataList = [
    {
      value:
        (Statistics.data.lessons.sub / Statistics.data.lessons.total) * 100,
      total: Statistics.data.lessons.total,
      completed: Statistics.data.lessons.sub,
      color: "#AE5DEB",
      label: "عدد الدروس اللي درستها",
      type: "درس",
    },
    {
      value: (Statistics.data.books.sub / Statistics.data.books.total) * 100,
      total: Statistics.data.books.total,
      completed: Statistics.data.books.sub,
      color: "#769FE5",
      label: "عدد الكتب اللي حملتها",
      type: "كتاب",
    },
    {
      value: (Statistics.data.exams.sub / Statistics.data.exams.total) * 100,
      total: Statistics.data.exams.total,
      completed: Statistics.data.exams.sub,
      color: "#99E35D",
      label: "عدد الاختبارات اللي خلصتها",
      type: "اختبار",
    },
    {
      value:
        (Statistics.data.courses.sub / Statistics.data.courses.total) * 100,
      total: Statistics.data.courses.total,
      completed: Statistics.data.courses.sub,
      color: "#1ABC9C",
      label: "عدد الكورسات اللي سجلتها",
      type: "كورسات",
    },
  ];

  return (
    <section className="min-h-screen w-full flex flex-col gap-4">
      <h1 className="font-bold lg:text-3xl text-2xl text-neural-800 my-4 ">
        إحصائيات
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 ">
        {dataList.map((item, index) => (
          <ProfileCharts key={index} {...item} />
        ))}
      </div>
    </section>
  );
}

export default async function page() {
  return (
    <Suspense fallback={<ProfileChartsSkeleton />}>
      <DahsboardContnet />
    </Suspense>
  );
}
