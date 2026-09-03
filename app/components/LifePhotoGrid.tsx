'use client';

import React, { useState } from 'react';

interface PhotoProps {
  src: string;
  alt: string;
  title: string;
  caption: string;
  fit?: 'cover' | 'contain';
  bg?: string;
  className?: string;
}

interface LifePhotoGridProps {
  photos: PhotoProps[];
  gap?: 'none' | 'xs' | 'sm' | 'md';
  expand?: boolean;
  aspect?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

function PhotoItem({ 
  src, 
  alt, 
  title, 
  caption, 
  fit = 'cover', 
  bg, 
  className = '',
  aspect = 'aspect-[16/10]',
  rounded = 'rounded-none'
}: PhotoProps & { aspect?: string; rounded?: string }) {
  const [hasError, setHasError] = useState(false);

  const isContain = fit === 'contain';

  return (
    <div 
      className={`group relative ${aspect} w-full ${rounded} overflow-hidden border border-zinc-800/90 ${
        bg || (isContain ? 'bg-[#0c0c0e]' : 'bg-[#0c0c0e]')
      } shadow-md transition-all duration-300 hover:border-zinc-600/80 hover:shadow-xl flex items-center justify-center`}
      title={caption || title || alt}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt || caption || title || 'Photo'}
          onError={() => setHasError(true)}
          className={`w-full h-full ${
            isContain ? 'object-contain p-1 sm:p-1.5' : 'object-cover'
          } transition-transform duration-500 ease-out group-hover:scale-[1.015] ${className}`}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-zinc-900/60 text-center">
          <span className="font-serif text-sm text-zinc-400 font-medium">{caption || title}</span>
        </div>
      )}
    </div>
  );
}

export default function LifePhotoGrid({ 
  photos, 
  gap = 'xs', 
  expand = true,
  aspect = 'aspect-[16/10]',
  rounded = 'none'
}: LifePhotoGridProps) {
  const gapClass = {
    none: 'gap-0',
    xs: 'gap-1.5 sm:gap-2',
    sm: 'gap-2.5 sm:gap-3',
    md: 'gap-4 sm:gap-5'
  }[gap] || 'gap-1.5 sm:gap-2';

  const roundedClass = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl'
  }[rounded] || 'rounded-none';

  const expandClass = expand ? '-mx-2 sm:-mx-6 lg:-mx-8 my-8 sm:my-10' : 'my-8';

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${gapClass} ${expandClass} not-prose items-stretch`}>
      {photos.map((photo, idx) => (
        <PhotoItem key={idx} {...photo} aspect={aspect} rounded={roundedClass} />
      ))}
    </div>
  );
}
