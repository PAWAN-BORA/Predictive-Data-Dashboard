import { formatValue } from "@/lib/utils";
import type { CategoryConfig, QuarterData } from "./Comparison";

type SummaryTableProps = {
  chartData:QuarterData[]
  categories:CategoryConfig[]
}
export default function SummaryTable({categories, chartData}:SummaryTableProps) {
  const getQuarterTotal = (row: QuarterData): number =>
  categories.reduce((sum, c) => sum + Number(row[c.key]), 0);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-100">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-slate-50">
            <th className="px-4 py-2.5 text-left font-semibold text-slate-500">Quarter</th>
            {categories.map((cat) => (
              <th key={cat.key} className="px-4 py-2.5 text-right font-semibold text-slate-500">
                <span className="flex items-center justify-end gap-1.5">
                  <span
                    className="inline-block h-2 w-2 rounded-sm"
                    style={{ background: cat.color }}
                  />
                  {cat.label}
                </span>
              </th>
            ))}
            <th className="px-4 py-2.5 text-right font-semibold text-slate-700">Total</th>
          </tr>
        </thead>
        <tbody>
          {chartData.map((row, i) => (
            <tr
              key={row.quarter}
              className={`border-t border-slate-100 transition-colors hover:bg-slate-50 ${
                i % 2 === 0 ? "bg-white" : "bg-slate-50/40"
              }`}
            >
              <td className="px-4 py-2.5 font-semibold text-slate-700">{row.quarter}</td>
              {categories.map((cat) => (
                <td key={cat.key} className="px-4 py-2.5 text-right text-slate-600">
                  {formatValue(Number(row[cat.key]))}
                </td>
              ))}
              <td className="px-4 py-2.5 text-right font-bold text-slate-800">
                {formatValue(getQuarterTotal(row))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

