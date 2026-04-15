"use client";

import { motion } from "framer-motion";

interface SolutionSectionProps {
  learnerCount: number;
}

export function SolutionSection({ learnerCount }: SolutionSectionProps) {
  return (
    <section id="solution" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            One Lesson a Day. That&apos;s It.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Every day, you get a single 15-minute lesson on one topic you care
            about. No overwhelm, no decision fatigue. Just open the app, learn
            something fascinating, and get on with your day.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Over weeks and months, those small sessions add up to real,
            lasting knowledge across every subject you&apos;re curious about.
          </p>
          <p className="mt-8 text-base font-medium text-primary">
            Join{" "}
            <span className="text-lg font-bold">
              {learnerCount.toLocaleString()}
            </span>{" "}
            people building smarter habits
          </p>
        </motion.div>
      </div>
    </section>
  );
}
