import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useTrend } from "@/hooks/useTrend";
import { useSearch } from "@tanstack/react-router";
import { Loader } from "./common/Loader";


export default function RevenueSnapshot() {
  const search = useSearch({ strict: false });
  const year = search.year ?? "all";
  // const quarter = search.quarter ?? "all";
  // const category = search.category ?? "all";
 
  const {data:wholeData, error, isLoading} = useTrend({year, groupBy:"quarter"})

  if(isLoading){
    return (
      <div className="flex justify-center items-center mt-10 min-h-[256px]">
        <Loader title="Loading..." className="size-8"/>
      </div>
    );
  }
  if(error){
    return(
      <div className="flex justify-center mt-10">
        {error.message}
      </div>
    )
  }
  function transformToChartData() {
    const revenueSeries = wholeData?.series.find(s => s.name === "Revenue");

    if (!revenueSeries) return [];

    return wholeData?.labels.map((label, index) => {
      // convert "2022-Q1" -> "22-Q1"
      const [year, quarter] = label.split("-");
      const shortYear = year.slice(2);

      return {
        quarter: `${shortYear}-${quarter}`,
        revenue: revenueSeries.data[index] ?? 0,
      };
    });
  }
  const data = transformToChartData()

  return (
    <Card className="rounded-xl shadow-sm border bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-gray-700">
          Quarterly Revenue Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />

            <XAxis
              dataKey="quarter"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => v.toLocaleString()}
            />

            <Tooltip
              formatter={(value) =>
                typeof value === "number" ? `₹${value.toLocaleString()}` : value
              }
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#4f46e5"
              strokeWidth={2.5}
              fill="url(#colorRevenue)"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
