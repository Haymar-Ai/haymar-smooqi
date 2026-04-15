"use client";

import { motion } from "framer-motion";

export function ProblemSection() {
  return (
    <section className="bg-muted/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              You Want to Learn Everything.
              <br />
              So You Learn Nothing.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              You save articles you never read. You bookmark courses you never
              finish. You start learning something new every week — then
              forget about it by Friday.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              It&apos;s not a motivation problem. It&apos;s a system problem.
              You need a way to learn that actually fits your life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            {/* Visual placeholder: scattered bookmarks / tabs */}
            <svg
              viewBox="0 0 320 280"
              fill="none"
              className="h-auto w-full max-w-[320px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Scattered browser tabs */}
              <rect
                x="10"
                y="20"
                width="180"
                height="120"
                rx="8"
                fill="#f3f4f6"
                stroke="#d1d5db"
                strokeWidth="1.5"
                transform="rotate(-6 10 20)"
              />
              <rect
                x="80"
                y="40"
                width="180"
                height="120"
                rx="8"
                fill="#f9fafb"
                stroke="#d1d5db"
                strokeWidth="1.5"
                transform="rotate(3 80 40)"
              />
              <rect
                x="50"
                y="80"
                width="180"
                height="120"
                rx="8"
                fill="white"
                stroke="#d1d5db"
                strokeWidth="1.5"
                transform="rotate(-2 50 80)"
              />
              {/* Tab bars */}
              <rect x="58" y="88" width="60" height="6" rx="3" fill="#e5e7eb" />
              <rect x="58" y="100" width="140" height="4" rx="2" fill="#f3f4f6" />
              <rect x="58" y="110" width="120" height="4" rx="2" fill="#f3f4f6" />
              <rect x="58" y="120" width="100" height="4" rx="2" fill="#f3f4f6" />
              {/* Red X marks */}
              <text x="200" y="60" fontSize="20" fill="#ef4444" opacity="0.7">
                x
              </text>
              <text x="140" y="170" fontSize="20" fill="#ef4444" opacity="0.7">
                x
              </text>
              <text x="250" y="130" fontSize="20" fill="#ef4444" opacity="0.7">
                x
              </text>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
