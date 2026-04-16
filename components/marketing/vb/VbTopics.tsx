"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const topics = [
  { slug: "communication-skills", name: "Communication Skills", icon: "\uD83D\uDCAC", bg: "#EAF4EF", text: "#1A6B4A" },
  { slug: "psychology-mindset", name: "Psychology & Mindset", icon: "\uD83E\uDDE0", bg: "#FDF0E8", text: "#C2703D" },
  { slug: "personal-finance", name: "Personal Finance", icon: "\uD83D\uDCB0", bg: "#EAF4EF", text: "#1A6B4A" },
  { slug: "philosophy", name: "Philosophy", icon: "\uD83D\uDCDC", bg: "#F5F0E8", text: "#78350F" },
  { slug: "art-culture", name: "Art & Culture", icon: "\uD83C\uDFA8", bg: "#FDF0E8", text: "#C2703D" },
  { slug: "literature", name: "Literature", icon: "\uD83D\uDCD6", bg: "#F5F0E8", text: "#78350F" },
  { slug: "biology", name: "Biology", icon: "\uD83E\uDDEC", bg: "#EAF4EF", text: "#1A6B4A" },
  { slug: "physics", name: "Physics", icon: "\uD83C\uDF0C", bg: "#EEF6FF", text: "#1E40AF" },
  { slug: "math-logic", name: "Math & Logic", icon: "\u2728", bg: "#F5F0E8", text: "#57534E" },
  { slug: "style", name: "Style", icon: "\uD83D\uDC54", bg: "#FDF2F8", text: "#86198F" },
];

export function VbTopics() {
  return (
    <section className="w-full" style={{ background: "#FAFAF6" }}>
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center font-bold"
          style={{
            color: "#1C1917",
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(28px, 4vw, 36px)",
            letterSpacing: "-0.01em",
          }}
        >
          Explore the library
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {topics.map((t) => (
            <Link
              key={t.slug}
              href={`/topics/${t.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm font-medium transition-colors"
              style={{ background: t.bg, color: t.text }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = t.text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              <span>{t.icon}</span>
              <span>{t.name}</span>
            </Link>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-sm" style={{ color: "#A8A29E" }}>
          ... and 185 more topics.{" "}
          <Link
            href="/explore"
            className="font-medium underline-offset-4 hover:underline"
            style={{ color: "#1A6B4A" }}
          >
            See all &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
