'use client';

import React, { useState, useRef } from 'react';

interface PhotoItem {
  src: string;
  alt: string;
  caption?: string;
  defaultRotate?: number;
}

interface LandscapePhotoProps {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number;
}

interface PortraitRowProps {
  photos?: PhotoItem[];
}

const defaultPortraits: PhotoItem[] = [
  {
    src: '/college/jntu-booyahs.png',
    alt: 'Booyahs - Hostel Friends & Memories',
    caption: 'Booyahs',
    defaultRotate: -2.2,
  },
  {
    src: '/college/jntu-araku.png',
    alt: 'Araku Unplanned Journey',
    caption: 'Araku',
    defaultRotate: 2.0,
  },
];

// Single Portrait Card Component
function PortraitCard({
  photo,
  index,
  onSelect,
}: {
  photo: PhotoItem;
  index: number;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    `rotate(${photo.defaultRotate ?? 0}deg)`
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

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    const baseRot = photo.defaultRotate ?? 0;

    setTransformStyle(
      `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${(baseRot * 0.3).toFixed(2)}deg) translateY(-6px) scale(1.05)`
    );

    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle(`rotate(${photo.defaultRotate ?? 0}deg) scale(1)`);
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
          ? 'transform 0.1s ease-out, filter 0.25s ease-out'
          : 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.45s ease-out',
        zIndex: isHovered ? 30 : 10 + index,
      }}
      className="relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 select-none drop-shadow-md hover:drop-shadow-2xl"
    >
      <div className="relative overflow-hidden rounded-[2px]">
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-auto object-contain block pointer-events-none"
          loading="lazy"
        />

        {/* Dynamic glare highlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)`,
            opacity: glarePosition.opacity,
          }}
        />
      </div>
    </div>
  );
}

// Portrait Photos Row Component
export function PortraitPhotoRow({ photos = defaultPortraits }: PortraitRowProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    if (selectedPhoto) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  const gridClass =
    photos.length === 2
      ? 'grid grid-cols-2 max-w-[560px] mx-auto gap-5 sm:gap-8'
      : photos.length === 1
      ? 'flex justify-center max-w-[280px] mx-auto'
      : 'grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-5';

  return (
    <section className="my-8 -mx-2 sm:-mx-6 px-1 sm:px-2 not-prose">
      {/* Portrait Images Grid */}
      <div className={`${gridClass} items-center justify-center py-2`}>
        {photos.map((photo, idx) => (
          <div key={idx} className="w-full flex justify-center">
            <div className="w-full max-w-[270px]">
              <PortraitCard
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="overflow-hidden rounded flex justify-center">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-h-[80vh] w-auto object-contain rounded"
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

// Single Landscape Photo Component (1 per row)
export function LandscapePhotoCard({ src, alt, caption, rotate = -0.8 }: LandscapePhotoProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>(`rotate(${rotate}deg)`);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(0deg) translateY(-4px) scale(1.02)`
    );

    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.12,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle(`rotate(${rotate}deg) scale(1)`);
    setGlarePosition({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div className="my-8 -mx-2 sm:-mx-6 px-1 sm:px-2 not-prose">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsOpen(true)}
        tabIndex={0}
        role="button"
        aria-label={`View photo: ${caption || alt}`}
        style={{
          transform: transformStyle,
          transition: isHovered
            ? 'transform 0.1s ease-out, filter 0.25s ease-out'
            : 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.45s ease-out',
        }}
        className="relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 select-none w-full max-w-3xl mx-auto drop-shadow-lg hover:drop-shadow-2xl"
      >
        <div className="relative overflow-hidden rounded-[3px]">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-contain block pointer-events-none"
            loading="lazy"
          />

          {/* Dynamic glare highlight */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`,
              opacity: glarePosition.opacity,
            }}
          />
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 sm:p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 transition-colors z-10"
              aria-label="Close image preview"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="overflow-hidden rounded flex justify-center">
              <img src={src} alt={alt} className="max-h-[85vh] w-auto object-contain rounded" />
            </div>
            {caption && (
              <p className="text-center text-sm font-serif text-zinc-300 mt-3 italic">{caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CollegePhotoGallery() {
  return (
    <div className="space-y-6">
      <PortraitPhotoRow />
    </div>
  );
}
