import { motion } from "motion/react";
import type { Chapter } from "@/data/story";
import { MemoryFrame } from "./MemoryFrame";

const reveal = {
  hidden: { opacity: 0, y: 44, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

// Emotion colour map → Tailwind-compatible inline style colors
const EMOTION_COLORS: Record<string, string> = {
  sky: "oklch(0.72 0.10 230)",
  rose: "oklch(0.72 0.13 18)",
  pink: "oklch(0.75 0.12 350)",
  amber: "oklch(0.78 0.14 65)",
  lavender: "oklch(0.74 0.09 290)",
  lime: "oklch(0.76 0.13 135)",
  blue: "oklch(0.60 0.09 255)",
  crimson: "oklch(0.58 0.18 20)",
  gold: "oklch(0.80 0.14 80)",
};

export function ChapterSection({ chapter, index }: { chapter: Chapter; index: number }) {
  const align = chapter.align ?? "left";
  const position =
    align === "center"
      ? "items-center text-center"
      : align === "right"
        ? "items-end text-right"
        : "items-start text-left";

  const emotionColor = EMOTION_COLORS[chapter.emotionColor ?? "rose"] ?? EMOTION_COLORS["rose"] ?? "oklch(0.72 0.13 18)";
  const chapterNum = String(index + 1).padStart(2, "0");

  return (
    <section
      id={chapter.id}
      aria-label={chapter.title}
      className="relative flex min-h-[100svh] w-full items-center px-6 py-28 sm:px-12 lg:px-24"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.13 }}
        className={`mx-auto flex w-full max-w-6xl flex-col gap-10 ${position}`}
      >
        {/* Text block */}
        <div
          className={`relative flex max-w-xl flex-col gap-5 ${align === "center" ? "mx-auto" : ""}`}
        >
          {/* Ghost chapter number — editorial watermark */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-8 select-none font-display text-[8rem] font-bold leading-none text-foreground/[0.04] sm:text-[11rem]"
            style={{
              ...(align === "right" ? { right: 0 } : {}),
              ...(align === "center" ? { left: "50%", transform: "translateX(-50%)" } : {}),
            }}
          >
            {chapterNum}
          </span>

          {/* Atmospheric backdrop */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 -inset-y-14 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(14,8,24,0.60),rgba(14,8,24,0.30)_55%,transparent_78%)] blur-xl"
          />

          {/* Label + thin rule */}
          <div className={`flex items-center gap-4 ${align === "right" ? "flex-row-reverse" : align === "center" ? "justify-center" : ""}`}>
            <motion.p
              variants={reveal}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-hand text-xl tracking-wide text-foreground/65"
            >
              {chapter.label}
            </motion.p>
            {/* Drawing rule */}
            <motion.span
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                show: { scaleX: 1, opacity: 1 },
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className={`h-px flex-1 max-w-[5rem] bg-gradient-to-r from-foreground/35 to-transparent origin-left ${align === "right" ? "origin-right rotate-180" : ""}`}
            />
          </div>

          <motion.h2
            variants={reveal}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl leading-[1.04] tracking-tight text-foreground drop-shadow-[0_2px_24px_rgba(20,14,36,0.45)] sm:text-6xl"
          >
            {chapter.title}
          </motion.h2>

          {chapter.date && (
            <motion.p
              variants={reveal}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs uppercase tracking-[0.38em] text-foreground/55"
            >
              {chapter.date}
            </motion.p>
          )}

          <motion.p
            variants={reveal}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base leading-[1.75] text-foreground/82 sm:text-lg"
          >
            {chapter.story}
          </motion.p>

          <motion.p
            variants={reveal}
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-hand text-2xl leading-snug text-foreground sm:text-3xl"
          >
            {chapter.message}
          </motion.p>

          {/* Emotion pill — colour-coded */}
          <motion.span
            variants={reveal}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.32em] backdrop-blur-sm ${
              align === "right" ? "self-end" : align === "center" ? "self-center" : ""
            }`}
            style={{
              background: `color-mix(in oklch, ${emotionColor} 18%, transparent)`,
              borderColor: `color-mix(in oklch, ${emotionColor} 35%, transparent)`,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: emotionColor }}
              aria-hidden
            />
            {chapter.emotion}
          </motion.span>
        </div>

        {/* Photo cluster */}
        {chapter.photos && chapter.photos.length > 0 && (
          <div
            className={`flex flex-wrap gap-8 ${
              align === "center"
                ? "justify-center"
                : align === "right"
                  ? "justify-end"
                  : "justify-start"
            }`}
          >
            {chapter.photos.map((photo, i) => (
              <MemoryFrame key={photo.src + i} photo={photo} delay={i * 0.16} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}