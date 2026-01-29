"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
}

export function TypewriterText({
  text,
  className = "",
  speed = 30,
  delay = 0,
  cursor = true,
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (!isInView || hasStarted) return;

    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [isInView, delay, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [hasStarted, text, speed, onComplete]);

  return (
    <span ref={ref} className={className}>
      {displayedText}
      {cursor && !isComplete && (
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-primary ml-0.5 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </span>
  );
}
