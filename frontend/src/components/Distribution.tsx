import { useDistribution } from "@/hooks/useDistribution";
import DistributionPie from "./graph/DistributionPie";
import { formatValue } from "@/lib/utils";
import { useSearch } from "@tanstack/react-router";
import { Loader } from "./common/Loader";

export default function Distribution(){

  const search = useSearch({ strict: false });
  const year = search.year ?? "all";
  const quarter = search.quarter ?? "all";
  const category = search.category ?? "all";
  const {data, error, isLoading} = useDistribution({year, quarter, category})

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
  const donutColors = [
    "#4F6EF7", // blue
    "#6DBF9E", // mint green
    "#1A8C5B", // dark green
    "#1B2F6E", // navy
    "#F4A261", // orange
    "#E76F51", // coral
  ];
  
  const revenueData = data!.map((item, index)=>{
    return {
      name:item.name,
      value:item.revenue,
      color:donutColors[index%6]
    }
  });
  const totalRevenue = data!.reduce((sum, item) => sum + item.revenue, 0);
  const unitsData = data!.map((item, index)=>{
    return {
      name:item.name,
      value:item.units,
      color:donutColors[index%6]
    }
  });
  const totalUnits = data!.reduce((sum, item) => sum + item.units, 0);
  return(
    <div className="grid grid-cols-1 gap-4 py-6 lg:grid-cols-2">
      <DistributionPie title="Revenue Distribution" data={revenueData} total={`$${formatValue(totalRevenue)}`} centerText="Total Revenue"/>
      <DistributionPie title="Units Distribution" data={unitsData} total={`${formatValue(totalUnits)}`} centerText="Total Units"/>
    </div>
  )
}
