"use client";

import { PieChart, Pie, Cell } from "recharts";

interface ChartItemProps {
  value: number; // نسبة مئوية
  total: number;
  completed: number;
  color: string;
  label?: string;
  type: string;
}

const ProfileCharts = ({
  value,
  total,
  completed,
  color,
  label,
  type,
}: ChartItemProps) => {
  const data = [
    { name: "Completed", value },
    { name: "Remaining", value: 100 - value },
  ];

  return (
    <div className="bg-white rounded-xl px-4 py-6  shadow  gap-4 flex flex-col items-center">
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
          {value.toFixed(1)}%
        </p>
      </div>

      <div
        style={{ border: `2px solid ${color}` }}
        className="h-10 rounded-3xl w-auto   bg-white flex justify-center items-center md:text-md text-sm"
      >
        <span
          style={{ backgroundColor: color }}
          className={
            " rounded-3xl text-white h-full w-1/2 flex justify-center items-center px-4 whitespace-nowrap"
          }
        >
          {completed} {type}
        </span>
        <span
          style={{ color: color }}
          className=" rounded-3xl bg-transparent h-full w-1/2 flex justify-center items-center px-4 whitespace-nowrap"
        >
          من {total}
        </span>
      </div>
      {label && (
        <p className="text-base font-medium  text-neural-800">{label}</p>
      )}
    </div>
  );
};

export default ProfileCharts;
