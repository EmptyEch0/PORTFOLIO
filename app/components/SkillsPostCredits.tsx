'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillCategory {
  title: string;
  items: string[];
}

const categories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Kotlin', 'Dart', 'SQL', 'C']
  },
  {
    title: 'LLMs & Generative AI',
    items: [
      'OpenAI API', 'Gemini API', 'Claude', 'Ollama',
      'Prompt Engineering', 'Function Calling', 'MCP'
    ]
  },
  {
    title: 'AI Agents & Automation',
    items: ['LangChain', 'LangGraph', 'CrewAI', 'OpenClaw', 'Hermes', 'n8n', 'Zapier AI']
  },
  {
    title: 'RAG & AI Infrastructure',
    items: [
      'Retrieval-Augmented Generation (RAG)', 'Hybrid Search', 'Semantic Search',
      'Embeddings', 'Pinecone', 'ChromaDB', 'FAISS', 'pgvector', 'Redis'
    ]
  },
  {
    title: 'Machine Learning & Deep Learning',
    items: [
      'PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn',
      'CNN', 'RNN', 'LSTM', 'BiLSTM', 'Transformers'
    ]
  },
  {
    title: 'Computer Vision',
    items: ['OpenCV', 'YOLOv8', 'MediaPipe', 'DeepFace', 'OCR', 'Image Processing', 'Object Detection']
  },
  {
    title: 'Web Development',
    items: [
      'React', 'Next.js', 'NestJS', 'FastAPI', 'Flask',
      'Django', 'Express.js', 'REST APIs', 'WebSockets', 'Tailwind CSS'
    ]
  },
  {
    title: 'Mobile Development',
    items: ['Flutter', 'React Native', 'Capacitor', 'Android (Java/Kotlin)', 'Firebase', 'SQLite']
  },
  {
    title: 'Desktop Development',
    items: ['Electron.js', 'Flutter Desktop', 'Python (Tkinter/PyQt)', 'Llama.cpp Desktop']
  },
  {
    title: '3D & Interactive Web',
    items: ['Three.js', 'React Three Fiber', 'GSAP', 'CesiumJS', 'WebGL', 'Canvas API']
  },
  {
    title: 'Databases & ORMs',
    items: [
      'PostgreSQL', 'Neon', 'MySQL', 'MongoDB', 'SQLite',
      'Supabase', 'Redis', 'Drizzle ORM', 'Prisma'
    ]
  },
  {
    title: 'Cloud, DevOps & Infrastructure',
    items: [
      'Docker', 'Docker Compose', 'Ubuntu Server', 'Hostinger VPS',
      'AWS', 'Nginx', 'PM2', 'Linux Administration', 'Git', 'CI/CD', 'Vercel'
    ]
  },
  {
    title: 'Tools & Technologies',
    items: ['Figma', 'Jupyter Notebook', 'Kaggle', 'Postman', 'Qiskit', 'Agile/Scrum', 'System Design']
  }
];

export default function SkillsPostCredits() {
  const totalScenes = categories.length + 2;
  const [activeStep, setActiveStep] = useState(0);

  // Automatically change every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % totalScenes);
    }, 2000);
    return () => clearInterval(interval);
  }, [totalScenes]);

  return (
    <div className="w-full my-6 py-4 px-4 font-sans select-none relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* COMPACT CAROUSEL STAGE — ONLY ONE VISIBLE AT A TIME */}
      <div className="relative w-full max-w-2xl h-[130px] flex items-center justify-center text-center overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* CATEGORY TITLE CARDS — COMPACT FONT SIZES */}
          {activeStep < categories.length && (
            <motion.div
              key={`cat-${activeStep}`}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -35 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute inset-x-0 flex flex-col items-center justify-center space-y-2 px-2"
            >
              <h3 className="font-cormorant text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide text-zinc-100 leading-tight">
                {categories[activeStep].title}
              </h3>
              
              <p className="font-sans text-xs sm:text-sm text-[#B3B3B3] font-normal leading-relaxed max-w-xl">
                {categories[activeStep].items.join(' • ')}
              </p>
            </motion.div>
          )}

          {/* ENDING SCENE 1: PHILOSOPHY */}
          {activeStep === categories.length && (
            <motion.div
              key="ending-1"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -35 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 flex flex-col items-center justify-center space-y-1.5 px-2 text-center"
            >
              <p className="font-cormorant text-lg sm:text-xl md:text-2xl text-zinc-100 font-medium leading-snug">
                Every technology is just a tool.
              </p>
              <p className="font-cormorant text-lg sm:text-xl md:text-2xl text-zinc-300 font-normal leading-snug">
                The real skill is knowing when to use the right one.
              </p>
            </motion.div>
          )}

          {/* ENDING SCENE 2: FINAL CREDITS */}
          {activeStep === categories.length + 1 && (
            <motion.div
              key="ending-2"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -35 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 flex flex-col items-center justify-center space-y-2 px-2 text-center"
            >
              <h4 className="font-cormorant text-xl sm:text-2xl text-zinc-100 font-semibold tracking-wide">
                Thanks for exploring.
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#B3B3B3] tracking-widest uppercase font-light">
                — Likhith Kumar Mankala
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
