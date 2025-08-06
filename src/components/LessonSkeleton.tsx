"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function LessonSkeleton() {
  return (
    <section className="flex flex-col gap-4 w-full animate-pulse h-full">
      {/* Breadcrumb placeholder */}
      <Skeleton className="h-6 w-1/3 rounded-md" />

      <div className="grid md:grid-cols-12 grid-cols-1 lg:gap-8 md:gap-6 gap-4">
        {/* Left side (main content) */}
        <div className="col-span-12 md:col-span-7 flex flex-col gap-4">
          {/* Tabs placeholder */}
          <div className="w-full my-8">
            <div className="w-full bg-transparent gap-2 justify-start flex overflow-x-auto whitespace-nowrap my-2">
              {[1, 2, 3].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-10 w-24 rounded-md border border-[#99E35D]"
                />
              ))}
            </div>
            {/* Image placeholder */}
            <Card className="w-full lg:p-8 md:p-6 p-4 flex flex-col lg:gap-6 gap-4">
            {/* Course details placeholder */}
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-20 w-full rounded-md" />

            {/* Views, exam, and assignment placeholders */}
            <div className="flex flex-col lg:gap-8 md:gap-6 gap-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-6 w-1/3" />
            </div>

            {/* Navigation buttons placeholder */}
            <div className="flex justify-between gap-4">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </Card>
          </div>

          {/* Content card */}
          
        </div>

        {/* Right side (sub-lessons) */}
        <div className="col-span-12 md:col-span-5">
          <Card className="w-full p-4">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[1, 2, 3].map((_, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="md:text-xl text-lg border px-4 py-4 rounded-lg">
                    <Skeleton className="h-6 w-2/3 rounded-md" />
                  </AccordionTrigger>
                  <AccordionContent>
                    {[1, 2, 3].map((_, j) => (
                      <div
                        key={j}
                        className="border border-primary p-4 flex justify-between items-center gap-2 mb-2"
                      >
                        <div className="flex gap-2 items-center">
                          <Skeleton className="h-6 w-6 rounded" />
                          <Skeleton className="h-5 w-40" />
                        </div>
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