"use client";

import { motion } from "framer-motion";

const principles = [
  {
    icon: "\uD83D\uDCD6",
    title: "Depth over speed.",
    description:
      "One idea, fully explored. Not a bullet list. Not a summary. A lesson worth keeping.",
  },
  {
    icon: "\uD83E\uDDED",
    title: "Curiosity-led.",
    description:
      "No algorithm decides what you read. You choose your path. The library follows.",
  },
  {
    icon: "\uD83C\uDF31",
    title: "Compounding knowledge.",
    description:
      "Five minutes a day builds a mind. Small and consistent beats big and sporadic.",
  },
];

export function VbManifesto() {
  return (
    <section className="w-full" style={{ background: "#F5F0E8" }}>
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p
            className="text-[11px] font-semibold uppercase"
            style={{ color: "#A8A29E", letterSpacing: "0.2em" }}
          >
            Why Smooqi
          </p>
          <blockquote
            className="mt-6 italic"
            style={{
              color: "#1C1917",
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(24px, 3.5vw, 32px)",
              lineHeight: 1.3,
            }}
          >
            &ldquo;Real knowledge isn&apos;t a hack or a streak. It&apos;s the slow
            accumulation of ideas that change how you see the world.&rdquo;
          </blockquote>
        </motion.div>

        <div className="mt-16 grid max-w-2xl mx-auto gap-8 md:grid-cols-1">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4 text-left"
            >
              <div className="flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{ background: "#EAF4EF" }}
                >
                  {p.icon}
                </div>
              </div>
              <div>
                <h3
                  className="font-bold"
                  style={{
                    color: "#1C1917",
                    fontFamily: "var(--font-playfair)",
                    fontSize: "18px",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="mt-1 text-sm"
                  style={{ color: "#57534E", lineHeight: 1.65 }}
                >
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
