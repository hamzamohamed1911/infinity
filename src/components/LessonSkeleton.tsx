"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function LessonSkeleton() {
  return (
    <section className="flex flex-col gap-4 w-full animate-pulse">
      {/* breadcrumb placeholder */}
      <Skeleton className="h-6 w-1/3 rounded-md" />

      <div className="grid md:grid-cols-12 grid-cols-1 lg:gap-8 md:gap-6 gap-4">
        {/* اليسار */}
        <div className="col-span-12 md:col-span-7 flex flex-col gap-4">
          {/* التابس */}
          <Tabs dir="rtl" defaultValue="player1" className="w-full my-8">
            <TabsList className="w-full flex gap-2 overflow-x-auto">
              {[1, 2, 3].map((i) => (
                <TabsTrigger
                  key={i}
                  value={`player${i}`}
                  className="rounded-md border border-[#99E35D] px-4 py-2 text-sm"
                >
                  <Skeleton className="h-5 w-20" />
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="mt-6">
              <TabsContent value="player1">
                <Skeleton className="w-full 2xl:min-h-96 min-h-72 rounded-lg" />
              </TabsContent>
              <TabsContent value="player2">
                <Skeleton className="w-full h-20 rounded-lg" />
              </TabsContent>
              <TabsContent value="player3">
                <Skeleton className="w-full h-20 rounded-lg" />
              </TabsContent>
            </div>
          </Tabs>

          {/* كارد المحتوى */}
          <Card className="w-full lg:p-8 md:p-6 p-4 flex flex-col gap-6">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-20 w-full rounded-md" />

            <div className="flex flex-col gap-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-6 w-1/3" />
            </div>

            <div className="flex justify-between gap-4 mt-4">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </Card>
        </div>

        {/* اليمين */}
        <div className="col-span-12 md:col-span-5">
          <Card className="w-full p-4">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[1, 2].map((_, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>
                    <Skeleton className="h-6 w-2/3 rounded-md" />
                  </AccordionTrigger>
                  <AccordionContent>
                    {[1, 2, 3].map((_, j) => (
                      <div
                        key={j}
                        className="border border-primary p-4 rounded-md flex justify-between items-center gap-2 mb-2"
                      >
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-5 w-5 rounded" />
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </div>
    </section>
  );
}
