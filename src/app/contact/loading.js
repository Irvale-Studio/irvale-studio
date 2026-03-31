export default function ContactLoading() {
  return (
    <main className="min-h-screen bg-dark pt-32 pb-20">
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
        <div className="h-16 w-72 max-w-full bg-white/5 rounded mb-6 animate-pulse" />
        <div className="h-4 w-96 max-w-full bg-white/5 rounded mb-12 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-48 bg-white/5 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  );
}
