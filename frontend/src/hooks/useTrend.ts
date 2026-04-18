import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../lib/fetcher";

type SeriesData = {
  name:string,
  data:number[]
}
export type TrendData= {
  labels:string[],
  series:SeriesData[],
};

export type TrendParams = {
  year?: string;
  groupBy: string;
  quarter?: string;
  category?: string;

}


const getTrends = (params?:TrendParams)=>{
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
    ? `trends?${query.toString()}`
    : "trends";
  return fetcher<TrendData>(urlPart);
}


export function useTrend(params?:TrendParams) {
  const query =  useQuery({
    queryKey: ["trend", params],
    queryFn: ()=>getTrends(params),
  });
  return query
}
