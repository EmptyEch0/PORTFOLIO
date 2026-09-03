'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface PolaroidItem {
  src: string;
  alt: string;
  caption?: string;
  defaultRotate?: number;
  defaultTranslateY?: number;
}

const defaultPhotos: PolaroidItem[] = [
  {
    src: '/blog/polaroid-miracle.jpg',
    alt: 'Miracle Digital Summit 2025',
    caption: 'Miracle Summit 2025',
    defaultRotate: -2.8,
    defaultTranslateY: -3,
  },
  {
    src: '/blog/polaroid-presentation.jpg',
    alt: 'AI Health Core Presentation',
    caption: 'AI Health Core',
    defaultRotate: 1.6,
    defaultTranslateY: 4,
  },
  {
    src: '/blog/polaroid-team-agli.jpg',
    alt: 'Team Agli Celebration',
    caption: 'Team Agli',
    defaultRotate: -1.8,
    defaultTranslateY: -2,
  },
  {
    src: '/blog/polaroid-community.jpg',
    alt: 'Community & Mentorship Gathering',
    caption: 'Community & Mentorship',
    defaultRotate: 2.6,
    defaultTranslateY: 2,
  },
];

interface PolaroidGalleryProps {
  photos?: PolaroidItem[];
  title?: string;
  subtitle?: string;
}

function PolaroidCard({
  photo,
  index,
  onSelect,
}: {
  photo: PolaroidItem;
  index: number;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    `rotate(${photo.defaultRotate ?? 0}deg) translateY(${photo.defaultTranslateY ?? 0}px)`
  );
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt calculation
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    const extraTilt = (photo.defaultRotate ?? 0) * 0.2;

    setTransformStyle(
      `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${extraTilt.toFixed(2)}deg) translateY(-8px) scale(1.06)`
    );

    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle(
      `rotate(${photo.defaultRotate ?? 0}deg) translateY(${photo.defaultTranslateY ?? 0}px) scale(1)`
    );
    setGlarePosition({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View photo: ${photo.caption || photo.alt}`}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.25s ease-out'
          : 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.45s ease-out',
        zIndex: isHovered ? 30 : 10 + index,
      }}
      className="relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 select-none rounded-[3px] shadow-lg shadow-black/60 hover:shadow-2xl hover:shadow-black/90"
    >
      {/* Polaroid outer frame */}
      <div className="relative overflow-hidden rounded-[3px] bg-[#fdfcf9] dark:bg-[#1a1a1c] p-0 border border-black/10 dark:border-white/10">
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-auto object-cover rounded-[2px] block pointer-events-none"
          loading="lazy"
        />

        {/* Dynamic glossy glare highlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`,
            opacity: glarePosition.opacity,
          }}
        />
      </div>

      {/* Pin/tape or subtle drop shadow accent */}
      <div className="absolute -inset-1 rounded-[4px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

export default function PolaroidGallery({
  photos = defaultPhotos,
  title,
  subtitle,
}: PolaroidGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidItem | null>(null);

  // Close lightbox on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };
    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  return (
    <section className="my-8 -mx-3 sm:-mx-8 md:-mx-12 lg:-mx-16 px-1 sm:px-2 not-prose">
      {(title || subtitle) && (
        <div className="mb-6 text-center sm:text-left px-2">
          {title && (
            <h3 className="font-serif text-lg sm:text-xl font-medium text-zinc-100 tracking-tight">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs text-zinc-400 font-serif italic mt-0.5">{subtitle}</p>
          )}
        </div>
      )}

      {/* Polaroid row container */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 md:gap-6 items-center py-5 px-1 sm:px-2">
        {photos.slice(0, 4).map((photo, idx) => (
          <div key={idx} className="w-full flex justify-center">
            <div className="w-full max-w-[260px] sm:max-w-none">
              <PolaroidCard
                photo={photo}
                index={idx}
                onSelect={() => setSelectedPhoto(photo)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 sm:p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 transition-colors z-10"
              aria-label="Close image preview"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="overflow-hidden rounded flex justify-center">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-h-[85vh] w-auto object-contain rounded"
              />
            </div>
            {selectedPhoto.caption && (
              <p className="text-center text-sm font-serif text-zinc-300 mt-3 italic">
                {selectedPhoto.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
