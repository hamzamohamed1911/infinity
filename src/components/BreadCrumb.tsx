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

export function BreadCrumb({ 
  unitData, 
  lessonData, 
  ExamData, 
  examType = "exam" 
}: { 
  unitData: CourseDetails; 
  lessonData?: LessonDetails; 
  ExamData?: ExamDetails;
  examType?: "exam" | "homework";
}) {
  const params = useParams(); 

  return (
    <Breadcrumb className="text-secondary font-semibold p-4 gap-4" dir="rtl">
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
        {ExamData && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem >
                <BreadcrumbPage>
                {examType === "homework"
                  ? `واجب ${ExamData?.name || "الواجب"}`
                  : `إمتحان ${ExamData?.name || "الامتحان"}`}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
