"use client";

import { motion } from "motion/react";

export function SplitText({ text }: { text: string }) {
  return (
    <span aria-label={text} className="split-text" role="text">
      {text.split(" ").map((word, index) => (
        <span className="split-word" key={`${word}-${index}`}>
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.25 + index * 0.08,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
