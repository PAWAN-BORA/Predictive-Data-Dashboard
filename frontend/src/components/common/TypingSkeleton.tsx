export default function TypingSkeleton() {
  return (
    <div className="space-y-2">
      <div className="h-3 w-full rounded bg-gradient-to-r from-muted via-muted-foreground/30 to-muted animate-[pulse_1.5s_ease-in-out_infinite]" />
      <div className="h-3 w-5/6 rounded bg-gradient-to-r from-muted via-muted-foreground/30 to-muted animate-[pulse_1.5s_ease-in-out_infinite]" />
    </div>
  );
}
