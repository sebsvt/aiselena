"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
  LabelList,
} from "recharts";

const data = [
  { day: "Mon", amount: 540 },
  { day: "Tue", amount: 320 },
  { day: "Wed", amount: 680 },
  { day: "Thu", amount: 420 },
  { day: "Fri", amount: 890 },
  { day: "Sat", amount: 720 },
  { day: "Sun", amount: 560 },
];

export function WeeklyActivity() {
  const formatAmount = (amount: number) => `$${amount}`;

  return (
    <div className="rounded-xl border p-6 shadow-sm">
      <h2 className="text-sm font-medium :text-gray-400 mb-4">
        Weekly Activity
      </h2>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <YAxis hide={true} />
            <Bar
              dataKey="amount"
              radius={[4, 4, 0, 0]}
              className="fill-blue-700"
            >
              <LabelList
                dataKey="amount"
                position="top"
                formatter={formatAmount}
                className="fill-gray-600 dark:fill-gray-300"
                fontSize={12}
              />
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className=" dark:fill-blue-600 dark:hover:fill-blue-500 transition-colors"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
