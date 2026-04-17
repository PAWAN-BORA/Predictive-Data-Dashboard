import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../lib/fetcher";

export type DistributionData = {
  "series":{
    "name":string,
    "revenue": number,
    "units": number
  }[]
};

type DistributionParams = {
  year?: string;
  quarter?: string;
  category?: string;
}


const getDistribution = (params?:DistributionParams)=>{
  const query = new URLSearchParams();

  if (params?.year && params.year !== "all") {
    query.append("year", params.year);
  }

  if (params?.quarter && params.quarter !== "all") {
    query.append("quarter", params.quarter);
  }
  const urlPart = query.toString()
    ? `cate-breakdown?${query.toString()}`
    : "cate-breakdown";
  return fetcher<DistributionData>(urlPart);
}


export function useDistribution(params?:DistributionParams) {
  const query =  useQuery({
    queryKey: ["distribution", params],
    queryFn: ()=>getDistribution(params),
  });
  return {...query, data:query.data?.series}
}
