import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../lib/fetcher";

export type ForecastData= {
  
  labels:string[],
  actual:number[],
  predicted:number[],
};

type ForecastParams = {
  groupBy: string;
  metric:string;
}


const getForecast = (params?:ForecastParams)=>{
 const query = new URLSearchParams();

  if (params?.groupBy && params.groupBy !== "all") {
    query.append("groupBy", params.groupBy);
  }
  if (params?.metric && params.metric !== "all") {
    query.append("metric", params.metric);
  }
   const urlPart = query.toString()
    ? `forecast?${query.toString()}`
    : "forecast";
  return fetcher<ForecastData>(urlPart);
}


export function useForecast(params?:ForecastParams) {
  const query =  useQuery({
    queryKey: ["forecast", params],
    queryFn: ()=>getForecast(params),
  });
  return query
}

