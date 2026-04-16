"use client";

import { motion } from "framer-motion";

const principles = [
  {
    icon: "\uD83D\uDD52",
    title: "One lesson. Every day.",
    description: "Consistent practice builds permanent knowledge.",
  },
  {
    icon: "\uD83D\uDCDA",
    title: "Depth over velocity.",
    description: "Every topic is a course, not a bullet list.",
  },
  {
    icon: "\uD83C\uDF31",
    title: "Your mind, your pace.",
    description: "No pressure. No streaks you dread. Just curiosity.",
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

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl">{p.icon}</div>
              <h3
                className="mt-3 text-lg font-bold"
                style={{ color: "#1C1917", fontFamily: "var(--font-playfair)" }}
              >
                {p.title}
              </h3>
              <p className="mt-2 text-sm" style={{ color: "#57534E", lineHeight: 1.6 }}>
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
