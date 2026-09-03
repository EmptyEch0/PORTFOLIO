'use client';

import React, { useState } from 'react';

interface ProjectImageItem {
  src?: string;
  alt?: string;
  caption?: string;
  placeholderTitle?: string;
  placeholderSubtitle?: string;
}

interface ProjectImageShowcaseProps {
  images?: ProjectImageItem[];
  title?: string;
  badge?: string;
}

export default function ProjectImageShowcase({
  images = [
    {
      placeholderTitle: 'Feature Overview & UI Preview',
      placeholderSubtitle: 'Main interface screenshot or core interaction flow',
      caption: 'Screenshot 1 — Core Interface & Action Flow',
    },
    {
      placeholderTitle: 'In-App Experience & Settings',
      placeholderSubtitle: 'Extension popup, review drawer, or live interaction preview',
      caption: 'Screenshot 2 — Extension View & Suggestions',
    },
  ],
  title = 'Visual Preview & Screenshots',
  badge = 'Product Gallery',
}: ProjectImageShowcaseProps) {
  const [selectedImage, setSelectedImage] = useState<ProjectImageItem | null>(null);

  return (
    <div className="my-8 not-prose">
      <div className="p-4 sm:p-5 rounded-lg bg-zinc-900/40 border border-zinc-800/80">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-2.5 border-b border-zinc-800/70">
          <div>
            <span className="text-[10.5px] font-mono uppercase tracking-widest text-zinc-400 block">
              {badge}
            </span>
            <h4 className="text-sm sm:text-base font-medium text-zinc-200 font-serif mt-0.5">
              {title}
            </h4>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">2 Display Slots</span>
        </div>

        {/* 2 Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.slice(0, 2).map((img, idx) => (
            <div key={idx} className="group relative flex flex-col">
              {img.src ? (
                <div
                  onClick={() => setSelectedImage(img)}
                  className="relative cursor-pointer overflow-hidden rounded-md border border-zinc-800 bg-zinc-950 aspect-[16/10] flex items-center justify-center transition-all duration-200 hover:border-zinc-600"
                >
                  <img
                    src={img.src}
                    alt={img.alt || `Project visual ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <span className="text-[11px] text-zinc-200 font-mono bg-zinc-900/90 px-2 py-0.5 rounded border border-zinc-700">
                      Click to expand
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-md border border-dashed border-zinc-800 bg-zinc-950/50 p-5 aspect-[16/10] flex flex-col items-center justify-center text-center transition-colors hover:border-zinc-700">
                  <div className="w-9 h-9 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-2.5 text-zinc-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-zinc-300 mb-0.5 font-serif">
                    {img.placeholderTitle || `Visual Slot ${idx + 1}`}
                  </span>
                  <span className="text-[11px] text-zinc-400 max-w-[240px] leading-snug">
                    {img.placeholderSubtitle || 'Space for screenshot or workflow diagram'}
                  </span>
                  <div className="mt-2.5 text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    Slot {idx + 1} / 2
                  </div>
                </div>
              )}

              {img.caption && (
                <p className="text-[11px] text-zinc-400 text-center font-serif italic mt-2">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && selectedImage.src && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-zinc-400 hover:text-white p-1.5 rounded hover:bg-zinc-800 transition-colors z-10"
              aria-label="Close preview"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="overflow-hidden rounded flex justify-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt || 'Project screenshot'}
                className="max-h-[85vh] w-auto object-contain rounded"
              />
            </div>
            {selectedImage.caption && (
              <p className="text-center text-xs font-serif text-zinc-300 mt-2.5 italic">
                {selectedImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
