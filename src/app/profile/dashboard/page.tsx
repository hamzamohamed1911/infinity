import { Suspense } from "react";
import ProfileCharts from "../_profileComponents/ProfileCharts";

async function DahsboardContnet() {
  const dataList = [
    {
      value: 52,
      total: 30,
      completed: 16,
      color: "#AE5DEB",
      label: "عدد الفيديوهات اللي شوفتها",
    },
    {
      value: 52,
      total: 30,
      completed: 16,
      color: "#769FE5",
      label: "عدد الكتب اللي حملتها",
    },
    {
      value: 52,
      total: 30,
      completed: 16,
      color: "#99E35D",
      label: "عدد الاختبارات اللي خلصتها",
    },
  ];
  return (
    <section className="min-h-screen w-full flex flex-col gap-4">
      <h1 className="font-bold text-3xl text-secondary my-4">
        لوحة التحكم
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {dataList.map((item, index) => (
          <ProfileCharts key={index} {...item} />
        ))}
      </div>
    </section>
  );
}

export default function page() {
  return (
    <Suspense fallback={<div>loadding....</div>}>
      <DahsboardContnet />
    </Suspense>
  );
}
