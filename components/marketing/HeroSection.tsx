"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Finally Keep Up
              </span>
              <br />
              With Your Own Curiosity
            </h1>

            <p className="mt-6 max-w-lg text-lg text-muted-foreground sm:text-xl">
              One lesson a day across 195+ topics — from Psychology to Dog
              Training to Physics. Build real knowledge, one bite at a time.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white rounded-[var(--button-radius)]" asChild>
                <Link href="/signup">Start Learning for Free</Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => {
                  document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                See how it works
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            {/* Phone mockup placeholder */}
            <svg
              viewBox="0 0 280 560"
              fill="none"
              className="h-auto w-full max-w-[280px] drop-shadow-2xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Phone body */}
              <rect
                x="2"
                y="2"
                width="276"
                height="556"
                rx="36"
                stroke="currentColor"
                strokeWidth="3"
                className="text-border"
                fill="white"
              />
              {/* Notch */}
              <rect x="90" y="8" width="100" height="24" rx="12" fill="#e5e7eb" />
              {/* Status bar dots */}
              <circle cx="140" cy="20" r="4" fill="#d1d5db" />
              {/* Lesson card */}
              <rect
                x="20"
                y="60"
                width="240"
                height="140"
                rx="16"
                className="fill-primary/10"
              />
              <rect x="36" y="80" width="80" height="10" rx="5" className="fill-primary/40" />
              <rect x="36" y="100" width="180" height="8" rx="4" fill="#e5e7eb" />
              <rect x="36" y="116" width="160" height="8" rx="4" fill="#e5e7eb" />
              <rect x="36" y="132" width="120" height="8" rx="4" fill="#e5e7eb" />
              <rect
                x="36"
                y="160"
                width="80"
                height="24"
                rx="12"
                className="fill-primary"
              />
              <text
                x="76"
                y="176"
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="600"
              >
                Continue
              </text>
              {/* Progress section */}
              <rect x="20" y="220" width="240" height="80" rx="16" fill="#f9fafb" />
              <rect x="36" y="240" width="60" height="8" rx="4" fill="#d1d5db" />
              <rect x="36" y="260" width="200" height="8" rx="4" fill="#e5e7eb" />
              <rect x="36" y="260" width="140" height="8" rx="4" className="fill-primary/60" />
              {/* Streak section */}
              <rect x="20" y="320" width="240" height="60" rx="16" fill="#f9fafb" />
              <text x="40" y="356" fontSize="24">
                🔥
              </text>
              <rect x="72" y="340" width="80" height="10" rx="5" fill="#d1d5db" />
              <rect x="72" y="356" width="40" height="8" rx="4" fill="#e5e7eb" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
