import Distribution from "./Distribution";
import ProfitDistribution from "./graph/DistributionPie";
import TopCards from "./TopCards";
export default function Dashboard() {
  
  return (
    <div className="text-center mt-10">
      <TopCards/>
      <div>
        <Distribution/>
      </div>
    </div>
  );
}
