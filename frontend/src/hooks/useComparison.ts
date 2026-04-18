import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../lib/fetcher";

type SeriesData = {
  name:string,
  data:number[]
}
export type ComparisonData= {
  labels:string[],
  series:SeriesData[],
};

type ComparisonParams = {
  year?: string;
  groupBy: string;
  metric:string;
}


const getComparison = (params?:ComparisonParams)=>{
 const query = new URLSearchParams();

  if (params?.year && params.year !== "all") {
    query.append("year", params.year);
  }
  if (params?.groupBy && params.groupBy !== "all") {
    query.append("groupBy", params.groupBy);
  }
  if (params?.metric && params.metric !== "all") {
    query.append("metric", params.metric);
  }
   const urlPart = query.toString()
    ? `comparision?${query.toString()}`
    : "comparision";
  return fetcher<ComparisonData>(urlPart);
}


export function useComparison(params?:ComparisonParams) {
  const query =  useQuery({
    queryKey: ["comparision", params],
    queryFn: ()=>getComparison(params),
  });
  return query
}
