import { useSearch } from "@tanstack/react-router";
import StackedGraph from "../graph/StackGraph";
import ComparisonFilters from "./ComparisonFilters";
import { useComparison } from "@/hooks/useComparison";
import { Loader } from "../common/Loader";
import SummaryTable from "./ComparisonTable";
import NoDataFound from "../common/NoDataFound";

export type QuarterData = {
  quarter: string;
  [key:string]:string|number;
}

export type CategoryConfig = {
  key: string;
  label: string;
  color: string;
}
export default function Comparison() {
  const search = useSearch({ strict: false });
  const year = search.year ?? "all";
  const metric = search.metric ?? "revenue";
  const groupBy = search.groupBy ?? "quarter";
  const {data:wholeData, error, isLoading} = useComparison({year, metric, groupBy})
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

  function transformToChartData():QuarterData[] {
    const data =  wholeData?.labels.map((label, index) => {
      const [year, quarter] = label.split("-");
      const shortYear = year.slice(2); 
      const obj: QuarterData = {
        quarter: `${shortYear}-${quarter}`,
      };
      wholeData.series.forEach((s) => {
        obj[s.name] = s.data[index] ?? 0;
      });

      return obj;
    });
    if(data==undefined) return []
    return data;
  }
  function getCategories(): CategoryConfig[] {
    const colorMap: Record<string, string> = {
      Electronics: "#6366f1",
      Sports: "#10b981",
      Clothing: "#f59e0b",
      Home: "#ef4444",
    };

    const data = wholeData?.series.map((s) => ({
      key: s.name,
      label: s.name,
      color: colorMap[s.name] ?? "#8884d8",
    }));
    if(data==undefined) return []
    return data;
  }
  const chartData = transformToChartData();
  const categories = getCategories();
  return(
    <div className="p-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Category Comparison 
          </h2>
          <p className="mt-1 text-sm text-gray-500">High-level summary metrics</p>
        </div>
        <div>
          <ComparisonFilters/>
        </div>
      </div>
      {chartData.length==0 && categories.length==0 ?
        <NoDataFound/>:
        <>
          <div>
            <StackedGraph chartData={chartData} categories={categories}/>
          </div>
          <div className="mt-4">
            <SummaryTable chartData={chartData} categories={categories}/>
          </div>
        </>
      }
    </div>
  ) 
}
