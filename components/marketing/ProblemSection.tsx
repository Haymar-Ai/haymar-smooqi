"use client";

import { motion } from "framer-motion";

export function ProblemSection() {
  return (
    <section className="bg-muted/40 py-14 sm:py-16">
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
            <svg viewBox="0 0 380 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-auto w-full max-w-[380px]">
              <defs>
                <filter id="ps2-glow">
                  <feGaussianBlur stdDeviation="12" result="blur"/>
                  <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                </filter>
                <filter id="ps2-shadow">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.12"/>
                </filter>
                <filter id="ps2-shadow-sm">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.09"/>
                </filter>
              </defs>

              {/* ── Background glow — center bloom ── */}
              <ellipse cx="190" cy="160" rx="100" ry="80" fill="#7C3AED" opacity="0.06" filter="url(#ps2-glow)"/>

              {/* ── Central monitor ── */}
              <rect x="115" y="110" width="150" height="100" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="1.5" filter="url(#ps2-shadow)"/>
              {/* Screen */}
              <rect x="123" y="118" width="134" height="76" rx="8" fill="#F5F3FF"/>
              {/* Tab bar */}
              <rect x="123" y="118" width="134" height="16" rx="8" fill="#EDE9FE"/>
              <rect x="123" y="126" width="134" height="8" rx="0" fill="#EDE9FE"/>
              <rect x="128" y="120" width="32" height="10" rx="4" fill="#7C3AED" opacity="0.5"/>
              <rect x="164" y="120" width="24" height="10" rx="4" fill="#C4B5FD" opacity="0.4"/>
              <rect x="192" y="120" width="24" height="10" rx="4" fill="#C4B5FD" opacity="0.4"/>
              <rect x="220" y="120" width="24" height="10" rx="4" fill="#C4B5FD" opacity="0.4"/>
              {/* Screen content lines */}
              <rect x="131" y="144" width="80" height="7" rx="3.5" fill="#7C3AED" opacity="0.3"/>
              <rect x="131" y="156" width="110" height="5" rx="2.5" fill="#DDD6FE"/>
              <rect x="131" y="165" width="90" height="5" rx="2.5" fill="#DDD6FE"/>
              <rect x="131" y="174" width="100" height="5" rx="2.5" fill="#DDD6FE"/>
              <rect x="131" y="183" width="70" height="5" rx="2.5" fill="#DDD6FE"/>
              {/* Stand */}
              <rect x="183" y="210" width="14" height="10" rx="2" fill="#D1D5DB"/>
              <rect x="172" y="219" width="36" height="5" rx="2" fill="#D1D5DB"/>
              {/* Desk */}
              <rect x="60" y="224" width="260" height="10" rx="4" fill="#E5E7EB"/>

              {/* ── Card 1 — top left, pink/red, rotated ── */}
              <g transform="rotate(-14, 75, 95)">
                <rect x="18" y="48" width="116" height="80" rx="12" fill="#FFF1F2" stroke="#FECDD3" strokeWidth="1.5" filter="url(#ps2-shadow-sm)"/>
                {/* Colored header strip */}
                <rect x="18" y="48" width="116" height="22" rx="12" fill="#FCA5A5"/>
                <rect x="18" y="58" width="116" height="12" rx="0" fill="#FCA5A5"/>
                <rect x="28" y="55" width="60" height="8" rx="4" fill="rgba(255,255,255,0.5)"/>
                {/* Content lines */}
                <rect x="28" y="78" width="86" height="5" rx="2.5" fill="#FECDD3"/>
                <rect x="28" y="87" width="72" height="5" rx="2.5" fill="#FECDD3"/>
                <rect x="28" y="96" width="80" height="5" rx="2.5" fill="#FECDD3"/>
                <rect x="28" y="105" width="60" height="5" rx="2.5" fill="#FECDD3"/>
                {/* X badge */}
                <circle cx="122" cy="44" r="13" fill="#EF4444"/>
                <text x="116" y="50" fontSize="14" fontWeight="bold" fill="white">{'\u2715'}</text>
              </g>

              {/* ── Card 2 — top right, blue, rotated ── */}
              <g transform="rotate(12, 300, 80)">
                <rect x="242" y="34" width="112" height="78" rx="12" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" filter="url(#ps2-shadow-sm)"/>
                <rect x="242" y="34" width="112" height="22" rx="12" fill="#93C5FD"/>
                <rect x="242" y="44" width="112" height="12" rx="0" fill="#93C5FD"/>
                <rect x="252" y="40" width="56" height="8" rx="4" fill="rgba(255,255,255,0.5)"/>
                <rect x="252" y="64" width="84" height="5" rx="2.5" fill="#BFDBFE"/>
                <rect x="252" y="73" width="70" height="5" rx="2.5" fill="#BFDBFE"/>
                <rect x="252" y="82" width="78" height="5" rx="2.5" fill="#BFDBFE"/>
                <rect x="252" y="91" width="58" height="5" rx="2.5" fill="#BFDBFE"/>
                {/* X badge */}
                <circle cx="342" cy="30" r="13" fill="#2563EB"/>
                <text x="336" y="36" fontSize="14" fontWeight="bold" fill="white">{'\u2715'}</text>
              </g>

              {/* ── Card 3 — bottom right, amber/yellow ── */}
              <g transform="rotate(7, 310, 195)">
                <rect x="258" y="158" width="108" height="70" rx="12" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1.5" filter="url(#ps2-shadow-sm)"/>
                <rect x="258" y="158" width="108" height="20" rx="12" fill="#FCD34D"/>
                <rect x="258" y="168" width="108" height="10" rx="0" fill="#FCD34D"/>
                <rect x="268" y="163" width="52" height="8" rx="4" fill="rgba(255,255,255,0.5)"/>
                <rect x="268" y="186" width="78" height="5" rx="2.5" fill="#FDE68A"/>
                <rect x="268" y="195" width="64" height="5" rx="2.5" fill="#FDE68A"/>
                <rect x="268" y="204" width="72" height="5" rx="2.5" fill="#FDE68A"/>
                {/* X badge */}
                <circle cx="358" cy="154" r="13" fill="#D97706"/>
                <text x="352" y="160" fontSize="14" fontWeight="bold" fill="white">{'\u2715'}</text>
              </g>

              {/* ── Card 4 — left, green ── */}
              <g transform="rotate(-9, 30, 172)">
                <rect x="4" y="145" width="100" height="64" rx="12" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1.5" filter="url(#ps2-shadow-sm)"/>
                <rect x="4" y="145" width="100" height="20" rx="12" fill="#6EE7B7"/>
                <rect x="4" y="155" width="100" height="10" rx="0" fill="#6EE7B7"/>
                <rect x="14" y="150" width="46" height="8" rx="4" fill="rgba(255,255,255,0.5)"/>
                <rect x="14" y="173" width="72" height="5" rx="2.5" fill="#BBF7D0"/>
                <rect x="14" y="182" width="60" height="5" rx="2.5" fill="#BBF7D0"/>
                <rect x="14" y="191" width="66" height="5" rx="2.5" fill="#BBF7D0"/>
                {/* X badge */}
                <circle cx="96" cy="141" r="13" fill="#059669"/>
                <text x="90" y="147" fontSize="14" fontWeight="bold" fill="white">{'\u2715'}</text>
              </g>

              {/* ── Notification badges ── */}
              <circle cx="252" cy="108" r="11" fill="#EF4444"/>
              <text x="247" y="113" fontSize="11" fontWeight="bold" fill="white">3</text>

              <circle cx="104" cy="96" r="11" fill="#7C3AED"/>
              <text x="100" y="101" fontSize="11" fontWeight="bold" fill="white">7</text>

              <circle cx="320" cy="28" r="11" fill="#F97316"/>
              <text x="316" y="33" fontSize="11" fontWeight="bold" fill="white">!</text>

              <circle cx="168" cy="36" r="9" fill="#06B6D4"/>
              <text x="164" y="41" fontSize="11" fontWeight="bold" fill="white">5</text>

              {/* ── Decorative dots ── */}
              <circle cx="22" cy="268" r="4" fill="#DDD6FE"/>
              <circle cx="356" cy="272" r="4" fill="#FCA5A5"/>
              <circle cx="368" cy="120" r="3" fill="#FDE68A"/>
              <circle cx="10" cy="120" r="3" fill="#BBF7D0"/>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
