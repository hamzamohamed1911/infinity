"use client";

import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useSearch } from "@/lib/hooks/useSearch";
import Image from "next/image";
import { placeholder } from "../../../public";

const truncate = (text: string, length = 80) => {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
};

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const teacher_id = "6569"; // أو تاخده من props

  const { data, isLoading, isError } = useSearch(teacher_id, keyword);

  return (
    <div className="flex items-center">
      <div className="relative w-full md:w-80">
        {/* Input */}
        <div className="relative w-full">
          <Input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="pe-10 bg-white rounded-3xl shadow-sm"
            placeholder="ابحث هنا..."
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>

        {/* Results */}
        {keyword.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border max-h-96 overflow-y-auto z-50">
            {isLoading && (
              <p className="p-3 text-gray-500 text-sm">جاري التحميل...</p>
            )}
            {isError && (
              <p className="p-3 text-red-500 text-sm">
                حصل خطأ في جلب البيانات، حاول مرة تانية
              </p>
            )}

            {/* ✅ لو مفيش نتائج */}
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
                        <div
                          key={lesson.id}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer border"
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
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* الباقات */}
                {data.data.bundles.length > 0 && (
                  <div className="p-3">
                    <p className="font-semibold mb-2 text-gray-700">الباقات</p>
                    <div className="space-y-2">
                      {data.data.bundles.map((bundle: Bundle) => (
                        <div
                          key={bundle.id}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer border"
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
                        <div
                          key={exam.id}
                          className="p-2 rounded-md hover:bg-gray-50 cursor-pointer border"
                        >
                          <p className="font-medium text-gray-800">
                            {exam.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {truncate(exam.description ?? "")}
                          </p>
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
                        <div
                          key={unit.id}
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
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
