import { Database, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NoDataFoundProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export default function NoDataFound({
  title = "No Data Found",
  description = "No results match your current filters or query.",
  actionLabel,
  onAction,
  className,
}: NoDataFoundProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center border rounded-xl p-8 bg-muted/30",
        className
      )}
    >
      {/* Icon */}
      <div className="mb-4 rounded-full bg-muted p-4">
        <Database className="size-6 text-muted-foreground" />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-foreground">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mt-1 max-w-xs">
        {description}
      </p>

      {/* Action */}
      {actionLabel && onAction && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onAction}
          className="mt-4 flex items-center gap-2"
        >
          <RefreshCcw className="size-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
