"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const previewCards = [
  {
    topic: "Philosophy",
    topicBg: "#F5F0E8",
    topicText: "#78350F",
    icon: "\uD83D\uDCDC",
    title: "The Examined Life",
    description: "Socrates, self-knowledge, and the habit of questioning your own assumptions.",
    rotate: -6,
    offset: { top: 40, left: 0 },
  },
  {
    topic: "Communication",
    topicBg: "#EAF4EF",
    topicText: "#1A6B4A",
    icon: "\uD83D\uDCAC",
    title: "Difficult Conversations",
    description: "A three-part framework for disagreements that don't devolve into defensiveness.",
    rotate: 3,
    offset: { top: 0, left: 40 },
  },
  {
    topic: "Psychology",
    topicBg: "#FDF0E8",
    topicText: "#C2703D",
    icon: "\uD83E\uDDE0",
    title: "The Availability Heuristic",
    description: "Why we overweight what we remember \u2014 and how to correct for it.",
    rotate: 8,
    offset: { top: 80, left: 80 },
  },
];

export function VbHero() {
  return (
    <section
      className="w-full"
      style={{ background: "#FAFAF6", borderBottom: "1px solid #E8E4DC" }}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 md:grid-cols-5 md:py-32">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-3"
        >
          <p
            className="text-[11px] font-semibold uppercase"
            style={{ color: "#A8A29E", letterSpacing: "0.2em" }}
          >
            A new kind of learning
          </p>
          <h1
            className="mt-4 font-bold leading-[1.08]"
            style={{
              color: "#1C1917",
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(36px, 6vw, 72px)",
              letterSpacing: "-0.01em",
            }}
          >
            One lesson a day.
            <br />
            A lifetime of clarity.
          </h1>
          <p
            className="mt-6 max-w-lg text-lg"
            style={{ color: "#57534E", lineHeight: 1.7 }}
          >
            195+ topics. Five minutes. Genuine knowledge that stays with you.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/signup"
              className="inline-block rounded-[8px] px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "#1A6B4A", color: "#FFFFFF" }}
            >
              Start Reading Today
            </Link>
            <Link
              href="/explore"
              className="text-sm font-medium underline-offset-4 hover:underline"
              style={{ color: "#57534E" }}
            >
              Explore topics &rarr;
            </Link>
          </div>
        </motion.div>

        {/* Right: stacked preview cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:col-span-2 md:block"
          style={{ minHeight: 380 }}
        >
          {previewCards.map((card, i) => (
            <div
              key={card.title}
              className="absolute w-[280px] overflow-hidden rounded-[10px] border bg-white"
              style={{
                top: card.offset.top,
                left: card.offset.left,
                transform: `rotate(${card.rotate}deg)`,
                borderColor: "#E8E4DC",
                boxShadow: "0 6px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
                zIndex: i,
              }}
            >
              <div
                className="flex items-center gap-2 px-4 py-3 border-b"
                style={{ background: card.topicBg, borderColor: "#E8E4DC" }}
              >
                <span className="text-lg">{card.icon}</span>
                <span className="text-xs font-semibold" style={{ color: card.topicText }}>
                  {card.topic}
                </span>
              </div>
              <div className="p-4">
                <h3
                  className="text-sm font-bold leading-snug"
                  style={{ color: "#1C1917", fontFamily: "var(--font-playfair)" }}
                >
                  {card.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: "#57534E" }}>
                  {card.description}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xs" style={{ color: "#A8A29E" }}>
                    {"\uD83D\uDCDA"} 6 lessons
                  </span>
                  <span
                    className="ml-auto text-xs font-semibold px-2 py-0.5 rounded"
                    style={{ background: "#EAF4EF", color: "#1A6B4A" }}
                  >
                    FREE
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
