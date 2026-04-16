"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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

        {/* Right: lesson reader preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative hidden md:col-span-2 md:flex md:items-center md:justify-center"
        >
          {/* Phone-shaped container */}
          <div
            className="w-[260px] overflow-hidden rounded-[24px] border-2"
            style={{
              borderColor: "#E8E4DC",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              background: "#FAFAF6",
            }}
          >
            {/* Top chrome: progress line + back button */}
            <div style={{ background: "#E8E4DC", height: "2px", width: "100%" }}>
              <div style={{ height: "100%", width: "60%", background: "#1A6B4A" }} />
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-xs flex items-center gap-1" style={{ color: "#57534E" }}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Back
              </span>
              <span className="text-xs" style={{ color: "#A8A29E" }}>
                3 / 5
              </span>
            </div>

            {/* Topic eyebrow */}
            <div className="px-4 pb-1">
              <span
                className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: "#1A6B4A" }}
              >
                {"\uD83D\uDCDA"} Communication
              </span>
            </div>

            {/* Lesson title */}
            <div className="px-4 pb-3">
              <h3
                className="font-bold leading-snug"
                style={{
                  color: "#1C1917",
                  fontFamily: "var(--font-playfair)",
                  fontSize: "17px",
                }}
              >
                The Art of Listening
              </h3>
            </div>

            {/* Slide content */}
            <div className="px-4 pb-4">
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#57534E", lineHeight: 1.8 }}
              >
                Most people listen to reply, not to understand. The moment someone starts
                speaking, we begin forming our response &mdash; filtering their words through
                our own experience rather than receiving them fully.
              </p>
              <p
                className="mt-3 text-xs leading-relaxed"
                style={{ color: "#57534E", lineHeight: 1.8 }}
              >
                True listening requires suspension of judgment. It is an act of attention, not
                reaction.
              </p>
            </div>

            {/* Bottom nav */}
            <div
              className="flex items-center justify-between px-4 py-3 border-t"
              style={{ borderColor: "#E8E4DC" }}
            >
              <button
                className="rounded-[6px] px-3 py-1.5 text-xs font-medium border"
                style={{ borderColor: "#E8E4DC", color: "#57534E", background: "#FFFFFF" }}
              >
                &larr; Prev
              </button>
              <span
                className="rounded-full px-3 py-1 text-[10px] font-semibold border"
                style={{ borderColor: "#1A6B4A", color: "#1A6B4A", background: "#EAF4EF" }}
              >
                Read
              </span>
              <button
                className="rounded-[6px] px-3 py-1.5 text-xs font-semibold"
                style={{ background: "#1A6B4A", color: "#FFFFFF" }}
              >
                Next &rarr;
              </button>
            </div>
          </div>

          {/* Floating "5 min" badge */}
          <div
            className="absolute -right-2 top-8 rounded-full border px-3 py-1 text-xs font-semibold"
            style={{
              background: "#FFFFFF",
              borderColor: "#E8E4DC",
              color: "#57534E",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {"\u23F1"} 5 min
          </div>

          {/* Floating topic pill */}
          <div
            className="absolute -left-4 bottom-10 rounded-full border px-3 py-1 text-xs font-semibold"
            style={{
              background: "#EAF4EF",
              borderColor: "#C6DDD3",
              color: "#1A6B4A",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            {"\uD83D\uDCD6"} +10 XP
          </div>
        </motion.div>
      </div>
    </section>
  );
}
