import { useTrend } from "@/hooks/useTrend";
import LineGraph from "../graph/LineGraph";
import { Loader } from "../common/Loader";
import { useSearch } from "@tanstack/react-router";
import TrendCards from "./TrendsCards";
import TrendFilters from "./TrendFilters";
import NoDataFound from "../common/NoDataFound";
import AIInsight from "./AIInsight";

export default function Trends(){
  
  const search = useSearch({ strict: false });
  const year = search.year ?? "all";
  const category = search.category ?? "all";
  const groupBy = search.groupBy ?? "quarter";
  const quarter = search.quarter ?? "all";
  const {data:wholeData, error, isLoading} = useTrend({year, quarter, category, groupBy:groupBy})
  if(isLoading){
    return (
      <div className="flex justify-center items-center mt-10 min-h-[256px]">
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
  return(
    <div className="p-6 w-full">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Performance Trends
          </h2>
          <p className="mt-1 text-sm text-gray-500">Revenue · Units · Profit</p>
        </div>
        <div>
          <TrendFilters/>
        </div>
      </div>
      {wholeData?.labels.length==0?
        <NoDataFound/>:
        <>
          <div>
            <AIInsight/>
          </div>
          <div>
            <TrendCards wholeData={wholeData}/>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <LineGraph wholeData={wholeData}/>
          </div>
        </>
      }
    </div>
  ) 
}
