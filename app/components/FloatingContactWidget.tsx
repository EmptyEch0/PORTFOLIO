'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { performSemanticSearch, SearchResponse } from '../lib/semanticSearch';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  actionUrl?: string;
  actionLabel?: string;
  matchedTitle?: string;
}

export default function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hey! 👋 I'm Likhith's portfolio AI assistant. Ask me anything about his birthplace, college, projects, internships, or tech stack.",
      actionUrl: '/projects',
      actionLabel: 'Browse Key Projects ↗'
    }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Click outside listener to close chatbot
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    const query = input.trim();
    if (!query) return;

    const userMsg: Message = { role: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const res: SearchResponse = performSemanticSearch(query);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: res.answer,
          actionUrl: res.actionUrl,
          actionLabel: res.actionLabel ? `${res.actionLabel} ↗` : undefined,
          matchedTitle: res.matchedTitle
        }
      ]);
    }, 200);
  };

  const sampleQuestions = [
    'Who is Likhith?',
    'Where was he born?',
    'What college did he attend?',
    'Tell me about Serea',
    'Work experience?',
  ];

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-16 sm:bottom-20 right-8 sm:right-12 z-[9990] flex items-center justify-end font-sans select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Right-to-Left Slide Hover Tooltip Pill */}
      <AnimatePresence>
        {isHovered && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 25, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            onClick={() => setIsOpen(true)}
            className="mr-3 px-4 py-2 rounded-xl bg-zinc-900/95 border border-zinc-750 text-zinc-100 text-xs font-medium shadow-2xl backdrop-blur-md whitespace-nowrap cursor-pointer hover:bg-zinc-800 transition-colors flex items-center gap-2"
          >
            <span>Hey 👋 Click to ask me anything!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="mr-3 rounded-2xl bg-zinc-950/95 border border-zinc-800 shadow-2xl backdrop-blur-md w-[320px] sm:w-[370px] flex flex-col overflow-hidden"
            style={{ maxHeight: '530px' }}
          >
            {/* Header with spacious padding */}
            <div className="px-5 py-4 border-b border-zinc-800/80 flex items-center gap-3.5 shrink-0">
              <img
                src="/avatar-logo.png"
                alt="Assistant"
                className="w-8 h-8 rounded-full object-cover object-[50%_25%] scale-125 border border-zinc-700"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-zinc-100 tracking-tight">Ask About Likhith</h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-zinc-200 transition-colors text-lg leading-none cursor-pointer p-1"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3.5 min-h-[220px] max-h-[350px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[90%] px-3.5 py-2.5 rounded-2xl text-[12.5px] leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-zinc-100 text-zinc-900 rounded-br-md font-medium'
                        : 'bg-zinc-850 text-zinc-200 rounded-bl-md border border-zinc-800'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Dynamic Action Button */}
                  {msg.role === 'assistant' && msg.actionUrl && msg.actionLabel && (
                    <Link
                      href={msg.actionUrl}
                      onClick={() => setIsOpen(false)}
                      className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 px-3 py-1 rounded-full transition-all cursor-pointer shadow-xs"
                    >
                      <span>{msg.actionLabel}</span>
                    </Link>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Sample Questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {sampleQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      const userMsg: Message = { role: 'user', text: q };
                      setMessages((prev) => [...prev, userMsg]);
                      setTimeout(() => {
                        const res = performSemanticSearch(q);
                        setMessages((prev) => [
                          ...prev,
                          {
                            role: 'assistant',
                            text: res.answer,
                            actionUrl: res.actionUrl,
                            actionLabel: res.actionLabel ? `${res.actionLabel} ↗` : undefined,
                            matchedTitle: res.matchedTitle
                          }
                        ]);
                      }, 200);
                    }}
                    className="text-[10.5px] px-2.5 py-1 rounded-full border border-zinc-700/80 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-all cursor-pointer bg-zinc-900/60"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSend} className="px-3.5 py-3 border-t border-zinc-800/80 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="px-3.5 py-2 rounded-xl bg-zinc-100 text-zinc-900 text-xs font-medium hover:bg-white disabled:opacity-30 transition-all cursor-pointer shrink-0"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Avatar Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ask about Likhith"
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-zinc-700/80 bg-zinc-950 shadow-2xl cursor-pointer overflow-hidden flex items-center justify-center shrink-0 group transition-colors hover:border-zinc-400"
      >
        <img
          src="/avatar-logo.png"
          alt="Portfolio Assistant"
          className="w-[130%] h-[130%] rounded-full object-cover object-[50%_25%] group-hover:scale-110 transition-transform duration-300"
        />
      </motion.button>
    </div>
  );
}
