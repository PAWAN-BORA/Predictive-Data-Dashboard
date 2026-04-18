import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../lib/fetcher";

export type GrowthData= {
  
  labels:string[],
  values:number[],
  growth:number[],
};

type GrowthParams = {
  year?: string;
  groupBy: string;
  metric:string;
}


const getGrowthData = (params?:GrowthParams)=>{
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
    ? `growth?${query.toString()}`
    : "growth";
  return fetcher<GrowthData>(urlPart);
}


export function useGrowth(params?:GrowthParams) {
  const query =  useQuery({
    queryKey: ["growth", params],
    queryFn: ()=>getGrowthData(params),
  });
  return query
}
