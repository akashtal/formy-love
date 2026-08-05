import { useEffect, useRef, useState } from "react";
import { chapters } from "@/data/story";
import { onStoryProgress } from "./progress";
import type Lenis from "lenis";

const LABELS = ["Prologue", ...chapters.map((c) => c.title), "Letter"];
const STOPS = LABELS.length;

interface Props {
  lenis: React.RefObject<Lenis | null>;
}

export function ProgressRail({ lenis }: Props) {
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const dotRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    return onStoryProgress((p) => {
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
      const active = Math.round(p * (STOPS - 1));
      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = i === active ? "1" : "0.35";
        el.style.transform = i === active ? "scale(2.0)" : "scale(1)";
        el.setAttribute("aria-current", i === active ? "true" : "false");
      });
    });
  }, []);

  const scrollTo = (i: number) => {
    const ids = ["", ...chapters.map((c) => c.id), "letter"];
    const id = ids[i];
    if (!id) {
      // Prologue — scroll to top
      if (lenis.current) lenis.current.scrollTo(0, { duration: 2.2 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis.current) {
      lenis.current.scrollTo(el, { duration: 2.2, offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label="Story chapters"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-0 md:flex"
    >
      {/* Progress fill rail */}
      <div className="relative mb-2 h-36 w-px">
        <span className="absolute inset-0 bg-white/20 rounded-full" />
        <span
          ref={fillRef}
          className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-foreground/65 transition-none"
          style={{ transform: "scaleY(0)" }}
        />
      </div>

      {/* Dots */}
      <div className="flex flex-col gap-3">
        {LABELS.map((label, i) => (
          <div key={i} className="relative flex items-center justify-end">
            {/* Tooltip */}
            <span
              className={`absolute right-6 whitespace-nowrap rounded-full bg-black/60 px-3 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-white/85 backdrop-blur-sm transition-all duration-200 ${
                hoveredIndex === i
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2 pointer-events-none"
              }`}
            >
              {label}
            </span>

            <button
              ref={(el) => { dotRefs.current[i] = el; }}
              type="button"
              aria-label={`Go to ${label}`}
              aria-current="false"
              onClick={() => scrollTo(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="h-1.5 w-1.5 rounded-full bg-foreground transition-all duration-500 hover:scale-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50"
              style={{ opacity: 0.35 }}
            />
          </div>
        ))}
      </div>
    </nav>
  );
}