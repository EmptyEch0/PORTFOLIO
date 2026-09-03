import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center min-h-[60vh]">
      <div className="relative w-full max-w-xs sm:max-w-sm aspect-square mb-6 flex items-center justify-center">
        <Image
          src="/no-internet.png"
          alt="No signal or page not found"
          fill
          sizes="(max-width: 640px) 100vw, 384px"
          priority
          className="object-contain"
        />
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100 font-sans mb-2">
        404 — Page Not Found
      </h1>
      
      <p className="text-sm text-gray-600 dark:text-zinc-400 max-w-md mb-8 font-sans leading-relaxed">
        Looks like this signal was lost or the page you are searching for does not exist.
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
