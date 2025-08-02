'use client';

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";

export function BreadCrumb({ unitData, lessonData }: { unitData: CourseDetails; lessonData?: LessonDetails }) {
  const params = useParams(); // { unitId: "256", lessonId: "45", ... }

  return (
    <Breadcrumb className="text-secondary font-semibold" dir="rtl">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">الرئيسية</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${params.unitId}`}>
              {unitData?.name || "الوحدة"}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {lessonData && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{lessonData?.name || "الدرس"}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
