export default function WorkLoading() {
  return (
    <main className="min-h-screen bg-dark pt-32 pb-20">
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
        <div className="h-8 w-24 bg-white/5 rounded mb-4 animate-pulse" />
        <div className="h-16 w-96 max-w-full bg-white/5 rounded mb-12 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[16/10] bg-white/5 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  );
}
