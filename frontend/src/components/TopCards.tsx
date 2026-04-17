import { useEffect } from "react";
import CustomCard, { type CustomCardProps } from "./common/CustomCard";
import { useSummary } from "@/hooks/useSummary";
import { toast } from "sonner";
import { CreditCard, Package, Tag, TrendingUp } from "lucide-react";
import { useSearch } from "@tanstack/react-router";
import { Loader } from "./common/Loader";

const TopCards = ()=>{

  const search = useSearch({ strict: false });
  const year = search.year ?? "all";
  const quarter = search.quarter ?? "all";
  const category = search.category ?? "all";
  const {data, error, isLoading} = useSummary({year, quarter, category})
  useEffect(()=>{
    if(error){
     toast.error((error as Error).message, { position: "top-right" });
    }
  }, [error])
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
  function getSummaryData(): CustomCardProps[] {
    if(data==undefined) return [];
    return [
      {
        label: "Total Revenue",
        value: `${data.totalRevenue?.toLocaleString()}`,
        icon: CreditCard,
        iconBg: "bg-violet-100",
        iconColor: "text-violet-500",
      },
      {
        label: "Total Profit",
        value: `${data.totalProfit?.toLocaleString()}`,
        icon: TrendingUp,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-500",
      },
      {
        label: "Total Units",
        value: data.totalUnits?.toLocaleString(),
        icon: Package,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-500",
      },
      // {
      //   label: "Avg. Order Value",
      //   value: `${data.avgOrderValue.toFixed(2)}`,
      //   icon: ShoppingCart,
      //   iconBg: "bg-amber-100",
      //   iconColor: "text-amber-500",
      // },
      {
        label: "Top Category",
        value: data.topCategory,
        icon: Tag,
        iconBg: "bg-pink-100",
        iconColor: "text-pink-500",
      },
    ];
  }
  const summaryData = getSummaryData()
  return(
      <div className="grid grid-cols-2 gap-4 p-6 lg:grid-cols-4">
        {summaryData.map((item) => (
          <CustomCard 
            {...item}
          />
        ))}
      </div>
  )
}

export default TopCards;
