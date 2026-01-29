"use client";

import { cn } from "@/lib/utils";
import { CSSProperties, ElementType, Fragment, useRef } from "react";
import { useInView } from "framer-motion";

export default function FocusRevealText({
  text,
  per = "character",
  as: As = "h1",
  className,
  triggerOnScroll = false,
}: {
  text: string;
  per?: "character" | "word";
  as?: ElementType;
  className?: string;
  triggerOnScroll?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const words = text.split(" ");

  // If triggerOnScroll is true, only animate when in view
  const shouldAnimate = triggerOnScroll ? isInView : true;

  return (
    <As
      ref={ref}
      className={cn(
        "[--delay:1s] [--from-blur:0.3em] [--from-scale:1.2] [--per-delay:0.05s] [--per-duration:0.28s]",
        className,
      )}
    >
      {words.map((word, wordIndex) => (
        <Fragment key={wordIndex}>
          <span className="whitespace-nowrap">
            {(per === "word" ? [word] : word.split("")).map(
              (piece, pieceIndex) => (
                <span
                  key={pieceIndex}
                  className={cn(
                    "inline-block origin-left",
                    shouldAnimate && "animate-focus-in",
                    !shouldAnimate && "opacity-0",
                    "[animation-delay:calc(var(--delay)+var(--per-delay)*var(--index))]",
                    piece.trim() === "" && "whitespace-pre",
                  )}
                  style={
                    {
                      "--index":
                        per === "word"
                          ? wordIndex
                          : words.slice(0, wordIndex).join(" ").length +
                          pieceIndex,
                    } as CSSProperties
                  }
                >
                  {piece}
                </span>
              ),
            )}
          </span>{" "}
        </Fragment>
      ))}
    </As>
  );
}
