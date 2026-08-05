import { motion } from "motion/react";
import type { Photo } from "@/data/story";
import type { Easing } from "motion";

const shadow = "shadow-[0_30px_70px_-20px_rgba(20,10,34,0.80)]";

// Shared custom ease curve — typed correctly for motion
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function MemoryFrame({ photo, delay = 0 }: { photo: Photo; delay?: number }) {
  const { frame, tilt = 0, caption, src, dateStamp } = photo;

  // Randomise floating phase per frame so they don't all bob together
  const floatDelay = (delay * 1.7 + tilt * 0.3).toFixed(2);

  const inner = (
    <img
      src={src}
      alt={caption ?? "A memory of us"}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );

  const motionProps = {
    initial: { opacity: 0, y: 64, filter: "blur(16px)", rotate: tilt * 2.2, scale: 0.92 },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)", rotate: tilt, scale: 1 },
    whileHover: { scale: 1.04, rotate: tilt * 0.4, zIndex: 10 },
    viewport: { once: true, amount: 0.3 } as const,
    transition: { duration: 1.3, delay, ease: EASE },
    className: "group cursor-default",
    style: {
      animation: `story-float ${6.5 + Math.abs(tilt)}s ${floatDelay}s ease-in-out infinite`,
    },
  };

  // ── Polaroid ─────────────────────────────────────────────────────────────────
  if (frame === "polaroid") {
    return (
      <motion.figure {...motionProps}>
        <div className={`${shadow} relative overflow-hidden rounded-[3px] bg-[oklch(0.97_0.012_85)] p-3 pb-14`}>
          <div className="aspect-[4/5] w-[15rem] overflow-hidden sm:w-[18rem]">{inner}</div>
          {caption && (
            <figcaption className="absolute bottom-3.5 left-0 right-0 text-center font-hand text-lg text-[oklch(0.40_0.06_20)]">
              {caption}
            </figcaption>
          )}
          {dateStamp && (
            <span
              aria-hidden
              className="absolute bottom-[3.2rem] right-3 font-sans text-[0.55rem] tracking-wider text-[oklch(0.72_0.14_15)]"
            >
              {dateStamp}
            </span>
          )}
          {/* Shimmer on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
          />
        </div>
      </motion.figure>
    );
  }

  // ── Hanging ───────────────────────────────────────────────────────────────────
  if (frame === "hanging") {
    return (
      <motion.figure {...motionProps}>
        <div className="flex flex-col items-center">
          <span className="h-12 w-px bg-foreground/25" />
          <span className="-mt-1 h-2.5 w-2.5 rounded-full bg-foreground/35 shadow-sm" />
          <div className={`${shadow} relative mt-1 overflow-hidden rounded-sm border border-white/35 bg-white/20 p-2 backdrop-blur-sm`}>
            <div className="aspect-[3/4] w-[13rem] overflow-hidden group sm:w-[16rem]">{inner}</div>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
            />
          </div>
          {caption && (
            <figcaption className="mt-3 font-hand text-lg text-foreground/75">
              {caption}
            </figcaption>
          )}
        </div>
      </motion.figure>
    );
  }

  // ── Glass ─────────────────────────────────────────────────────────────────────
  if (frame === "glass") {
    return (
      <motion.figure {...motionProps}>
        <div className={`${shadow} relative overflow-hidden rounded-2xl border border-white/30 bg-white/12 p-3 backdrop-blur-md`}>
          <div className="aspect-[4/3] w-[17rem] overflow-hidden rounded-xl group sm:w-[23rem]">{inner}</div>
          {caption && (
            <figcaption className="pt-3 text-center font-hand text-lg text-foreground/85">
              {caption}
            </figcaption>
          )}
          {/* Shimmer */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100 rounded-2xl"
          />
        </div>
      </motion.figure>
    );
  }

  // ── Film Strip ────────────────────────────────────────────────────────────────
  if (frame === "filmstrip") {
    return (
      <motion.figure {...motionProps}>
        <div className={`${shadow} relative overflow-hidden rounded-md bg-[oklch(0.18_0.02_280)] px-2 py-5`}>
          <span className="pointer-events-none absolute inset-x-0 top-1 flex justify-around">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="h-2 w-2.5 rounded-[2px] bg-white/20" />
            ))}
          </span>
          <span className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-around">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="h-2 w-2.5 rounded-[2px] bg-white/20" />
            ))}
          </span>
          <div className="aspect-[4/3] w-[17rem] overflow-hidden group sm:w-[22rem]">{inner}</div>
          {caption && (
            <figcaption className="pt-3 text-center font-hand text-base text-white/65">
              {caption}
            </figcaption>
          )}
        </div>
      </motion.figure>
    );
  }

  // ── Scrapbook ─────────────────────────────────────────────────────────────────
  if (frame === "scrapbook" || frame === "scrap") {
    return (
      <motion.figure {...motionProps}>
        <div
          className={`${shadow} relative overflow-hidden rounded-[2px] bg-[oklch(0.92_0.025_65)]`}
          style={{ clipPath: "polygon(0 0, 97% 0, 100% 3%, 100% 100%, 3% 100%, 0 97%)" }}
        >
          {/* Kraft texture overlay */}
          <div
            aria-hidden
            className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
            }}
          />
          {/* Tape strips */}
          <span
            aria-hidden
            className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 h-5 w-14 -rotate-2 bg-[oklch(0.92_0.06_85)]/60 border border-white/30"
          />
          <div className="aspect-square w-[14rem] overflow-hidden group sm:w-[17rem]">{inner}</div>
          {caption && (
            <figcaption className="pb-3 text-center font-hand text-lg text-[oklch(0.38_0.06_30)] relative z-20">
              {caption}
            </figcaption>
          )}
          {dateStamp && (
            <span
              aria-hidden
              className="absolute bottom-3 right-2.5 z-20 font-sans text-[0.5rem] tracking-widest text-[oklch(0.60_0.10_20)]"
            >
              {dateStamp}
            </span>
          )}
        </div>
      </motion.figure>
    );
  }

  return null;
}