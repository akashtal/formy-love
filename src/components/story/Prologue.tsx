import { motion, useReducedMotion } from "motion/react";
import { HER, HIM } from "@/data/story";
import { useEffect, useRef, useState } from "react";

const SUBTITLE = "every place we have been, in the order we lived it";

/** Typewriter that reveals one character at a time after a delay */
function Typewriter({ text, delay = 2200 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) { setDisplayed(text); return; }
    let i = 0;
    const t = window.setTimeout(() => {
      const id = window.setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, 38);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay, reduce]);

  return (
    <span>
      {displayed}
      <span
        className="ml-px inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-foreground/60 align-middle animate-typewriter-cursor"
        aria-hidden
        style={{ opacity: displayed.length >= text.length ? 0 : 1 }}
      />
    </span>
  );
}

export function Prologue() {
  const heartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    let raf = 0;
    const animate = () => {
      t += 0.02;
      if (heartRef.current) {
        const s = 1 + Math.sin(t) * 0.06;
        heartRef.current.style.transform = `scale(${s})`;
        heartRef.current.style.opacity = String(0.06 + Math.abs(Math.sin(t * 0.5)) * 0.04);
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Giant ghost heart behind the title */}
      <svg
        ref={heartRef}
        aria-hidden
        viewBox="0 0 100 90"
        className="pointer-events-none absolute inset-0 m-auto h-[60vmin] w-[60vmin] text-foreground/5 will-change-transform"
        fill="currentColor"
      >
        <path d="M50 85 C20 60 5 45 5 28 C5 14 16 5 28 5 C36 5 43 9 50 17 C57 9 64 5 72 5 C84 5 95 14 95 28 C95 45 80 60 50 85Z" />
      </svg>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-[0.7rem] uppercase tracking-[0.45em] text-foreground/70"
      >
        A story in thirteen chapters
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 40, filter: "blur(18px)", scale: 1.04 }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 2.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-6 font-display text-5xl leading-[1] tracking-tight text-foreground drop-shadow-[0_4px_30px_rgba(30,20,40,0.5)] sm:text-7xl lg:text-8xl"
      >
        My Jaan
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.6 }}
        className="relative mt-8 max-w-md font-hand text-2xl leading-snug text-foreground/85 sm:text-3xl"
      >
        <Typewriter text={SUBTITLE} delay={2000} />
      </motion.p>

      {/* Decorative thin rule */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 h-px w-40 origin-left bg-gradient-to-r from-transparent via-foreground/30 to-transparent"
      />

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 3.2 }}
        className="absolute bottom-10 flex flex-col items-center gap-3"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.4em] text-foreground/60">
          scroll to begin
        </span>
        <span className="h-14 w-px animate-scroll-hint bg-gradient-to-b from-foreground/60 to-transparent" />
      </motion.div>
    </section>
  );
}