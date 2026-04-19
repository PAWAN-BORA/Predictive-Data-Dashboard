import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { METRICS } from "@/constant";


const GROUP_BY = [
  { name: "Quarter", value: "quarter" },
  { name: "Month", value: "month" },
];

export default function GrowthFilters(){

  const search = useSearch({ strict: false });
  const navigate = useNavigate({from:"/growth"});
  // const year = search.year ?? "all";
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
        {/* Metric */}
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
