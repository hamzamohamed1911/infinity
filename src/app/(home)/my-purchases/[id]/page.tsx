import { mypurchases } from "@/lib/apis/course.api";
import { Suspense } from "react";
import PurchasesSkeleton from "../_Components/PurchasesSkeleton";
import PurchasesTabs from "../_Components/PurchasesTabs";

async function LessonsContent() {
  const purchase = await mypurchases();
  const purchaseData =
    purchase && "data" in purchase ? purchase.data : undefined;
  console.log(purchaseData);
  return (
    <section>
      <Suspense fallback={<PurchasesSkeleton />}>
        <PurchasesTabs
          data={purchaseData || { lesson: [], bundle: [], exam: [], book: [] }}
        />
      </Suspense>
    </section>
  );
}

export default async function Page() {
  return (
    <Suspense fallback={<PurchasesSkeleton />}>
      <LessonsContent />
    </Suspense>
  );
}
