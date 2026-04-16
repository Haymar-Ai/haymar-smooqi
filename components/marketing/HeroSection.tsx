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
            <div className="relative mx-auto w-64 md:w-72">
              <svg viewBox="0 0 280 580" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-2xl">
                <rect x="10" y="10" width="260" height="560" rx="40" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
                <rect x="20" y="50" width="240" height="460" rx="8" fill="#F8F7FF"/>
                <rect x="20" y="50" width="240" height="24" rx="8" fill="white"/>
                <rect x="110" y="54" width="60" height="14" rx="7" fill="#E5E7EB"/>
                <rect x="20" y="74" width="240" height="44" fill="white"/>
                <text x="36" y="102" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="700" fill="#111827">Sm</text>
                <text x="61" y="102" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="700" fill="#7C3AED">ooqi</text>
                <rect x="188" y="85" width="52" height="20" rx="10" fill="#FEF3C7"/>
                <text x="196" y="99" fontFamily="Inter, sans-serif" fontSize="11" fill="#D97706">{'\uD83D\uDD25'} 5</text>
                <rect x="28" y="126" width="224" height="120" rx="16" fill="white" filter="url(#shadow)"/>
                <rect x="28" y="126" width="224" height="120" rx="16" stroke="#F3F4F6" strokeWidth="1"/>
                <text x="44" y="150" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="#7C3AED" letterSpacing="1">COMMUNICATION SKILLS</text>
                <text x="44" y="168" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700" fill="#111827">The Charisma</text>
                <text x="44" y="184" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700" fill="#111827">Foundation</text>
                <text x="44" y="202" fontFamily="Inter, sans-serif" fontSize="10" fill="#6B7280">Lesson 1 of 5 &middot; 10 min</text>
                <rect x="44" y="216" width="180" height="4" rx="2" fill="#F3F4F6"/>
                <rect x="44" y="216" width="36" height="4" rx="2" fill="#7C3AED"/>
                <rect x="28" y="256" width="104" height="64" rx="12" fill="#7C3AED"/>
                <text x="44" y="278" fontFamily="Inter, sans-serif" fontSize="9" fill="rgba(255,255,255,0.7)">TOTAL XP</text>
                <text x="44" y="298" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="700" fill="white">240</text>
                <rect x="140" y="256" width="112" height="64" rx="12" fill="#FFF7ED"/>
                <text x="156" y="278" fontFamily="Inter, sans-serif" fontSize="9" fill="#C2410C">STREAK</text>
                <text x="156" y="298" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="700" fill="#C2410C">{'\uD83D\uDD25'} 5</text>

                {/* ── Your Path section ── */}
                <text x="36" y="346" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="#6B7280" letterSpacing="0.5">YOUR PATH</text>

                {/* Course pill 1 — Communication */}
                <rect x="28" y="354" width="224" height="36" rx="10" fill="white" stroke="#F3F4F6" strokeWidth="1"/>
                <rect x="38" y="363" width="18" height="18" rx="5" fill="#EDE9FE"/>
                <text x="41" y="376" fontFamily="Inter, sans-serif" fontSize="11">{'\uD83D\uDCAC'}</text>
                <text x="64" y="373" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="#111827">Communication Skills</text>
                <text x="64" y="384" fontFamily="Inter, sans-serif" fontSize="8" fill="#9CA3AF">Lesson 2 of 5</text>
                <rect x="196" y="363" width="44" height="18" rx="9" fill="#7C3AED" opacity="0.1"/>
                <text x="204" y="376" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="#7C3AED">+20 XP</text>

                {/* Course pill 2 — Psychology */}
                <rect x="28" y="396" width="224" height="36" rx="10" fill="white" stroke="#F3F4F6" strokeWidth="1"/>
                <rect x="38" y="405" width="18" height="18" rx="5" fill="#F0FDF4"/>
                <text x="41" y="418" fontFamily="Inter, sans-serif" fontSize="11">{'\uD83E\uDDE0'}</text>
                <text x="64" y="415" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="#111827">Psychology & Mindset</text>
                <text x="64" y="426" fontFamily="Inter, sans-serif" fontSize="8" fill="#9CA3AF">Lesson 1 of 5</text>
                <rect x="196" y="405" width="44" height="18" rx="9" fill="#059669" opacity="0.1"/>
                <text x="204" y="418" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="#059669">+20 XP</text>

                {/* Course pill 3 — Finance */}
                <rect x="28" y="438" width="224" height="36" rx="10" fill="white" stroke="#F3F4F6" strokeWidth="1"/>
                <rect x="38" y="447" width="18" height="18" rx="5" fill="#FFFBEB"/>
                <text x="41" y="460" fontFamily="Inter, sans-serif" fontSize="11">{'\uD83D\uDCB0'}</text>
                <text x="64" y="457" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="#111827">Personal Finance</text>
                <text x="64" y="468" fontFamily="Inter, sans-serif" fontSize="8" fill="#9CA3AF">Not started</text>
                <rect x="196" y="447" width="44" height="18" rx="9" fill="#D97706" opacity="0.1"/>
                <text x="204" y="460" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="#D97706">Start</text>

                <rect x="20" y="484" width="240" height="40" rx="8" fill="white" stroke="#F3F4F6" strokeWidth="1"/>
                <text x="44" y="509" fontFamily="Inter, sans-serif" fontSize="18">{'\uD83C\uDFE0'}</text>
                <text x="100" y="509" fontFamily="Inter, sans-serif" fontSize="18">{'\uD83D\uDD0D'}</text>
                <text x="156" y="509" fontFamily="Inter, sans-serif" fontSize="18">{'\uD83C\uDFC6'}</text>
                <text x="212" y="509" fontFamily="Inter, sans-serif" fontSize="18">{'\uD83D\uDC64'}</text>
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.08"/>
                  </filter>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
