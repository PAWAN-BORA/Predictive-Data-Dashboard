import { Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import TypingSkeleton from "../common/TypingSkeleton";
import { useAISummary } from "@/hooks/useAISummary";
import { useSearch } from "@tanstack/react-router";


export default function AISummary() {

  const search = useSearch({ strict: false });
  const year = search.year ?? "all";
  const category = search.category ?? "all";
  const groupBy = search.groupBy ?? "quarter";
  const quarter = search.quarter ?? "all";
  const {data, error, isLoading} = useAISummary({year, quarter, category, groupBy:groupBy})
  return (
    <div
      className={"w-full rounded-xl border bg-muted/40 p-4 flex gap-3 items-start"}
    >
      {/* Icon */}
      <div className="mt-1">
        {isLoading ? (
          <Loader2 className="size-5 text-primary animate-spin" />
        ) : (
          <Sparkles className="size-5 text-primary" />
        )}
      </div>

      <div className="flex-1 mt-1">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-semibold text-primary">
            AI Executive Summary
          </p>

          {isLoading ? (
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-primary/10 text-primary animate-pulse">
              Generating...
            </span>
          ) : (
              null
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="mt-2"><TypingSkeleton /></div>
        ) : (
            error?
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-red-600">
                  Failed to generate summary
                </p>
                <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  {error.message}
                </p>
              </div>
              :
              <p className="mt-2 text-sm text-foreground leading-relaxed">
                {data?.text} 
              </p>
          )}
      </div>
    </div>
  );
}
