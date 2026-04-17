import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";


type ChartData = {
  name:string,
  value:number,
  color:string,
}
type DistributionPieProps = {
  data:ChartData[]
  title:string,
  total:string,
  centerText:string,
}
export default function DistributionPie({title, data, total, centerText}:DistributionPieProps) {

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-gray-800">
        {title}
      </h2>
      <div className="flex items-center gap-6">
        {/* Donut Chart */}
        <div className="relative h-48 w-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={88}
                paddingAngle={3}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-gray-800">
              {total}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
              {centerText}
            </span>
          </div>
        </div>

        {/* Legend */}
        <ul className="flex flex-col gap-2.5">
          {data.map((item) => (
            <li key={item.name} className="flex items-center gap-2">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">
                {item.name}{" "}
                <span className="font-medium text-gray-800">
                  {item.value}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
