import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useNavigate, useSearch } from "@tanstack/react-router";


const YEARS = [
  { name: "2022", value: "2022" },
  { name: "2023", value: "2023" },
  { name: "2024", value: "2024" },
  { name: "2025", value: "2025" },
];

const GROUP_BY = [
  { name: "Quarter", value: "quarter" },
  { name: "Month", value: "month" },
];

const METRICS = [
  { name: "Revenue", value: "revenue" },
  { name: "Profit", value: "profit" },
  { name: "Unit", value: "units" },
];
export default function ComparisonFilters(){

  const search = useSearch({ strict: false });
  const navigate = useNavigate({from:"/comparison"});
  const year = search.year ?? "all";
  const groupBy = search.groupBy ?? "quarter";
  const metric = search.metric ?? "revenue";
    const handleReset = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        year: "all",
        groupBy: "quarter",
        metric: "revenue"
      }),
    });

  };
  const updateSearch = (key: string, value: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: value,
      }),
    });
  };


  return(
    <div className="pt-5 pb-4 flex flex-col gap-4">
      {/* Filters Row */}
      <div className="flex flex-wrap items-end gap-4">
        {/* Year */}
        <div className="flex flex-col gap-1.5 min-w-[160px]">
          <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Choose Year
          </label>
          <Select value={year} onValueChange={(val)=>updateSearch("year", val)}>
            <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-400 hover:bg-blue-50 focus:ring-2 focus:ring-blue-200">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {YEARS.map((y) => (
                <SelectItem key={y.value} value={y.value}>
                  {y.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>


        {/* Category */}
          <div className="flex flex-col gap-1.5 min-w-[200px]">
            <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Choose Metric
            </label>
            <Select value={metric} onValueChange={(val)=>updateSearch("metric", val)}>
              <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-400 hover:bg-blue-50 focus:ring-2 focus:ring-blue-200">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {METRICS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        {/* Category */}
          <div className="flex flex-col gap-1.5 min-w-[200px]">
            <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
               Group By
            </label>
            <Select value={groupBy} onValueChange={(val)=>updateSearch("groupBy", val)}>
              <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-400 hover:bg-blue-50 focus:ring-2 focus:ring-blue-200">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {GROUP_BY.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        {/* Reset */}
        <Button
          onClick={handleReset}
          variant="ghost"
          className="px-4 cursor-pointer"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
