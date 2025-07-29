"use client";

import { PieChart, Pie, Cell } from "recharts";

interface ChartItemProps {
  value: number; // نسبة مئوية
  total: number;
  completed: number;
  color: string;
  label: string;
}

const ProfileCharts = ({
  value,
  total,
  completed,
  color,
  label,
}: ChartItemProps) => {
  const data = [
    { name: "Completed", value },
    { name: "Remaining", value: 100 - value },
  ];

  return (
    <div className="bg-white rounded-xl px-4 py-6 shadow  gap-4 flex flex-col items-center">
      <div className="relative  h-[120px]">
        <PieChart width={120} height={120}>
          <Pie
            data={data}
            innerRadius={43}
            outerRadius={60}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#A6B7D4" />
          </Pie>
        </PieChart>

        {/* نسبة مئوية في منتصف الدائرة */}
        <p
          className="absolute inset-0 flex items-center justify-center text-xl font-bold"
          style={{ color }}
        >
          {value}%
        </p>
      </div>

      <p className="text-md font-normal text-[#8E8E8E] ">
        <span className="font-bold" style={{ color }}>
          {completed}
        </span>
        من
        {total}
      </p>

      <p className="text-base font-medium  text-secondary">{label}</p>
    </div>
  );
};

export default ProfileCharts;
