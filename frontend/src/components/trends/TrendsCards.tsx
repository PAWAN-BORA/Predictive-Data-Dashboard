import type { TrendData } from "@/hooks/useTrend";
import CustomCard, { type CustomCardProps } from "../common/CustomCard";
import { Boxes, CreditCard, DollarSign, Package, TrendingUp, Wallet } from "lucide-react";

type TrendCardProps = {
  wholeData:TrendData|undefined
}
const TrendCards = ({ wholeData}:TrendCardProps )=>{
  function getCardsData(): CustomCardProps[] {

    const revenueSeries = wholeData?.series.find(s => s.name === "Revenue");
    const unitsSeries = wholeData?.series.find(s => s.name === "Units");
    const profitSeries = wholeData?.series.find(s => s.name === "Profit");
    const peakRevenue = revenueSeries?Math.max(...revenueSeries.data):0;
    const peakUnit = unitsSeries?Math.max(...unitsSeries.data):0;
    const peakProfit = profitSeries?Math.max(...profitSeries.data):0;
    const sum = (arr?: number[]) =>
      arr?.reduce((acc, v) => acc + (v ?? 0), 0) ?? 0;

    const totalRevenue = sum(revenueSeries?.data);
    const totalUnits = sum(unitsSeries?.data);
    const totalProfit = sum(profitSeries?.data);
    return [
      {
        label: "Peak Revenue",
        value: peakRevenue.toLocaleString(),
        icon: TrendingUp,
        iconBg: "bg-violet-100",
        iconColor: "text-violet-500",
      },
      {
        label: "Peak Units",
        value: peakUnit.toLocaleString(),
        icon: Package,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-500",
      },
      {
        label: "Peak Profit",
        value: peakProfit.toLocaleString(),
        icon: DollarSign,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-500",
      },
      {
        label: "Total Revenue",
        value: `${totalRevenue?.toLocaleString()}`,
        icon: CreditCard,
        iconBg: "bg-violet-100",
        iconColor: "text-violet-500",
      },
      {
        label: "Total Profit",
        value: `${totalProfit?.toLocaleString()}`,
        icon: Wallet,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-500",
      },
      {
        label: "Total Units",
        value: totalUnits?.toLocaleString(),
        icon: Boxes,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-500",
      },
    ]
  }
  const tredsCards = getCardsData()
  return(
      <div className="grid grid-cols-2 gap-4 py-6 lg:grid-cols-4">
        {tredsCards.map((item) => (
          <CustomCard 
            {...item}
          />
        ))}
      </div>
  )
}

export default TrendCards;
