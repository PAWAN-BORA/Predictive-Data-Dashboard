import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../lib/fetcher";

export type SumaryData = {
  "totalRevenue": number,
  "totalProfit": number,
  "totalUnits": number,
  "avgOrderValue": number,
  "topCategory": string
};

type SummaryParams = {
  year?: string;
  quarter?: string;
  category?: string;
}


const getSummary = (params?:SummaryParams)=>{
 const query = new URLSearchParams();

  if (params?.year && params.year !== "all") {
    query.append("year", params.year);
  }

  if (params?.quarter && params.quarter !== "all") {
    query.append("quarter", params.quarter);
  }
   const urlPart = query.toString()
    ? `summary?${query.toString()}`
    : "summary";
  return fetcher<SumaryData>(urlPart);
}


export function useSummary(params?:SummaryParams) {
  const query =  useQuery({
    queryKey: ["summary", params],
    queryFn: ()=>getSummary(params),
  });
  return query
}
