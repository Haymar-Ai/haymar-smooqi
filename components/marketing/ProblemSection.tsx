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
            <svg viewBox="0 0 360 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-auto w-full max-w-[360px]">
              <defs>
                <filter id="ps-shadow">
                  <feDropShadow dx="0" dy="3" stdDeviation="6" floodOpacity="0.10"/>
                </filter>
                <filter id="ps-shadow-sm">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08"/>
                </filter>
              </defs>

              {/* ── Desk surface ── */}
              <rect x="40" y="210" width="280" height="12" rx="4" fill="#E5E7EB"/>
              <rect x="60" y="222" width="8" height="40" rx="2" fill="#D1D5DB"/>
              <rect x="292" y="222" width="8" height="40" rx="2" fill="#D1D5DB"/>

              {/* ── Monitor ── */}
              <rect x="100" y="130" width="160" height="85" rx="10" fill="white" stroke="#E5E7EB" strokeWidth="1.5" filter="url(#ps-shadow)"/>
              {/* Monitor screen */}
              <rect x="108" y="138" width="144" height="65" rx="6" fill="#F8F7FF"/>
              {/* Screen content - browser tab bar */}
              <rect x="108" y="138" width="144" height="14" rx="6" fill="#F3F4F6"/>
              <rect x="108" y="145" width="144" height="7" rx="0" fill="#F3F4F6"/>
              {/* Tab pills */}
              <rect x="112" y="140" width="36" height="10" rx="3" fill="#7C3AED" opacity="0.15"/>
              <rect x="152" y="140" width="28" height="10" rx="3" fill="#E5E7EB"/>
              <rect x="184" y="140" width="28" height="10" rx="3" fill="#E5E7EB"/>
              <rect x="216" y="140" width="28" height="10" rx="3" fill="#E5E7EB"/>
              {/* Screen lines */}
              <rect x="116" y="162" width="88" height="6" rx="3" fill="#E5E7EB"/>
              <rect x="116" y="172" width="72" height="5" rx="2.5" fill="#F3F4F6"/>
              <rect x="116" y="181" width="80" height="5" rx="2.5" fill="#F3F4F6"/>
              <rect x="116" y="190" width="60" height="5" rx="2.5" fill="#F3F4F6"/>
              {/* Monitor stand */}
              <rect x="172" y="215" width="16" height="8" rx="2" fill="#D1D5DB"/>
              <rect x="162" y="222" width="36" height="4" rx="2" fill="#D1D5DB"/>

              {/* ── Person (sitting, viewed from side-front) ── */}
              {/* Body */}
              <rect x="148" y="170" width="64" height="50" rx="14" fill="#7C3AED" opacity="0.12"/>
              {/* Head */}
              <circle cx="180" cy="158" r="18" fill="#FDE68A"/>
              {/* Hair */}
              <path d="M162 152 Q168 138 180 136 Q192 138 198 152" fill="#374151"/>
              {/* Face - stressed expression */}
              <circle cx="174" cy="156" r="2" fill="#374151"/>
              <circle cx="186" cy="156" r="2" fill="#374151"/>
              {/* Stressed mouth - slight frown */}
              <path d="M174 164 Q180 161 186 164" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              {/* Sweat drop */}
              <path d="M196 148 Q198 143 200 148 Q200 152 198 152 Q196 152 196 148Z" fill="#93C5FD"/>
              {/* Arms at keyboard */}
              <rect x="142" y="195" width="30" height="12" rx="6" fill="#FDE68A"/>
              <rect x="188" y="195" width="30" height="12" rx="6" fill="#FDE68A"/>

              {/* ── Floating browser tab cards ── */}

              {/* Card 1 — top left, tilted, pink/red */}
              <g transform="rotate(-12, 60, 90)">
                <rect x="30" y="65" width="110" height="72" rx="10" fill="white" stroke="#FECDD3" strokeWidth="1.5" filter="url(#ps-shadow-sm)"/>
                <rect x="38" y="75" width="40" height="7" rx="3.5" fill="#FCA5A5"/>
                <rect x="38" y="87" width="80" height="5" rx="2.5" fill="#FEE2E2"/>
                <rect x="38" y="96" width="68" height="5" rx="2.5" fill="#FEE2E2"/>
                <rect x="38" y="105" width="72" height="5" rx="2.5" fill="#FEE2E2"/>
                <rect x="38" y="114" width="54" height="5" rx="2.5" fill="#FEE2E2"/>
                {/* X badge */}
                <circle cx="128" cy="70" r="10" fill="#FEE2E2"/>
                <text x="123" y="75" fontSize="12" fontWeight="bold" fill="#EF4444">{'\u2715'}</text>
              </g>

              {/* Card 2 — top right, tilted right, blue */}
              <g transform="rotate(10, 290, 80)">
                <rect x="230" y="50" width="106" height="68" rx="10" fill="white" stroke="#BFDBFE" strokeWidth="1.5" filter="url(#ps-shadow-sm)"/>
                <rect x="238" y="60" width="44" height="7" rx="3.5" fill="#93C5FD"/>
                <rect x="238" y="72" width="76" height="5" rx="2.5" fill="#DBEAFE"/>
                <rect x="238" y="81" width="62" height="5" rx="2.5" fill="#DBEAFE"/>
                <rect x="238" y="90" width="70" height="5" rx="2.5" fill="#DBEAFE"/>
                <rect x="238" y="99" width="50" height="5" rx="2.5" fill="#DBEAFE"/>
                {/* X badge */}
                <circle cx="328" cy="55" r="10" fill="#DBEAFE"/>
                <text x="323" y="60" fontSize="12" fontWeight="bold" fill="#2563EB">{'\u2715'}</text>
              </g>

              {/* Card 3 — bottom right, slight tilt, yellow */}
              <g transform="rotate(6, 300, 185)">
                <rect x="252" y="155" width="98" height="60" rx="10" fill="white" stroke="#FDE68A" strokeWidth="1.5" filter="url(#ps-shadow-sm)"/>
                <rect x="260" y="164" width="38" height="6" rx="3" fill="#FCD34D"/>
                <rect x="260" y="175" width="70" height="4" rx="2" fill="#FEF3C7"/>
                <rect x="260" y="183" width="58" height="4" rx="2" fill="#FEF3C7"/>
                <rect x="260" y="191" width="64" height="4" rx="2" fill="#FEF3C7"/>
                {/* X badge */}
                <circle cx="342" cy="160" r="10" fill="#FEF3C7"/>
                <text x="337" y="165" fontSize="12" fontWeight="bold" fill="#D97706">{'\u2715'}</text>
              </g>

              {/* Card 4 — far left mid, green */}
              <g transform="rotate(-8, 20, 165)">
                <rect x="10" y="145" width="90" height="55" rx="8" fill="white" stroke="#BBF7D0" strokeWidth="1.5" filter="url(#ps-shadow-sm)"/>
                <rect x="18" y="154" width="32" height="6" rx="3" fill="#6EE7B7"/>
                <rect x="18" y="164" width="62" height="4" rx="2" fill="#D1FAE5"/>
                <rect x="18" y="172" width="50" height="4" rx="2" fill="#D1FAE5"/>
                <rect x="18" y="180" width="56" height="4" rx="2" fill="#D1FAE5"/>
                {/* X badge */}
                <circle cx="94" cy="149" r="9" fill="#D1FAE5"/>
                <text x="89" y="154" fontSize="11" fontWeight="bold" fill="#059669">{'\u2715'}</text>
              </g>

              {/* ── Notification bubbles ── */}
              {/* Red notification dot — top of monitor */}
              <circle cx="240" cy="128" r="8" fill="#EF4444"/>
              <text x="236.5" y="133" fontSize="9" fontWeight="bold" fill="white">3</text>
              {/* Purple notification — left side */}
              <circle cx="88" cy="118" r="7" fill="#7C3AED"/>
              <text x="85" y="123" fontSize="9" fontWeight="bold" fill="white">7</text>
              {/* Orange notification — top right card */}
              <circle cx="310" cy="42" r="7" fill="#F97316"/>
              <text x="307" y="47" fontSize="9" fontWeight="bold" fill="white">!</text>

              {/* ── Small scattered elements ── */}
              {/* Bookmark icons */}
              <path d="M22 52 L22 64 L28 59 L34 64 L34 52 Z" fill="#C4B5FD" opacity="0.6"/>
              <path d="M336 100 L336 110 L341 106 L346 110 L346 100 Z" fill="#FCA5A5" opacity="0.6"/>
              {/* Small star/sparkle */}
              <path d="M48 200 L50 194 L52 200 L58 200 L53 204 L55 210 L50 206 L45 210 L47 204 L42 200Z" fill="#FCD34D" opacity="0.5"/>
              <path d="M318 230 L320 225 L322 230 L327 230 L323 233 L324 238 L320 235 L316 238 L317 233 L313 230Z" fill="#93C5FD" opacity="0.5"/>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
