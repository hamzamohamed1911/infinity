"use client";

import { PieChart, Pie, Cell } from "recharts";

export default function ExamPieChart({
  percentage,
  color,
  total,
  completed,
}: {
  percentage: number;
  color: string;
  total: number;
  completed: number;
}) {
  const data = [
    { name: "completed", value: percentage },
    { name: "remaining", value: 100 - percentage },
  ];

  return (
    <div className="relative">
      <PieChart width={80} height={80}>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={30}
          outerRadius={38}
          startAngle={90}
          endAngle={-270}
          stroke="none"
        >
          <Cell fill={color} />
          <Cell fill="#E5E7EB" />
        </Pie>
      </PieChart>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-semibold text-gray-800">
          {Math.round(percentage)}%
        </span>
        <span className="text-[9px] text-gray-500">
          {completed}/{total}
        </span>
      </div>
    </div>
  );
}
