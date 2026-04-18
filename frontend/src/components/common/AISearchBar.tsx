import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import ThinkingDots from "./ThinkingDots";
import { toast } from "sonner";
import { fetcher } from "@/lib/fetcher";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function AISearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSearch = async () => {
    if (!query.trim()) {
      
      toast.info("Write Query to seach", { position: "top-right" });
      return
    };

    setLoading(true);

    // simulate AI thinking
    try {
      const urlPart = "ai/query";
      type aiRes = {
        category:string|null,
        metric : string | null
        quarter : string | null
        queryType : string | "invalid"
        year : string | null
      }
      const data = await fetcher(
        urlPart,
        {
          method:"POST",
          body:JSON.stringify({"query":query})
        }
      ) as aiRes
      if(data.year==null && data.category==null && data.metric==null && data.quarter==null && data.queryType=="invalid"){
        toast.error("Invalid Query", {
          description:"Try asking about trends, comparison, growth, or forecast for a valid category",
        })
        return 
      }
      // console.log(data, 'this is data.')
      const allowed = ["trend", "comparison", "growth", "forecast"];
      const isExist = allowed.includes(data.queryType);
      const to = !isExist?"trends":data.queryType;
      navigate({
        to:`/${to}`,
        search:{
          year:data.year?data.year:undefined,
          quarter:data.quarter?data.quarter:undefined,
          category:data.category?data.category:undefined,
          metric:data.metric?data.metric:undefined
        }
      })
    } catch(e) {
      const message = e instanceof Error?e.message:"Error in api"
      toast.error(message, { position: "top-right" });
    } finally {
      setLoading(false);
    }
    

  };

  return (
    <div className="relative w-full max-w-xl">
      {/* glow border */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl blur-md opacity-40 transition",
          loading
            ? "bg-gradient-to-r from-primary via-purple-500 to-blue-500 animate-pulse"
            : "bg-transparent"
        )}
      />

      <div className="relative flex items-center bg-background border rounded-xl px-3 py-2 shadow-sm">
        {/* icon */}
        <Search className="size-4 text-muted-foreground mr-2" />

        {/* input */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything about data..."
          className="flex-1 bg-transparent outline-none text-sm"
        />

        {/* right section */}
        <div className="flex items-center gap-2">
          {loading ? (
            <ThinkingDots />
          ) : (
            <Sparkles className="size-4 text-primary" />
          )}

          <Button
            onClick={handleSearch}
            disabled={loading}
            className="text-sm cursor-pointer"

          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
