"use client";

import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useSearch } from "@/lib/hooks/useSearch";
import Image from "next/image";
import { placeholder } from "../../../public";
import { useDebounce } from "@/lib/hooks/useDebounce";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

const truncate = (text: string, length = 80) => {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
};

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);

  const teacher_id = "6569";
  const debouncedKeyword = useDebounce(keyword, 500);

  const { data, isLoading, isError } = useSearch(teacher_id, debouncedKeyword);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex items-center   w-full md:w-80">
        <div className="relative w-full">
          {/* Input */}
          <div className="relative w-full">
            <PopoverTrigger asChild>
              <Input
                type="text"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setOpen(true); // يفتح أول ما يكتب
                }}
                onFocus={() => setOpen(true)}
                className="pe-10 bg-white rounded-3xl shadow-sm h-10"
                placeholder="ابحث هنا..."
              />
            </PopoverTrigger>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>

          {/* Results */}
          <PopoverContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="w-full lg:w-80 p-0 max-h-96 overflow-y-auto"
          >
            {isLoading && (
              <p className="p-3 text-gray-500 text-sm">جاري التحميل...</p>
            )}
            {isError && (
              <p className="p-3 text-red-500 text-sm">
                حصل خطأ في جلب البيانات، حاول مرة تانية
              </p>
            )}

            {data && !data.success && (
              <p className="p-3 text-gray-500 text-sm">{data.message}</p>
            )}

            {data && data.success && data.data && (
              <div className="divide-y">
                {/* الدروس */}
                {data.data.lessons.length > 0 && (
                  <div className="p-3">
                    <p className="font-semibold mb-2 text-gray-700">الدروس</p>
                    <div className="space-y-2">
                      {data.data.lessons.map((lesson: Lesson) => (
                        <div key={lesson.id}>
                          <Link
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer border"
                            href={`/${lesson.section_id}/${lesson.id}`}
                          >
                            {lesson.thumbnail || lesson.image ? (
                              <div className="w-12 h-12 rounded-md overflow-hidden">
                                <Image
                                  src={
                                    lesson.thumbnail ??
                                    lesson.image ??
                                    placeholder
                                  }
                                  alt={lesson.name ?? "Lesson"}
                                  width={50}
                                  height={50}
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <Image
                                src={placeholder}
                                alt={lesson.name}
                                width={50}
                                height={50}
                                className="rounded-md object-cover"
                              />
                            )}

                            <div className="flex-1">
                              <p className="font-medium text-gray-800">
                                {lesson.name}
                              </p>
                              {lesson.description && (
                                <p className="text-xs text-gray-500">
                                  {truncate(lesson.description)}
                                </p>
                              )}
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* الباقات */}
                {data.data.bundles.length > 0 && (
                  <div className="p-3">
                    <p className="font-semibold mb-2 text-gray-700">الكورسات</p>
                    <div className="space-y-2">
                      {data.data.bundles.map((bundle: Bundle) => (
                        <div key={bundle.id}>
                          <Link
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer border"
                            href={`/course/${bundle.id}`}
                          >
                            {bundle.thumbnail ? (
                              <div className="w-12 h-12 rounded-md overflow-hidden">
                                <Image
                                  src={bundle.thumbnail}
                                  alt={bundle.name}
                                  width={50}
                                  height={50}
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <Image
                                src={placeholder}
                                alt={bundle.name}
                                width={50}
                                height={50}
                                className="rounded-md object-cover"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">
                                {bundle.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {truncate(bundle.description ?? "")}
                              </p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* الامتحانات */}
                {data.data.exams.length > 0 && (
                  <div className="p-3">
                    <p className="font-semibold mb-2 text-gray-700">
                      الامتحانات
                    </p>
                    <div className="space-y-2">
                      {data.data.exams.map((exam: Exam) => (
                        <div key={exam.id}>
                          <Link
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer border"
                            href={`/${exam?.section_id}/exams/${exam.id}`}
                          >
                            {exam.image ? (
                              <div className="w-12 h-12 rounded-md overflow-hidden">
                                <Image
                                  src={exam.image ?? exam.image ?? placeholder}
                                  alt={exam.name ?? "Lesson"}
                                  width={50}
                                  height={50}
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <Image
                                src={placeholder}
                                alt={exam.name}
                                width={50}
                                height={50}
                                className="rounded-md object-cover"
                              />
                            )}

                            <div className="flex-1">
                              <p className="font-medium text-gray-800">
                                {exam.name}
                              </p>
                              {exam.description && (
                                <p className="text-xs text-gray-500">
                                  {truncate(exam.description)}
                                </p>
                              )}
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* الوحدات */}
                {data.data.units.length > 0 && (
                  <div className="p-3">
                    <p className="font-semibold mb-2 text-gray-700">الوحدات</p>
                    <div className="space-y-2">
                      {data.data.units.map((unit: Unit) => (
                        <div key={unit.id}>
                          <Link
                            href={`/${unit.id}`}
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer border"
                          >
                            {unit.image ? (
                              <div className="w-12 h-12 rounded-md overflow-hidden">
                                <Image
                                  src={unit.image ?? unit.image ?? placeholder}
                                  alt={unit.name ?? "unit"}
                                  width={50}
                                  height={50}
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <Image
                                src={placeholder}
                                alt={unit.name}
                                width={50}
                                height={50}
                                className="rounded-md object-cover"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">
                                {unit.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {truncate(unit.description)}
                              </p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </PopoverContent>
        </div>
      </div>
    </Popover>
  );
};

export default SearchBox;
