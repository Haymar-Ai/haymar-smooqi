"use client";

import { motion } from "framer-motion";

interface VbTestimonialsProps {
  learnerCount: number;
}

const testimonials = [
  {
    quote:
      "I read one lesson on philosophy every morning. It&rsquo;s become the best part of my day.",
    name: "Ada M.",
    topic: "Philosophy",
  },
  {
    quote:
      "I&rsquo;ve tried every learning app. Smooqi is the first one that actually feels like reading.",
    name: "Theo R.",
    topic: "Literature",
  },
  {
    quote:
      "My kids think I&rsquo;m smarter now. I just tell them I&rsquo;ve been reading more.",
    name: "Priya S.",
    topic: "Psychology",
  },
];

export function VbTestimonials({ learnerCount }: VbTestimonialsProps) {
  return (
    <section className="w-full" style={{ background: "#F5F0E8" }}>
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2
            className="font-bold"
            style={{
              color: "#1C1917",
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(24px, 3.5vw, 32px)",
              letterSpacing: "-0.01em",
            }}
          >
            Join a community of readers
          </h2>
          <p className="mt-3 text-sm" style={{ color: "#57534E" }}>
            {learnerCount.toLocaleString()}+ readers building their knowledge
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-[10px] border bg-white p-6"
              style={{
                borderColor: "#E8E4DC",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
              }}
            >
              <p
                className="italic"
                style={{
                  color: "#1C1917",
                  fontFamily: "var(--font-playfair)",
                  fontSize: "16px",
                  lineHeight: 1.6,
                }}
                dangerouslySetInnerHTML={{ __html: `&ldquo;${t.quote}&rdquo;` }}
              />
              <div className="mt-4 text-xs" style={{ color: "#A8A29E" }}>
                <span className="font-semibold" style={{ color: "#57534E" }}>
                  {t.name}
                </span>
                <span className="mx-2">&middot;</span>
                {t.topic}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
