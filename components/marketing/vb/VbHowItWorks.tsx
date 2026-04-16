"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Pick your topics.",
    description:
      "Choose what genuinely interests you &mdash; from philosophy to personal finance. Your path is yours.",
  },
  {
    title: "Read one lesson.",
    description: "Five focused minutes. Clear prose, real ideas. No noise, no filler.",
  },
  {
    title: "Build your library.",
    description: "Track what you&rsquo;ve learned. Return when curious. Knowledge compounds.",
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
                  color: "#C6DDD3",
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
              {i < steps.length - 1 && (
                <div
                  className="md:hidden h-px w-12 mx-auto mt-6"
                  style={{ background: "#E8E4DC" }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
