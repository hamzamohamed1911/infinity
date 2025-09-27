import { GetLive } from "@/lib/apis/course.api";
import LessonSkeleton from "@/components/LessonSkeleton";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function LessonContent() {
  const cookieStore = await cookies();
  const selectedId = cookieStore.get("selected_course_id")?.value;
  if (!selectedId || selectedId === "undefined") {
    redirect("/my-classes");
  }
  const live = await GetLive({ class_id: selectedId });
  const liveData: LiveItem[] = Array.isArray(live?.data) ? live.data : [];

  // ناخد أول لايف مثلاً
  const firstLive = liveData[0];

  return (
    <section className="flex flex-col gap-4 w-full p-4">
      <div className="max-w-3xl mx-auto w-full">
        {firstLive?.live_link && (
          <div className="w-full aspect-video">
            <iframe
              src={firstLive.live_link.replace("watch?v=", "embed/")}
              className="w-full h-full rounded-lg"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LessonContent />
    </Suspense>
  );
}
