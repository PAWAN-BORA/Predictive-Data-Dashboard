import { useSearch } from "@tanstack/react-router";
import GrowthGraph from "../graph/GrowthGraph";
import GrowthFilters from "./GrowthFilters";
import { useGrowth } from "@/hooks/useGrowth";
import { Loader } from "../common/Loader";


export type GrowthDataPoint = {
  quarter: string;
  growth: number;
}
export default function Growth(){

  const search = useSearch({ strict: false });
  // const year = search.year ?? "all";
  const metric = search.metric ?? "revenue";
  const groupBy = search.groupBy ?? "quarter";
  const {data:wholeData, error, isLoading} = useGrowth({metric, groupBy})
  if(isLoading){
    return (
      <div className="flex justify-center items-center mt-10 min-h-[56px]">
        <Loader title="Loading..." className="size-8"/>
      </div>
    );
  }
  if(error){
    return(
      <div className="flex justify-center mt-10">
        {error.message}
      </div>
    )
  }
  function transformGrowth(): GrowthDataPoint[] {
    if(wholeData==undefined) return [];

    const { labels, growth } = wholeData;

    return labels.map((label, i) => {
      const [year, quarter] = label.split("-");
      const shortYear = year.slice(2);

      return {
        quarter: `${shortYear}-${quarter}`,
        // growth: Math.round(growth[i] ?? 0), // round to match your format
        growth: growth[i] ?? 0, // round to match your format
      };
    });
  }
  const growthData = transformGrowth()
  return(
    <div className="p-6 w-full">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Growth Metrics 
          </h2>
          <p className="mt-1 text-sm text-gray-500">High-level summary metrics</p>
        </div>
        <div>
          <GrowthFilters/>
        </div>
      </div>
      <div>
        <GrowthGraph growthData={growthData}/>
      </div>
    </div>
  )
}
