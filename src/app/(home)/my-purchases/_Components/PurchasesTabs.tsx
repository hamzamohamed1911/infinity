import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { placeholder } from "../../../../../public";

export default function PurchasesTabs({ data }: { data: MyPurchases }) {
  const { lesson = [], bundle = [], exam = [], book = [] } = data;
  const allPurchases = [...lesson, ...bundle, ...exam, ...book];

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // 🟡 الكورسات اللي هتخلص قريب (النهاردة أو بكرة)
  const endingSoon = allPurchases.filter((p) => {
    if (!p.ended_at) return false;
    const endDate = new Date(p.ended_at);
    return endDate >= today && endDate <= tomorrow;
  });

  // 🔴 الكورسات اللي انتهت فعلاً (الـ deadline عدّى)
  const deadlines = allPurchases.filter((p) => {
    if (!p.ended_at) return false;
    const endDate = new Date(p.ended_at);
    return endDate < today;
  });

  return (
    <Tabs dir="rtl" defaultValue="all" className="w-full my-8 sm:block">
      <TabsList
        className="w-full  gap-2 
            grid-cols-3 lg:grid sm:flex overflo-x-auto  whitespace-nowrap  h-18  p-3 rounded-md"
      >
        {" "}
        <TabsTrigger
          value="all"
          className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-neutral-800 rounded-md py-2"
        >
          الكل
        </TabsTrigger>
        <TabsTrigger
          value="ending"
          className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-neutral-800 rounded-md py-2"
        >
          هتخلص قريب
        </TabsTrigger>
        <TabsTrigger
          value="deadlines"
          className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-neutral-800 rounded-md py-2"
        >
          ديدلاينز
        </TabsTrigger>
      </TabsList>

      <div className="mt-10">
        <TabsContent value="all">
          <PurchaseGrid purchases={allPurchases} />
        </TabsContent>

        <TabsContent value="ending">
          <PurchaseGrid purchases={endingSoon} />
        </TabsContent>

        <TabsContent value="deadlines">
          <PurchaseGrid purchases={deadlines} />
        </TabsContent>
      </div>
    </Tabs>
  );
}

function PurchaseGrid({ purchases }: { purchases: Product[] }) {
  if (!purchases.length) {
    return (
      <p className="text-center text-neutral-800 py-10">
        لا يوجد عناصر في هذا القسم
      </p>
    );
  }

  // 🟢 خريطة الأنواع بالعربي
  const typeMap: Record<string, string> = {
    lesson: "درس",
    bundle: "كورس",
    exam: "اختبار",
    book: "كتاب",
    live: "محاضرة مباشرة",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {purchases.map((product) => {
        const typeKey =
          typeof product.product_type === "string"
            ? product.product_type
            : "unknown";
        const typeAr = typeMap[typeKey] || "محتوى";

        const image =
          product.product_image || product.product_thumbnail || placeholder;

        return (
          <Card
            key={product.id}
            className="overflow-hidden rounded-xl border border-gray-200"
          >
            <Image
              src={image}
              alt={product.product_name}
              width={600}
              height={600}
              className="w-full h-60 object-cover"
            />

            <CardContent className="p-4 space-y-3 text-start">
              <h3 className="text-lg font-bold text-gray-800">
                {product.product_name}
              </h3>

              <div className="w-full flex justify-end">
                <Badge className="font-medium text-sm text-white rounded-full px-2 py-1">
                  {typeAr}
                </Badge>
              </div>

              <p className="text-sm text-neutral-800">
                ينتهي في:
                <span className="font-medium ms-1">
                  {new Date(product.ended_at).toLocaleDateString("ar-EG")}
                </span>
              </p>

              <Link
                href={
                  product.product_type === "bundle"
                    ? `/course/${product.id}`
                    : `/${product.product_section_id || ""}/${product.id}`
                }
                className="group flex items-center justify-center gap-2 w-full h-12 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                اتفرج دلوقتي
                <IoIosArrowBack
                  size={20}
                  className="transform transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110"
                />
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
