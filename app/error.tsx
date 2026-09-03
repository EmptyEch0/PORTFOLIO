'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center min-h-[60vh]">
      <div className="relative w-full max-w-xs sm:max-w-sm aspect-square mb-6 flex items-center justify-center">
        <Image
          src="/no-internet.png"
          alt="No signal or error occurred"
          fill
          sizes="(max-width: 640px) 100vw, 384px"
          priority
          className="object-contain"
        />
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100 font-sans mb-2">
        Signal Interrupted
      </h1>
      
      <p className="text-sm text-gray-600 dark:text-zinc-400 max-w-md mb-8 font-sans leading-relaxed">
        An unexpected error occurred or the connection was lost.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
