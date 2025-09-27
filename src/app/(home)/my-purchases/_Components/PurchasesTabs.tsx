"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GetStudentPurchase } from "@/lib/apis/statistics.api";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { placeholder } from "../../../../../public";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export default function PurchasesTabs() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    StudentPurchaseResponse,
    Error,
    InfiniteData<StudentPurchaseResponse>,
    [_key: string],
    number
  >({
    queryKey: ["student-purchase"],
    queryFn: async ({ pageParam = 1 }) => {
      return GetStudentPurchase({ page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.current_page < lastPage.last_page
        ? lastPage.current_page + 1
        : undefined;
    },
  });

  const allpurchase = data?.pages.flatMap((page) => page.data) ?? [];
  const typeMap: Record<string, string> = {
    lesson: "درس",
    exam: "امتحان",
    course: "دورة",
  };
  console.log(allpurchase);
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="animate-pulse bg-gray-200 h-80 rounded-2xl"
            />
          ))}
        </div>
      </div>
    );
  }
  console.log(error);
  if (isError) {
    return (
      <p className="text-center text-red-500">حدث خطأ أثناء تحميل البيانات</p>
    );
  }
  return (
    <>
      <Tabs dir="rtl" defaultValue="all" className="w-full my-8  sm:block">
        <TabsList className="w-full bg-transparent gap-2 grid-cols-4 lg:grid sm:flex overflo-x-auto  whitespace-nowrap">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-neural-800 rounded-md py-2"
          >
            الكل
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-neural-800 rounded-md py-2"
          >
            آخر المشاهدات
          </TabsTrigger>
          <TabsTrigger
            value="ending"
            className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-neural-800 rounded-md py-2"
          >
            هتخلص قريب
          </TabsTrigger>
          <TabsTrigger
            value="deadlines"
            className="data-[state=active]:bg-primary lg:text-xl md:text-lg text-sm data-[state=active]:text-white bg-white text-neural-800 rounded-md py-2"
          >
            ديدلاينز
          </TabsTrigger>
        </TabsList>

        <div className="mt-16 ">
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allpurchase.map((purchase) => {
                const product = purchase.product;
                const typeAr =
                  typeMap[purchase.product_type] ?? purchase.product_type;
                return (
                  <Card
                    key={purchase.id}
                    className="overflow-hidden  rounded-xl border border-gray-200 "
                  >
                    <Image
                      src={product.image || product.thumbnail || placeholder}
                      alt={product.name}
                      width={600}
                      height={600}
                      className="w-full h-60 object-cover"
                    />
                    <CardContent className="p-4 space-y-3 text-start">
                      <h3 className="text-lg font-bold text-gray-800">
                        {product.name}
                      </h3>
                      <div className=" w-full flex justify-end items-end ">
                        <Badge className="font-medium text-sm text-white rounded-full px-2 py-1">
                          {typeAr}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        تاريخ الشراء:
                        <span className="font-medium">
                          {new Date(purchase.purchase_date).toLocaleDateString(
                            "ar-EG"
                          )}
                        </span>
                      </p>
                      <Link
                        href={`/${product.section_id}/${product.id}`}
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
          </TabsContent>
          <TabsContent value="ending">محتوى هتخلص قريب</TabsContent>
          <TabsContent value="recent">محتوى آخر المشاهدات</TabsContent>
          <TabsContent value="deadlines">محتوى ديدلاينز</TabsContent>
        </div>
      </Tabs>
      {hasNextPage && (
        <div className="mt-auto pb-8 flex items-center justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={`bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-400 transition-colors ${
              isFetchingNextPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isFetchingNextPage ? "جارٍ التحميل..." : "عرض المزيد"}
          </button>
        </div>
      )}
    </>
  );
}
