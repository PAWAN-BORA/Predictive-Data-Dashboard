import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../lib/fetcher";
import type { TrendParams } from "./useTrend";

export type AISumamryData= {
  summary:string,
};



const getAISummary = (params?:TrendParams)=>{
 const query = new URLSearchParams();

  if (params?.year && params.year !== "all") {
    query.append("year", params.year);
  }
  if (params?.groupBy && params.groupBy !== "all") {
    query.append("groupBy", params.groupBy);
  }
  if (params?.quarter && params.quarter !== "all") {
    query.append("quarter", params.quarter);
  }
  if (params?.category && params.category !== "all") {
    query.append("category", params.category);
  }
   const urlPart = query.toString()
    ? `ai/summary?${query.toString()}`
    : "ai/summary";
  return fetcher<AISumamryData>(urlPart);
}


export function useAISummary(params?:TrendParams) {
  const query =  useQuery({
    queryKey: ["aiSummary", params],
    queryFn: ()=>getAISummary(params),
  });
  return query
}
