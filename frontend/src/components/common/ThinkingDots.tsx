export default function ThinkingDots() {
  return (
    <div className="flex gap-1">
      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
    </div>
  );
}
