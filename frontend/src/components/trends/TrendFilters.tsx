import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { CATEGORIES, QUARTERS, YEARS } from "@/constant";

const GROUP_BY = [
  { name: "Quarter", value: "quarter" },
  { name: "Month", value: "month" },
];

export default function TrendFilters(){

  const search = useSearch({ strict: false });
  const navigate = useNavigate({from:"/trends"});
  const year = search.year ?? "all";
  const groupBy = search.groupBy ?? "quarter";
  const quarter = search.quarter ?? "all";
  const category = search.category ?? "all";
    const handleReset = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        year: "all",
        groupBy: "quarter",
        category: "all",
        quarter:"all"
      }),
    });

  };
  const updateSearch = (key: string, value: string) => {
    navigate({
      search: (prev) => {
        const next = {
          ...prev,
          [key]: value,
        };
        if (key === "quarter") {
          if (value !== "all") {
            next.groupBy = "month";
          } else {
            next.groupBy = prev.groupBy; 
          }
        }

        return next;
      },
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
              Choose Category
            </label>
            <Select value={category} onValueChange={(val)=>updateSearch("category", val)}>
              <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-400 hover:bg-blue-50 focus:ring-2 focus:ring-blue-200">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        {/* Quarter */}
        <div className="flex flex-col gap-1.5 min-w-[180px]">
          <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Choose Quarter
          </label>
          <Select value={quarter} onValueChange={(val)=>updateSearch("quarter", val)}>
            <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-400 hover:bg-blue-50 focus:ring-2 focus:ring-blue-200">
              <SelectValue placeholder="Select quarter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {QUARTERS.map((q) => (
                <SelectItem key={q.value} value={q.value}>
                  {q.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Group By */}
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
