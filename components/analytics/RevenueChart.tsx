"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DailyRevenue } from "@/types";

interface RevenueChartProps {
  data: DailyRevenue[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  // Format date "2024-01-15" → "Jan 15"
  const formatted = data.map((d) => ({
    ...d,
    date: new Date(d._id).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Revenue — Last 7 Days
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) => {
              const numericValue = typeof value === "number" ? value : Number(value ?? 0);
              return [`$${numericValue.toFixed(2)}`, "Revenue"];
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ fill: "#2563eb" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}