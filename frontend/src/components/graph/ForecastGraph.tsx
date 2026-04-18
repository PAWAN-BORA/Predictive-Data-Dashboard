import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { TooltipProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import type { ForecastDataPoint } from "../forecast/Forecast";

// ─── Types ────────────────────────────────────────────────────────────────────




const ACTUAL_COLOR    = "#4338ca";
const PREDICTED_COLOR = "#94a3b8";
const SPLIT_YEAR      = "2024";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatRevenue = (value: number): string => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)     return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
};

const formatAxis = (value: number): string => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)     return `${(value / 1_000).toFixed(0)}K`;
  return String(value);
};

const getCAGR = (forecastData:ForecastDataPoint[]): string => {
  const first = forecastData.find((d) => d.predicted !== undefined)?.predicted ?? 0;
  const last  = [...forecastData].reverse().find((d) => d.predicted !== undefined)?.predicted ?? 0;
  const years = 2;
  if (!first) return "N/A";
  const cagr = (Math.pow(last / first, 1 / years) - 1) * 100;
  return `${cagr.toFixed(1)}%`;
};

// ─── RevenueForecastChart ─────────────────────────────────────────────────────

type ForecastGraphProps = {
  forecastData:ForecastDataPoint[]
}
export default function ForecastGraph({forecastData}:ForecastGraphProps) {
  const lastActual    = forecastData.filter((d) => d.actual    !== undefined).slice(-1)[0];
  const lastPredicted = forecastData.filter((d) => d.predicted !== undefined).slice(-1)[0];

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-1">
        <h2 className="text-base font-bold tracking-tight text-slate-800">Revenue Forecast</h2>
        <p className="mt-1 text-xs text-slate-400">
          Solid line = Actual &nbsp;·&nbsp; Dashed line = Predicted
        </p>
      </div>

      {/* Stats */}
      <div className="mb-5 mt-4 grid grid-cols-3 gap-3">
        <StatBadge
          label="Last Actual"
          value={formatRevenue(lastActual?.actual ?? 0)}
          sub={lastActual?.year}
          accent={ACTUAL_COLOR}
        />
        <StatBadge
          label="Forecast Peak"
          value={formatRevenue(lastPredicted?.predicted ?? 0)}
          sub={lastPredicted?.year}
          accent={PREDICTED_COLOR}
        />
        <StatBadge
          label="Predicted CAGR"
          value={getCAGR(forecastData)}
          sub="2025 → 2027"
          accent="#10b981"
        />
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart
          data={forecastData}
          margin={{ top: 8, right: 12, left: 8, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tickFormatter={(v: number) => formatAxis(v)}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            width={60}
            domain={[0, 4_000_000]}
            ticks={[0, 500000, 1000000, 1500000, 2000000, 2500000, 3000000, 3500000, 4000000]}
          />

          {/* Vertical split marker between actual / predicted */}
          <ReferenceLine
            x={SPLIT_YEAR}
            stroke="#e2e8f0"
            strokeDasharray="4 3"
            strokeWidth={1.5}
            label={{
              value: "Forecast →",
              position: "insideTopRight",
              fontSize: 10,
              fill: "#94a3b8",
              dy: -4,
            }}
          />

          <Tooltip content={<ForecastTooltip />} cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }} />
          <Legend content={<ChartLegend />} />

          {/* Actual — solid */}
          <Line
            type="linear"
            dataKey="actual"
            name="Actual Revenue"
            stroke={ACTUAL_COLOR}
            strokeWidth={2.5}
            dot={{ r: 5, fill: ACTUAL_COLOR, strokeWidth: 0 }}
            activeDot={{ r: 7, strokeWidth: 0 }}
            connectNulls={false}
          />

          {/* Predicted — dashed */}
          <Line
            type="linear"
            dataKey="predicted"
            name="Predicted Revenue"
            stroke={PREDICTED_COLOR}
            strokeWidth={2.5}
            strokeDasharray="7 4"
            dot={{ r: 5, fill: PREDICTED_COLOR, strokeWidth: 0 }}
            activeDot={{ r: 7, strokeWidth: 0 }}
            connectNulls={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}


// ─── Tooltip ──────────────────────────────────────────────────────────────────

function ForecastTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-[160px] rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
      <p className="mb-2 border-b border-slate-100 pb-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">
        {label}
      </p>
      {payload.map((entry) => {
        const raw   = entry.value;
        const value = typeof raw === "number" ? raw : Number(raw ?? 0);
        const isActual = entry.dataKey === "actual";
        return (
          <div key={entry.dataKey as string} className="flex items-center justify-between gap-6">
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: isActual ? ACTUAL_COLOR : PREDICTED_COLOR }}
              />
              {isActual ? "Actual" : "Predicted"}
            </span>
            <span
              className="text-xs font-bold"
              style={{ color: isActual ? ACTUAL_COLOR : PREDICTED_COLOR }}
            >
              {formatRevenue(value)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Custom Legend ────────────────────────────────────────────────────────────

function ChartLegend() {
  return (
    <div className="mt-3 flex justify-center gap-6">
      {/* Actual — solid line */}
      <span className="flex items-center gap-2 text-xs font-semibold text-slate-600">
        <svg width="32" height="10" viewBox="0 0 32 10">
          <line x1="0" y1="5" x2="32" y2="5" stroke={ACTUAL_COLOR} strokeWidth="2.5" />
          <circle cx="16" cy="5" r="3.5" fill={ACTUAL_COLOR} />
        </svg>
        Actual Revenue
      </span>
      {/* Predicted — dashed line */}
      <span className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <svg width="32" height="10" viewBox="0 0 32 10">
          <line
            x1="0" y1="5" x2="32" y2="5"
            stroke={PREDICTED_COLOR}
            strokeWidth="2.5"
            strokeDasharray="5 3"
          />
          <circle cx="16" cy="5" r="3.5" fill={PREDICTED_COLOR} />
        </svg>
        Predicted Revenue
      </span>
    </div>
  );
}

// ─── StatBadge ────────────────────────────────────────────────────────────────

interface StatBadgeProps {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}

function StatBadge({ label, value, sub, accent = "#4338ca" }: StatBadgeProps) {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </span>
      <span className="text-lg font-bold" style={{ color: accent }}>
        {value}
      </span>
      {sub && <span className="text-[10px] text-slate-400">{sub}</span>}
    </div>
  );
}

