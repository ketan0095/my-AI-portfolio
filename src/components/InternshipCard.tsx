'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Code2, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

const InternshipCard = () => {
  const openMail = () => {
    window.open(`mailto:${process.env.NEXT_PUBLIC_EMAIL}`, '_blank');
  };
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-accent mx-auto mt-8 w-full max-w-4xl rounded-3xl px-6 py-8 font-sans sm:px-10 md:px-16 md:py-12"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar placeholder */}
          <div className="bg-muted h-32 w-32 overflow-hidden rounded-full shadow-md">
            <img
              src="/profile_pic1.jpeg"
              alt="Ketan's avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-foreground text-2xl font-semibold">
              Ketan Shetye
            </h2>
            <p className="text-muted-foreground text-sm">
              Software Engineer - Voice AI
            </p>
          </div>
        </div>

        {/* Live badge */}
        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <span className="flex items-center gap-1 rounded-full border border-green-500 px-3 py-0.5 text-sm font-medium text-green-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Live
          </span>
        </div>
      </div>

      {/* Internship Info */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-1 h-5 w-5 text-blue-500" />
          <div>
            <p className="text-foreground text-sm font-medium">Current company</p>
            <p className="text-muted-foreground text-sm">
              Sophiie AI, Queensland
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Globe className="mt-1 h-5 w-5 text-green-500" />
          <div>
            <p className="text-foreground text-sm font-medium">Location</p>
            <p className="text-muted-foreground text-sm">
              Melbourne,Australia 🇦🇺
            </p>
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex items-start gap-3 sm:col-span-2">
          <Code2 className="mt-1 h-5 w-5 text-purple-500" />
          <div className="w-full">
            <p className="text-foreground text-sm font-medium">Tech stack</p>
            <div className="text-muted-foreground grid grid-cols-1 gap-y-1 text-sm sm:grid-cols-2">
              <ul className="decoration-none list-disc pl-4">
                <li>Python, Next.js, TypeScript, Tailwind CSS</li>
                <li>Livekit SDK, Voice AI </li>
                <li>OpenAI, Deepgram, Claude, 11labs</li>
                <li>Prompt engineering, fine-tuning</li>
              </ul>
              <ul className="list-disc pl-4">
                <li>Chroma DB, Pinecone, vector DBs</li>
                <li>Hugging Face Transformers</li>
                <li>Tool routing, calling, RAG</li>
                <li>Hackathons + AI agent workflows</li>
                <li>
                  <a
                    href="/chat?query=What%20are%20your%20skills%3F%20Give%20me%20a%20list%20of%20your%20soft%20and%20hard%20skills."
                    className="cursor-pointer items-center text-blue-500 underline"
                  >
                    See more
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* What I bring */}
      <div className="mt-10">
        <p className="text-foreground mb-2 text-lg font-semibold">
          What I bring
        </p>
        <p className="text-foreground text-sm">
          I bring hands-on experience building production-ready GenAI systems—especially in voice AI🎙️, real-time interactions ⚡, and full-stack integration. From developing smart assistants at Sophiie.ai using LiveKit, Deepgram, and GPT-4, to leading the award-winning Machine Agent platform, I’ve shipped impactful AI solutions across healthcare, customer support, and 3D fashion.
          <br /> I combine a deep understanding of AI tooling with strong product thinking, and I move fast without compromising on quality. Above all, I bring a builder mindset—focused 🛠️ on solving real problems with useful, scalable tech.
        </p>
      </div>

      {/* Goal */}
      <div className="mt-8">
        <p className="text-foreground mb-2 text-lg font-semibold">Future Focus</p>
        <p className="text-foreground text-sm">
          In the next five years, I aim to become a leading builder of real-time, multimodal AI agents that seamlessly integrate voice, language, and context. I plan to launch or lead high-impact AI products that solve real-world problems, while contributing to open-source and mentoring future AI engineers 🔥
        </p>
      </div>

      {/* Contact button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={openMail}
          className="cursor-pointer rounded-full bg-black px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-zinc-800"
        >
          Contact me
        </button>
      </div>
    </motion.div>
  );
};

export default InternshipCard;
