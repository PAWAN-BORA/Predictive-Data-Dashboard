import { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

export default function PredictivePulseHeader() {
  const [search, setSearch] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", search);
    // trigger API / routing here
  };

  return (
    <header className="w-full relative bg-white border-b border-gray-100 px-6 flex items-center justify-between h-14">
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

      {/* Centered Search */}
      <form
        onSubmit={handleSubmit}
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
      >
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 min-w-[260px] focus-within:border-violet-400 focus-within:ring-1 focus-within:ring-violet-100 transition-all">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="opacity-40 flex-shrink-0"
          >
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M11 11L14 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search datasets…"
            className="bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none w-full"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-gray-300 hover:text-gray-500 transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        <Button
          type="submit"
        >
          Search
        </Button>
      </form>

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
