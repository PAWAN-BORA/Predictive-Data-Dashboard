import Distribution from "./Distribution";
import TopCards from "./TopCards";
import DashboardFilters from "./DashboardFilters";
import RevenueSnapshot from "./RevenueSnapshot";
export default function Dashboard() {
  
  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Overview 
          </h2>
          <p className="mt-1 text-sm text-gray-500">High-level summary metrics</p>
        </div>
        <div>
          <DashboardFilters/>
        </div>
      </div>
      <TopCards/>
      <div>
        <Distribution/>
      </div>
      <div>
        <RevenueSnapshot/>
      </div>
    </div>
  );
}
