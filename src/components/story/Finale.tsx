import { motion } from "motion/react";
import { finale } from "@/data/story";
import { useEffect, useRef, useState } from "react";

// ── Starfield Canvas ──────────────────────────────────────────────────────────
function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const STAR_COUNT = window.innerWidth < 600 ? 800 : 1800;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.3 + Math.random() * 1.4,
      a: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1.5,
    }));

    // A few bright "featured" stars for constellation points
    const CONSTELLATIONS = stars.slice(0, 12).map((s) => ({ ...s, r: 2 + Math.random() * 2 }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMouseMove);

    let time = 0;
    let raf = 0;

    const draw = () => {
      time += 0.012;
      ctx.clearRect(0, 0, w, h);

      // Parallax offset from mouse
      const px = (mouse.current.x / w - 0.5) * 12;
      const py = (mouse.current.y / h - 0.5) * 8;

      // Draw stars
      for (const s of stars) {
        const twinkle = 0.35 + Math.abs(Math.sin(time * s.speed + s.phase)) * 0.65;
        ctx.save();
        ctx.globalAlpha = s.a * twinkle;
        ctx.fillStyle = "rgb(255,255,248)";
        ctx.beginPath();
        ctx.arc(s.x + px * s.r * 0.3, s.y + py * s.r * 0.15, s.r, 0, Math.PI * 2);
        ctx.fill();
        // Bloom
        if (s.r > 1.1) {
          const g = ctx.createRadialGradient(s.x + px * s.r * 0.3, s.y, 0, s.x, s.y, s.r * 7);
          g.addColorStop(0, `rgba(200,200,255,${0.12 * twinkle * s.a})`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(s.x + px * s.r * 0.3, s.y, s.r * 7, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Constellation lines between featured stars
      ctx.save();
      ctx.strokeStyle = "rgba(200,210,255,0.12)";
      ctx.lineWidth = 0.8;
      for (let i = 0; i < CONSTELLATIONS.length - 1; i++) {
        const a = CONSTELLATIONS[i];
        const b = CONSTELLATIONS[i + 1];
        if (!a || !b) continue;
        const pulse = 0.5 + Math.sin(time * 0.4 + i * 0.5) * 0.5;
        ctx.globalAlpha = 0.08 * pulse;
        ctx.beginPath();
        ctx.moveTo(a.x + px * 0.4, a.y + py * 0.2);
        ctx.lineTo(b.x + px * 0.4, b.y + py * 0.2);
        ctx.stroke();
      }
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// ── Floating Lantern SVG ──────────────────────────────────────────────────────
function Lantern({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <div
      aria-hidden
      className="absolute bottom-0 pointer-events-none"
      style={{ left: `${x}%`, animation: `lantern-rise ${18 + delay * 2}s ${delay}s ease-in-out infinite` }}
    >
      <svg
        width={size}
        height={size * 1.6}
        viewBox="0 0 40 64"
        fill="none"
        style={{ filter: `drop-shadow(0 0 ${size * 0.4}px rgba(255,200,80,0.7))` }}
      >
        {/* String */}
        <line x1="20" y1="0" x2="20" y2="8" stroke="rgba(200,160,80,0.6)" strokeWidth="1" />
        {/* Body */}
        <ellipse cx="20" cy="36" rx="14" ry="22" fill="rgba(255,220,100,0.35)" stroke="rgba(255,200,80,0.6)" strokeWidth="1" />
        {/* Glow core */}
        <ellipse cx="20" cy="36" rx="9" ry="15" fill="rgba(255,240,160,0.5)" />
        {/* Bottom cap */}
        <ellipse cx="20" cy="56" rx="8" ry="3" fill="rgba(200,160,60,0.5)" stroke="rgba(255,200,80,0.4)" strokeWidth="0.5" />
        {/* Top cap */}
        <ellipse cx="20" cy="16" rx="8" ry="3" fill="rgba(200,160,60,0.5)" stroke="rgba(255,200,80,0.4)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

// ── Closing Line Typewriter ────────────────────────────────────────────────────
function ClosingTypewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.disconnect();
          let i = 0;
          const id = window.setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) clearInterval(id);
          }, 55);
        }
      },
      { threshold: 0.7 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  return (
    <p
      ref={ref}
      className="mt-24 font-display text-3xl leading-tight tracking-tight text-foreground drop-shadow-[0_4px_30px_rgba(20,16,40,0.7)] sm:text-5xl"
    >
      {displayed}
      <span
        className="inline-block h-[0.9em] w-[2px] translate-y-[2px] bg-foreground/50 align-middle ml-1 animate-typewriter-cursor"
        aria-hidden
        style={{ opacity: displayed.length >= text.length ? 0 : 1 }}
      />
    </p>
  );
}

// ── Finale ────────────────────────────────────────────────────────────────────
export function Finale({ onBackToTop }: { onBackToTop: () => void }) {
  const LANTERNS = [
    { x: 8, delay: 0, size: 28 },
    { x: 22, delay: 3, size: 22 },
    { x: 38, delay: 7, size: 32 },
    { x: 55, delay: 1.5, size: 20 },
    { x: 68, delay: 5, size: 26 },
    { x: 80, delay: 9, size: 18 },
    { x: 92, delay: 4, size: 30 },
  ];

  return (
    <section
      id="letter"
      aria-label="A letter for you"
      className="relative flex min-h-[140svh] flex-col items-center justify-center px-6 py-32 text-center overflow-hidden"
    >
      {/* Starfield */}
      <StarfieldCanvas />

      {/* Lanterns */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        {LANTERNS.map((l, i) => (
          <Lantern key={i} {...l} />
        ))}
      </div>

      {/* Letter card */}
      <motion.div
        initial={{ opacity: 0, y: 70, filter: "blur(18px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/20 bg-white/10 p-10 backdrop-blur-md sm:p-14 shadow-[0_40px_100px_-20px_rgba(10,5,30,0.8)]"
      >
        {/* Shimmer on the card */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.04) 100%)",
          }}
        />

        <p className="relative text-[0.65rem] uppercase tracking-[0.48em] text-foreground/65">
          {finale.label}
        </p>
        <h2 className="relative mt-5 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
          {finale.title}
        </h2>

        <div className="relative mt-8 space-y-5 text-left">
          {finale.lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.15, delay: 0.2 + i * 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={`text-base leading-[1.8] text-foreground/88 sm:text-lg ${i === 0 ? "font-hand text-2xl text-foreground" : ""}`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Animated signature */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1.6 }}
          className="relative mt-10 text-right font-hand text-4xl text-foreground sm:text-5xl"
        >
          <span className="story-signature">— {finale.signature}</span>
        </motion.p>
      </motion.div>

      {/* Typewriter closing line */}
      <div className="relative z-10">
        <ClosingTypewriter text={finale.closing} />
      </div>

      {/* Heartbeat */}
      <motion.span
        initial={{ opacity: 0, scale: 0.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 1 }}
        aria-hidden
        className="relative z-10 mt-10 block"
      >
        <svg
          viewBox="0 0 100 90"
          className="h-10 w-10 animate-heartbeat"
          fill="oklch(0.72 0.15 18)"
          style={{ filter: "drop-shadow(0 0 18px oklch(0.72 0.15 18 / 0.7))" }}
        >
          <path d="M50 85 C20 60 5 45 5 28 C5 14 16 5 28 5 C36 5 43 9 50 17 C57 9 64 5 72 5 C84 5 95 14 95 28 C95 45 80 60 50 85Z" />
        </svg>
      </motion.span>

      {/* Back to top */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 2 }}
        type="button"
        onClick={onBackToTop}
        className="relative z-10 mt-20 rounded-full border border-white/25 bg-white/10 px-7 py-3 text-[0.65rem] uppercase tracking-[0.38em] text-foreground/75 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:text-foreground"
      >
        read it again
      </motion.button>
    </section>
  );
}