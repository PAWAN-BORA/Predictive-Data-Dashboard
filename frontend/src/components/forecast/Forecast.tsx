import { useForecast } from "@/hooks/useForecast";
import ForecastGraph from "../graph/ForecastGraph";
import { useSearch } from "@tanstack/react-router";
import { Loader } from "../common/Loader";
import { formatLabel } from "@/lib/utils";
import ForecastFilters from "./ForecastFilters";


export type ForecastDataPoint = {
  year: string;
  actual?: number;
  predicted?: number;
}
export default function Forecast(){
  const search = useSearch({ strict: false });
  const metric = search.metric ?? "revenue";
  const groupBy = search.groupBy ?? "year";
  const {data:wholeData, error, isLoading} = useForecast({metric, groupBy})
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
  
  function transformForecast(): ForecastDataPoint[] {
    const map: Record<string, { actual: number; predicted: number }> = {};

    if(wholeData==undefined) return []
    wholeData.labels.forEach((label, i) => {
      const year = formatLabel(label)

      if (!map[year]) {
        map[year] = { actual: 0, predicted: 0 };
      }

      if (typeof wholeData.actual[i] === "number") {
        map[year].actual += wholeData.actual[i]!;
      }

      if (typeof wholeData.predicted[i] === "number") {
        map[year].predicted += wholeData.predicted[i]!;
      }
    });

    return Object.entries(map).map(([year, values]) => {
      return {
        year,
        actual: values.actual > 0 ? values.actual : undefined,
        predicted: values.predicted > 0 ? values.predicted : undefined,
      };
    });
  }
  const forecastData = transformForecast()
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
          <ForecastFilters/>
        </div>
      </div>
      <div>
        <ForecastGraph forecastData={forecastData}/>
      </div>
      <div className="mt-4">
        {/* <SummaryTable chartData={chartData} categories={categories}/> */}
      </div>
    </div>
  )
}
