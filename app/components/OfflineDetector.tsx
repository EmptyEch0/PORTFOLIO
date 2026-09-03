'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function OfflineDetector() {
  const [isOffline, setIsOffline] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Set initial state
    if (typeof window !== 'undefined') {
      setIsOffline(!navigator.onLine);
    }

    const handleOffline = () => {
      setIsOffline(true);
      setDismissed(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline || dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl relative flex flex-col items-center">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full transition-colors"
          title="Dismiss"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative w-full max-w-xs aspect-square mb-6 flex items-center justify-center">
          <Image
            src="/no-internet.png"
            alt="No connection signal"
            fill
            sizes="(max-width: 640px) 100vw, 320px"
            priority
            className="object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2 font-sans">
          No Internet Connection
        </h2>

        <p className="text-sm text-zinc-400 mb-6 font-sans leading-relaxed">
          You are currently offline. Please check your network connection or signal.
        </p>

        <div className="flex gap-3 w-full">
          <button
            onClick={() => {
              if (navigator.onLine) {
                setIsOffline(false);
              } else {
                window.location.reload();
              }
            }}
            className="flex-1 py-2.5 px-4 bg-white text-zinc-900 font-medium rounded-full text-sm hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Retry Connection
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="py-2.5 px-4 bg-zinc-800 text-zinc-300 font-medium rounded-full text-sm hover:bg-zinc-700 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
