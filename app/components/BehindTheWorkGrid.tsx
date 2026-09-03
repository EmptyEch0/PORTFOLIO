'use client';

import React from 'react';

interface MomentItem {
  title: string;
  subtitle: string;
  tag: string;
  icon: string;
}

const moments: MomentItem[] = [
  {
    title: 'AI BOOTCAMP',
    subtitle: 'Sharing knowledge through practical learning.',
    tag: 'Knowledge Sharing',
    icon: '⚡',
  },
  {
    title: 'MENTORING SESSION',
    subtitle: 'Helping students turn ideas into projects.',
    tag: 'Guidance',
    icon: '💡',
  },
  {
    title: 'WORKSHOP',
    subtitle: 'Learning by building and experimenting.',
    tag: 'Hands-on',
    icon: '🛠️',
  },
  {
    title: 'TEAM MEETING',
    subtitle: 'Ideas become stronger when built together.',
    tag: 'Collaboration',
    icon: '🤝',
  },
  {
    title: 'ITYUKTA',
    subtitle: 'Building technology for the campus community.',
    tag: 'Campus Tech',
    icon: '🏛️',
  },
  {
    title: 'CODECRACK',
    subtitle: 'Encouraging students to think, build, and solve.',
    tag: 'Coding Contest',
    icon: '💻',
  },
  {
    title: 'STUDENT COMMUNITY',
    subtitle: 'Creating opportunities to learn together.',
    tag: 'Community',
    icon: '🌱',
  },
  {
    title: 'TEAM & GROUP MOMENTS',
    subtitle: 'The people behind the work.',
    tag: 'Memories',
    icon: '✨',
  },
];

export default function BehindTheWorkGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 not-prose font-sans">
      {moments.map((item, idx) => (
        <div
          key={idx}
          className="group relative flex flex-col justify-between p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-black/40 hover:-translate-y-0.5"
        >
          <div>
            <div className="aspect-[4/3] rounded-lg bg-zinc-950/70 border border-zinc-800/60 group-hover:border-zinc-700 flex flex-col items-center justify-center p-3 text-center transition-colors mb-3">
              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400">
                {item.tag}
              </span>
            </div>

            <h4 className="text-xs font-bold tracking-wider uppercase text-zinc-200 group-hover:text-white transition-colors">
              {item.title}
            </h4>
          </div>

          <p className="text-[13px] font-serif italic text-zinc-400 mt-2 leading-snug">
            {item.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}
