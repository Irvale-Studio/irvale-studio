export default function ServicesLoading() {
  return (
    <main className="min-h-screen bg-dark pt-32 pb-20">
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
        <div className="h-8 w-24 bg-white/5 rounded mb-4 animate-pulse" />
        <div className="h-16 w-80 max-w-full bg-white/5 rounded mb-16 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-96 bg-white/5 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  );
}
