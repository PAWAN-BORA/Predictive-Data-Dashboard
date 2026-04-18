import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { useNavigate, useRouterState, useSearch } from "@tanstack/react-router";


const YEARS = [
  { name: "2022", value: "2022" },
  { name: "2023", value: "2023" },
  { name: "2024", value: "2024" },
  { name: "2025", value: "2025" },
];

const QUARTERS = [
  { name: "Quarter 1 (Q1)", value: "Q1" },
  { name: "Quarter 2 (Q2)", value: "Q2" },
  { name: "Quarter 3 (Q3)", value: "Q3" },
  { name: "Quarter 4 (Q4)", value: "Q4" },
];

const CATEGORIES = [
  { name: "Electronics", value: "Electronics" },
  { name: "Clothing", value: "Clothing" },
  { name: "Sports", value: "Sports" },
  { name: "Home", value: "Home" },
];
export default function DashboardFilters(){

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const search = useSearch({ strict: false });
  const navigate = useNavigate({from:"/"});
  const year = search.year ?? "all";
  const quarter = search.quarter ?? "all";
  const category = search.category ?? "all";
    const handleReset = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        year: "all",
        quarter: "all",
        category: "all",
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
      {/* Title */}
      {/* <div className="flex items-center gap-2"> */}
      {/*   <SlidersHorizontal className="w-4 h-4 text-blue-700" /> */}
      {/*   <span className="font-bold text-gray-800 text-base"> */}
      {/*     Advanced Filters */}
      {/*   </span> */}
      {/* </div> */}

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

        {/* Category */}
        {pathname !== "/" && (
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
        )}

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
