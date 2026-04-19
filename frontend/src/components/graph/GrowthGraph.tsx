import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from "recharts";

import type { TooltipContentProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import type { GrowthDataPoint } from "../growth/Growth";

 
// ─── Data ─────────────────────────────────────────────────────────────────────
 
// const GROWTH_DATA: GrowthDataPoint[] = [
//   { quarter: "22-Q1", growth: 0    },
//   { quarter: "22-Q2", growth: -10  },
//   { quarter: "22-Q3", growth: 20   },
//   { quarter: "22-Q4", growth: 60   },
//   { quarter: "23-Q1", growth: -55  },
//   { quarter: "23-Q2", growth: -5   },
//   { quarter: "23-Q3", growth: 25   },
//   { quarter: "23-Q4", growth: 65   },
//   { quarter: "24-Q1", growth: 430  },
//   { quarter: "24-Q2", growth: -15  },
//   { quarter: "24-Q3", growth: -110 },
//   { quarter: "24-Q4", growth: 40   },
// ];
 
const POS_COLOR = "#10b981";
const NEG_COLOR = "#ef4444";
 
// ─── Helpers ──────────────────────────────────────────────────────────────────
 
const formatGrowth = (value: number): string =>
  `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;

type GrowthGraphProps = {
  growthData:GrowthDataPoint[]
}
export default function GrowthGraph({growthData}:GrowthGraphProps) {
  const [activeQuarter, setActiveQuarter] = useState<string | null>(null);
  const stats = getSummaryStats(growthData);
 
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold tracking-tight text-slate-800">
            Growth Rate (%)
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Relative Growth Rate
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-600">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-500" />
            Positive
          </span>
          <span className="flex items-center gap-1.5 text-red-500">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-red-400" />
            Negative
          </span>
        </div>
      </div>
 
      {/* Stats row */}
      <div className="mb-6 grid grid-cols-4 gap-3">
        <StatBadge label="Peak"        value={formatGrowth(stats.peak)}    positive />
        <StatBadge label="Trough"      value={formatGrowth(stats.trough)}  positive={false} />
        <StatBadge label="Positive Qtrs" value={`${stats.posCount} / ${growthData.length}`} neutral />
        <StatBadge label="Avg Positive" value={formatGrowth(stats.avgPos)} positive />
      </div>
 
      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={growthData}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          barSize={36}
          onMouseLeave={() => setActiveQuarter(null)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
 
          <XAxis
            dataKey="quarter"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
          />
 
          <YAxis
            tickFormatter={(v: number) => `${v}`}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            width={40}
            domain={[-150, 500]}
            ticks={[-100, 0, 100, 200, 300, 400, 500]}
          />
 
          {/* Zero baseline */}
          <ReferenceLine
            y={0}
            stroke="#cbd5e1"
            strokeWidth={1.5}
          />
 
          <Tooltip
            content={(props)=><GrowthTooltip {...props} />}
            cursor={{ fill: "#f8fafc", radius: 4 }}
          />
 
          <Bar
            dataKey="growth"
            radius={[3, 3, 3, 3]}
            onMouseEnter={(data) => {
              if(data && data.payload){
                setActiveQuarter(data.payload.quarter)
              }
            }}
          >
            {growthData.map((entry) => {
              const isActive = activeQuarter === null || activeQuarter === entry.quarter;
              const baseColor = entry.growth >= 0 ? POS_COLOR : NEG_COLOR;
              return (
                <Cell
                  key={entry.quarter}
                  fill={baseColor}
                  opacity={isActive ? 1 : 0.35}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const getSummaryStats = (data: GrowthDataPoint[]) => {
  const values = data.map((d) => d.growth);
  const positive = values.filter((v) => v > 0);
  const negative = values.filter((v) => v < 0);
  return {
    peak:    Math.max(...values),
    trough:  Math.min(...values),
    avgPos:  positive.length ? positive.reduce((a, b) => a + b, 0) / positive.length : 0,
    avgNeg:  negative.length ? negative.reduce((a, b) => a + b, 0) / negative.length : 0,
    posCount: positive.length,
    negCount: negative.length,
  };
};

function GrowthTooltip({ active, payload, label }: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null;
  const raw   = payload[0]?.value;
  const value = typeof raw === "number" ? raw : Number(raw ?? 0);
  const isPos = value >= 0;
 
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-lg">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p
        className="text-sm font-bold"
        style={{ color: isPos ? POS_COLOR : NEG_COLOR }}
      >
        {formatGrowth(value)}
      </p>
      <p className="mt-0.5 text-[10px] text-slate-400">
        {isPos ? "▲ Positive growth" : "▼ Negative growth"}
      </p>
    </div>
  );
}

interface StatBadgeProps {
  label: string;
  value: string;
  positive?: boolean;
  neutral?: boolean;
}
 
function StatBadge({ label, value, positive, neutral }: StatBadgeProps) {
  const color = neutral
    ? "text-slate-600 bg-slate-100 border-slate-200"
    : positive
    ? "text-emerald-700 bg-emerald-50 border-emerald-200"
    : "text-red-600 bg-red-50 border-red-200";
 
  return (
    <div className={`flex flex-col gap-0.5 rounded-xl border px-4 py-3 ${color}`}>
      <span className="text-[10px] font-semibold uppercase tracking-widest opacity-70">
        {label}
      </span>
      <span className="text-base font-bold">{value}</span>
    </div>
  );
}
