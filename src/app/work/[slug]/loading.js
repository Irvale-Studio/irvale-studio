export default function CaseStudyLoading() {
  return (
    <main className="min-h-screen bg-dark pt-32 pb-20">
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--gutter)]">
        <div className="h-6 w-20 bg-white/5 rounded mb-4 animate-pulse" />
        <div className="h-20 w-[500px] max-w-full bg-white/5 rounded mb-8 animate-pulse" />
        <div className="aspect-[16/9] bg-white/5 rounded mb-12 animate-pulse" />
        <div className="space-y-4">
          <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    </main>
  );
}
