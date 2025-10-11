import { Suspense } from "react";
import { GetExams } from "@/lib/apis/exams.api";
import ExamsComponent from "@/app/(home)/my-purchases/_Components/ExamsComponent";
import PurchasesSkeleton from "@/app/(home)/my-purchases/_Components/PurchasesSkeleton";
import NoDataMessage from "@/components/NoDataMessage";

async function HomeWorksContent({ courseId }: { courseId: string }) {
  const HomeWorks = await GetExams({ course_id: courseId, assessment_type: 2 });

  const HomeWorksData = HomeWorks && "data" in HomeWorks ? HomeWorks.data : [];
  const availableHomeWorks =
    HomeWorksData?.filter(
      (homework) => homework.available_exam === 1 && Number(homework.price) > 0
    ) ?? [];

  return (
    <section>
      <div className="mt-6">
        {availableHomeWorks.length > 0 ? (
          <ExamsComponent
            type="homework"
            ExamsData={availableHomeWorks ?? []}
          />
        ) : (
          <NoDataMessage text="لا توجد واجابات متاحة للشراء حاليًا " />
        )}
      </div>
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
      <HomeWorksContent courseId={id} />
    </Suspense>
  );
}
