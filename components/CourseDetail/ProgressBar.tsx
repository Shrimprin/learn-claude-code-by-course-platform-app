export function ProgressBar({
  percent,
  label,
}: {
  percent: number;
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <div className="flex items-center justify-between text-xs" style={{ color: "var(--muted)" }}>
          <span>{label}</span>
          <span style={{ color: "#a5b4fc" }}>{percent}%</span>
        </div>
      )}
      <div
        className="h-1.5 w-full overflow-hidden rounded-full"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percent}%`,
            background: "linear-gradient(90deg, #6366f1, #a855f7)",
          }}
        />
      </div>
    </div>
  );
}
