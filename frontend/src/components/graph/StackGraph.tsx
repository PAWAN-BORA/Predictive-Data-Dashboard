import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipContentProps,
} from "recharts";
import type { CategoryConfig, QuarterData } from "../comparision/Comparison";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { formatValue } from "@/lib/utils";



type StackedGraphProps = {
  chartData:QuarterData[]
  categories:CategoryConfig[]
}
export default function StackedGraph({chartData, categories}:StackedGraphProps) {
  const [hiddenBars, setHiddenBars] = useState<Record<string, boolean>>({});
  const handleToggle = (key: string) =>
    setHiddenBars((prev) => ({ ...prev, [key]: !prev[key] }));

  const visibleCategories = categories.filter((c) => !hiddenBars[c.key]);
  return(
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <ChartHeader />
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 12, left: 4, bottom: 0 }}
          barSize={64}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="quarter"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={(v) => formatValue(v as number)}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            width={48}
          />
          <Tooltip content={(props)=><BarTooltip categories={categories} {...props}  />} cursor={{ fill: "#f8fafc" }} />          {visibleCategories.map((cat, idx) => (
            <Bar
              key={cat.key}
              dataKey={cat.key}
              stackId="stack"
              fill={cat.color}
              radius={
                idx === visibleCategories.length - 1
                  ? [4, 4, 0, 0]
                  : idx === 0
                    ? [0, 0, 4, 4]
                    : [0, 0, 0, 0]
              }
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <ChartLegend hiddenBars={hiddenBars} onToggle={handleToggle} categories={categories} />
    </div>
  )
}

function ChartHeader() {
  return (
    <div className="mb-5">
      <h2 className="text-base font-bold tracking-tight text-slate-800">
        Category Comparison (Stacked)
      </h2>
      <p className="mt-1 text-sm text-slate-400">
        Comparing metrics across categories per time period.
      </p>
    </div>
  );
}

type ChartLegendProps = {
  hiddenBars: Record<string, boolean>;
  onToggle: (key: string) => void;
  categories:CategoryConfig[]
}


function ChartLegend({ hiddenBars, onToggle, categories }: ChartLegendProps) {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {categories.map(({ key, label, color }) => {
        const hidden = !!hiddenBars[key];
        return (
          <button
            key={key}
            onClick={() => onToggle(key)}
            className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-150 hover:opacity-80 active:scale-95"
            style={{
              borderColor: hidden ? "#e2e8f0" : color,
              color:       hidden ? "#94a3b8" : color,
              background:  hidden ? "#f8fafc" : `${color}15`,
            }}
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ background: hidden ? "#cbd5e1" : color }}
            />
            {label}
          </button>
        );
      })}
    </div>
  );
}

type BarTooltipProps = TooltipContentProps<ValueType, NameType> & {
  categories: CategoryConfig[];
};
// type BarTooltipProps = {
//   active?: boolean;
//   payload?: TooltipPayloadItem[];
//   label?: string;
//   categories:CategoryConfig[]
// }
function BarTooltip({ active, payload, label, categories }: BarTooltipProps) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((sum, p) => {
    const val = typeof p.value === "number" ? p.value : 0;
    return sum + val;
  }, 0); 
  return (
    <div className="min-w-[188px] rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
      <p className="mb-2 border-b border-slate-100 pb-1.5 text-xs font-bold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <div className="flex flex-col gap-1">
        {[...payload].reverse().map((entry) => {
          const cat = categories.find((c) => c.key === entry.dataKey);
          if (!cat) return null;
          const value = typeof entry.value === "number" ? entry.value : 0;
          const pct = total > 0 ? ((value / total) * 100).toFixed(1) : "0";
          return (
            <div key={`${entry.dataKey}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="inline-block h-2 w-2 rounded-sm" style={{ background: cat.color }} />
                {cat.label}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-800">{formatValue(value)}</span>
                <span className="text-[10px] text-slate-400">({pct}%)</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between border-t border-slate-100 pt-1.5">
        <span className="text-xs font-medium text-slate-400">Total</span>
        <span className="text-xs font-bold text-slate-700">{formatValue(total)}</span>
      </div>
    </div>
  );
}
