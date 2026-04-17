import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal, HelpCircle, LogOut, Download } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useRouterState, useSearch } from "@tanstack/react-router";

const YEARS = [
  { name: "2022", value: "2022" },
  { name: "2023", value: "2023" },
  { name: "2024", value: "2024" },
  { name: "2025", value: "2025" },
];

const QUARTERS = [
  { name: "Quarter 1 (Q1)", value: "Q1" },
  { name: "Quarter 2 (Q2)", value: "Q2" },
  { name: "Quarter 3 (Q3)", value: "Q3" },
  { name: "Quarter 4 (Q4)", value: "Q4" },
];

const CATEGORIES = [
  { name: "Electronics", value: "Electronics" },
  { name: "Clothing", value: "Clothing" },
  { name: "Sports", value: "Sports" },
  { name: "Home", value: "Home" },
];
export default function Sidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const search = useSearch({ strict: false });
  const navigate = useNavigate({from:"/"});
  const year = search.year ?? "all";
  const quarter = search.quarter ?? "all";
  const category = search.category ?? "all";

  const handleReset = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        year: "all",
        quarter: "all",
        category: "all",
      }),
    });

  };
  const updateSearch = (key: string, value: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: value,
      }),
    });
  };

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

      {/* Filters */}
      <div className="px-5 pt-5 pb-4 flex flex-col gap-4">
        {/* Section Title */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-700" />
          <span className="font-bold text-gray-800 text-base">
            Advanced Filters
          </span>
        </div>

        {/* Year */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Choose Year
          </label>
          <Select value={year} onValueChange={(val)=>updateSearch("year", val)}>
            <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-400 hover:bg-blue-50 transition-all focus:ring-2 focus:ring-blue-200">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="rounded-xl shadow-lg border border-gray-200">
              <SelectItem
                value={"all"}
                className="text-sm font-medium cursor-pointer"
              >
                All
              </SelectItem>
              {YEARS.map((y) => (
                <SelectItem
                  key={y.value}
                  value={y.value}
                  className="text-sm font-medium cursor-pointer"
                >
                  {y.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quarter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Choose Quarter
          </label>
          <Select value={quarter} onValueChange={(val)=>updateSearch("quarter", val)}>
            <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-400 hover:bg-blue-50 transition-all focus:ring-2 focus:ring-blue-200">
              <SelectValue placeholder="Select quarter" />
            </SelectTrigger>
            <SelectContent className="rounded-xl shadow-lg border border-gray-200">
              <SelectItem
                value={"all"}
                className="text-sm font-medium cursor-pointer"
              >
                All
              </SelectItem>
              {QUARTERS.map((q) => (
                <SelectItem
                  key={q.value}
                  value={q.value}
                  className="text-sm font-medium cursor-pointer"
                >
                  {q.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        {pathname!=="/" && 
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Choose Category
            </label>
            <Select value={category} onValueChange={(val)=>updateSearch("category", val)}>
              <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-400 hover:bg-blue-50 transition-all focus:ring-2 focus:ring-blue-200">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg border border-gray-200">
                <SelectItem
                  value={"all"}
                  className="text-sm font-medium cursor-pointer"
                >
                  All
                </SelectItem>
                {CATEGORIES.map((c) => (
                  <SelectItem
                    key={c.value}
                    value={c.value}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
        {/*  Reset */}
        <Button
          onClick={handleReset}
          variant={"ghost"}
          className="cursor-pointer"
        >
          Reset Filters 
        </Button>
      </div>

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
