'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    setResponseMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setResponseMsg('Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setResponseMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setResponseMsg('Failed to send message. Please check your connection.');
    }
  };

  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xs text-zinc-200 font-sans not-prose">
      <h3 className="font-cormorant text-2xl text-zinc-100 font-semibold mb-1">Get in Touch</h3>
      <p className="text-xs text-zinc-400 mb-6 font-sans">
        Have an idea, project, or question? Send me a message directly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Name</label>
            <input
              type="text"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">Message</label>
          <textarea
            required
            rows={4}
            placeholder="Write your message here..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-zinc-100 text-zinc-900 font-medium text-xs hover:bg-white active:scale-98 disabled:opacity-50 transition-all cursor-pointer"
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>

        {responseMsg && (
          <p className={`text-xs mt-3 font-medium ${status === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {responseMsg}
          </p>
        )}
      </form>
    </div>
  );
}
