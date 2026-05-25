"use client";

import { motion } from "framer-motion";

interface SocialProofSectionProps {
  learnerCount: number;
}

const testimonials = [
  {
    quote: "I've tried Duolingo, Blinkist, and a dozen others. Smooqi is the first one I actually stuck with.",
    name: "Sarah K.",
    detail: "42-day streak",
  },
  {
    quote: "15 minutes before my morning coffee. Three months in and I genuinely know things I didn't before.",
    name: "Marcus T.",
    detail: "Communication Skills + Psychology",
  },
  {
    quote: "The spaced repetition actually works. I still remember stuff from lessons I took weeks ago.",
    name: "Aisha R.",
    detail: "Personal Finance learner",
  },
]

export function SocialProofSection({ learnerCount }: SocialProofSectionProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-base font-medium text-primary">
            {learnerCount.toLocaleString()}+ learners building daily habits
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            What Learners Are Saying
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 grid gap-6 sm:grid-cols-3"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.detail}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
