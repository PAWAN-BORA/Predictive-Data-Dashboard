import { Link } from "@tanstack/react-router";
import AISearchBar from "./common/AISearchBar";

export default function PredictivePulseHeader() {

  return (
    <header className="w-full relative bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 flex-shrink-0">
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="white" strokeWidth="1.5" />
            <circle cx="7" cy="7" r="1.5" fill="white" />
            <circle cx="7" cy="2" r="1" fill="white" />
            <circle cx="7" cy="12" r="1" fill="white" />
            <circle cx="2" cy="7" r="1" fill="white" />
            <circle cx="12" cy="7" r="1" fill="white" />
          </svg>
        </div>
        <span className="text-[15px] font-medium text-gray-900 tracking-tight">
          
          PredictivePulse
        </span>
      </Link>
      
      <AISearchBar/>

      {/* Right side */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-white border-2 border-white ring-1 ring-gray-200 cursor-pointer">
          JS
        </div>
      </div>
    </header>
  );
}
