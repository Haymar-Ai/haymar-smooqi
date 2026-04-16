"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Choose your topics",
    description: "Pick from 195+ subjects. Curated by experts, not algorithms.",
  },
  {
    title: "Read one lesson",
    description: "Five minutes. One idea. Beautiful, focused content.",
  },
  {
    title: "Build your library",
    description: "Track what you&rsquo;ve learned. Return when you&rsquo;re ready.",
  },
];

export function VbHowItWorks() {
  return (
    <section className="w-full" style={{ background: "#FFFFFF" }}>
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
          How it works
        </motion.h2>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <p
                className="font-bold"
                style={{
                  color: "#E8E4DC",
                  fontFamily: "var(--font-playfair)",
                  fontSize: "64px",
                  lineHeight: 1,
                }}
              >
                {i + 1}
              </p>
              <h3
                className="mt-3 font-bold"
                style={{
                  color: "#1C1917",
                  fontFamily: "var(--font-playfair)",
                  fontSize: "20px",
                }}
              >
                {step.title}
              </h3>
              <p
                className="mt-2 text-sm"
                style={{ color: "#57534E", lineHeight: 1.65 }}
                dangerouslySetInnerHTML={{ __html: step.description }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
