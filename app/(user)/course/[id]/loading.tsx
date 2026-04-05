export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-32">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
        style={{ borderColor: "rgba(99,102,241,0.3)", borderTopColor: "#6366f1" }}
      />
    </div>
  );
}
