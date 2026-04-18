import type { TrendData } from "@/hooks/useTrend";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipContentProps,
} from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

type LineGraphProps = {
  wholeData:TrendData|undefined
}
export default function LineGraph({ wholeData }:LineGraphProps) {

  const [hiddenLines, setHiddenLines] = useState<{[key:string]:boolean}>({});
  const toggleLine = (key:string) => {
    setHiddenLines((prev) => ({ ...prev, [key]: !prev[key]}));
  };
  function transformToChartData() {
    const revenueSeries = wholeData?.series.find(s => s.name === "Revenue");
    const unitsSeries = wholeData?.series.find(s => s.name === "Units");
    const profitSeries = wholeData?.series.find(s => s.name === "Profit");

    if (!revenueSeries) return [];
    const data =  wholeData?.labels.map((label, index) => {
      // convert "2022-Q1" -> "22-Q1"
      const [year, quarter] = label.split("-");
      const shortYear = year.slice(2);

      return {
        quarter: `${shortYear}-${quarter}`,
        revenue: revenueSeries.data[index] ?? 0,
        units: unitsSeries!.data[index]??0,
        profit: profitSeries!.data[index]??0
      };
    });
    return data;
  }
  const data = transformToChartData()

  return(
    <>
      <div className="flex gap-4 mb-4 flex-wrap">
        {[
          { key: "revenue", label: "Revenue", color: "#4f46e5" },
          { key: "units", label: "Units", color: "#f59e0b" },
          { key: "profit", label: "Profit", color: "#10b981" },
        ].map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => toggleLine(key)}
              className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all"
              style={{
                borderColor: hiddenLines[key] ? "#e2e8f0" : color,
                color: hiddenLines[key] ? "#94a3b8" : color,
                background: hiddenLines[key] ? "#f8fafc" : `${color}10`,
              }}
            >
              <span
                className="w-3 h-1.5 rounded-full inline-block"
                style={{ background: hiddenLines[key] ? "#cbd5e1" : color }}
              />
              {label}
            </button>
          ))}
        <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="quarter"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            yAxisId="left"
            tickFormatter={formatRevenue}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            width={55}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={formatProfit}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }} />
          {!hiddenLines.revenue && (
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#4f46e5"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          )}
          {!hiddenLines.units && (
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="units"
              name="Units"
              stroke="#f59e0b"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
              strokeDasharray="5 3"
            />
          )}
          {!hiddenLines.profit && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="profit"
              name="Profit"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      </div>
    </>
  )
}

const CustomTooltip = ({ active, payload, label }:TooltipContentProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-sm min-w-[180px]">
        <p className="font-semibold text-slate-700 mb-2 border-b border-slate-100 pb-1">{label}</p>
        {payload.map((entry, index) => (
          <div
           key={`${entry.dataKey}-${index}`} className="flex justify-between gap-4 py-0.5">
            <span className="flex items-center gap-1.5 text-slate-500">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>
            <span className="font-medium text-slate-800">
              {typeof entry.value == "number"? entry.dataKey === "profit"
                ? formatProfit(entry.value)
                : formatRevenue(entry.value)
                :""
              }
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const formatRevenue = (value:number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value;
};
 
const formatProfit = (value:number) => {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value;
};
