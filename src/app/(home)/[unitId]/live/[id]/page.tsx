import { GetLive } from "@/lib/apis/course.api";
import LessonSkeleton from "@/components/LessonSkeleton";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TiAttachmentOutline } from "react-icons/ti";

async function LessonContent() {
  const cookieStore = await cookies();
  const selectedId = cookieStore.get("selected_course_id")?.value;
  if (!selectedId || selectedId === "undefined") {
    redirect("/my-classes");
  }

  const live = await GetLive({ class_id: selectedId });
  const liveData: LiveItem[] = Array.isArray(live?.data) ? live.data : [];

  const firstLive = liveData[0];

  if (!firstLive) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-neural-500">
        لا توجد محاضرات متاحة حاليًا
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-6 w-full p-6  min-h-screen">
      {/* الفيديو */}
      <div className="max-w-4xl mx-auto w-full">
        {firstLive.live_link && (
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md">
            <iframe
              src={firstLive.live_link.replace("watch?v=", "embed/")}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto w-full bg-white rounded-xl shadow p-6 flex flex-col gap-4 ">
        <h1 className="text-2xl font-bold text-primary">{firstLive.name}</h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-primary-700">
          <span className=" text-primary px-3 py-1 rounded-lg">
            {firstLive.section_name}
          </span>
        </div>

        {/* الوصف */}
        {firstLive.description && (
          <p className="text-neural-700 leading-relaxed">
            {firstLive.description}
          </p>
        )}

        {/* المرفقات */}
        {Array.isArray(firstLive.attachments) &&
          firstLive.attachments.length > 0 && (
            <div className="mt-2">
              <div className="flex gap-2 items-center">
                <TiAttachmentOutline className="text-primary text-lg" />
                <h3 className="font-semibold text-primary mb-2">المرفقات:</h3>
              </div>
              <ul className="list-disc list-inside space-y-1">
                {firstLive.attachments.map((url, i) => (
                  <li key={i}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary-700 underline hover:text-secondary-900"
                    >
                      تحميل المرفق {i + 1}
                    </a>
                  </li>
                ))}
              </ul>
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
