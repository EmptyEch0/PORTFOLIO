'use client';

import { useState, useEffect } from 'react';
import { PORTFOLIO_INTRO_QUOTES, IntroQuote } from '../data/portfolioIntroQuotes';

export default function SignatureIntro() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [quote, setQuote] = useState<IntroQuote | null>(null);

  useEffect(() => {
    // Only show the signature animation once per browser session when the user first enters the site
    try {
      const hasSeen = sessionStorage.getItem('hasSeenSignatureIntro');
      if (hasSeen === 'true') {
        return;
      }
      sessionStorage.setItem('hasSeenSignatureIntro', 'true');
    } catch {
      // Fallback if sessionStorage is disabled
    }

    setMounted(true);
    setVisible(true);

    // Select a random quote on first visit
    const randomIndex = Math.floor(Math.random() * PORTFOLIO_INTRO_QUOTES.length);
    setQuote(PORTFOLIO_INTRO_QUOTES[randomIndex]);

    // Split curtain exit sequence trigger
    const exitTriggerTimer = setTimeout(() => {
      setExiting(true);
    }, 3800);

    // Unmount after curtain split transition completes
    const unmountTimer = setTimeout(() => {
      setVisible(false);
    }, 4600);

    return () => {
      clearTimeout(exitTriggerTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  const handleSkip = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => setVisible(false), 800);
  };

  if (!mounted || !visible) return null;

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] overflow-hidden select-none cursor-pointer"
    >
      {/* Left Curtain Panel */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-[#09090B] shadow-2xl transition-transform duration-800 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          exiting ? '-translate-x-full' : 'translate-x-0'
        }`}
      />

      {/* Right Curtain Panel */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-[#09090B] shadow-2xl transition-transform duration-800 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          exiting ? 'translate-x-full' : 'translate-x-0'
        }`}
      />

      {/* Intro Main Content Container */}
      <div
        className={`relative z-20 w-full h-full flex flex-col items-center justify-between py-12 px-6 transition-all duration-500 ease-out ${
          exiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl">
          {/* Animated Sequential Signature SVG */}
          <div className="relative w-full max-w-[500px] aspect-[557/250] flex items-center justify-center filter drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
            <svg
              viewBox="0 0 557 250"
              className="w-full h-full overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Stroke 1: Outer Looping Frame */}
              <path
                className="sig-stroke sig-stroke-1"
                d="M 85,235 C 55,245 45,190 85,150 C 145,95 250,35 350,22 C 385,18 395,50 365,85 C 300,140 170,215 70,240"
              />

              {/* Stroke 2: Left M Stem */}
              <path
                className="sig-stroke sig-stroke-2"
                d="M 135,195 C 160,150 185,105 205,70 C 208,95 212,118 215,135"
              />

              {/* Stroke 3: Right M Peak & Lower Loop */}
              <path
                className="sig-stroke sig-stroke-3"
                d="M 215,135 C 240,110 265,80 290,55 C 270,110 250,165 235,210"
              />

              {/* Stroke 4: Right Loop & Long Trailing Underline */}
              <path
                className="sig-stroke sig-stroke-4"
                d="M 235,210 C 280,170 325,125 360,85 C 340,125 315,165 300,195 C 365,170 435,140 505,115"
              />
            </svg>
          </div>

          {/* Random Quote / Joke / Fact underneath with comfortable spacing */}
          {quote && (
            <div className="mt-12 text-center px-4 animate-fade-in-up max-w-lg">
              <p className="text-base sm:text-lg text-zinc-200 font-sans italic font-light leading-relaxed tracking-wide">
                "{quote.text}"
              </p>
            </div>
          )}
        </div>

        {/* Footer helper text */}
        <span className="text-[11px] text-zinc-500 font-mono tracking-widest uppercase opacity-70">
          Click anywhere to skip
        </span>
      </div>

      <style jsx global>{`
        .sig-stroke {
          fill: none;
          stroke: #ffffff;
          stroke-width: 4.8;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
        }

        /* Sequential signing stroke animations */
        .sig-stroke-1 {
          animation: drawStroke 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 0.15s;
        }

        .sig-stroke-2 {
          animation: drawStroke 0.65s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 1.25s;
        }

        .sig-stroke-3 {
          animation: drawStroke 0.65s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 1.85s;
        }

        .sig-stroke-4 {
          animation: drawStroke 0.85s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 2.45s;
        }

        @keyframes drawStroke {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.1s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
