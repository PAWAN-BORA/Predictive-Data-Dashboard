import { HelpCircle, LogOut,   LayoutDashboard,
  TrendingUp,
  GitCompare,
  Activity,
  LineChart,
} from "lucide-react";
import { Link, useNavigate, useRouterState, useSearch } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { link: '/', label: 'Overview', icon: LayoutDashboard },
  { link: '/trends', label: 'Trends', icon: TrendingUp },
  { link: '/comparison', label: 'Comparison', icon: GitCompare },
  { link: '/growth', label: 'Growth Rate', icon: Activity },
  { link: '/forecast', label: 'Forecast', icon: LineChart },

];

export default function Sidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  console.log(pathname, 'this is path')

  return (
    <aside className="w-[280px] bg-white rounded-xl shadow-sm border-l border-r border-gray-100 flex flex-col font-sans h-[calc(100vh-75px)]">

      {/* Brand Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="text-blue-700 font-bold text-xl tracking-tight">
          AI-Powered
        </div>
        <div className="text-gray-400 text-xs font-semibold tracking-widest uppercase mt-0.5">
          Predictive Data
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.link;

          return (
            <Link to={item.link}>
              <Button
                key={item.link}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "justify-start gap-3 w-full cursor-pointer",
                  isActive && "text-primary font-medium"
                )}
                // onClick={() => onChange(item.id)}
              >
                <Icon className="size-4" />
                <span className="text-sm">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="border-t border-gray-100 mx-5" />


      {/* Footer Nav */}
      <div className="px-5 pb-5 flex flex-col gap-1">
        <button className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-blue-600 font-medium py-1.5 px-1 rounded-lg transition-colors">
          <HelpCircle className="w-4 h-4" />
          Help Center
        </button>
        <button className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-red-500 font-medium py-1.5 px-1 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
