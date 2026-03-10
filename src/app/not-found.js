import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-dark px-[var(--gutter)]">
      <div className="text-center max-w-md">
        <span className="font-display text-[clamp(80px,15vw,200px)] text-gold/20 leading-none block">
          404
        </span>
        <h1 className="font-display italic text-[length:var(--type-h2)] text-text-light mt-4 mb-4">
          Page not found
        </h1>
        <p className="font-body text-sm text-text-muted-light font-light mb-8">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <Link href="/" className="btn-outline">
          <span>Back to Home →</span>
        </Link>
      </div>
    </main>
  );
}
