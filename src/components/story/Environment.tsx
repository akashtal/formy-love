import { useEffect, useRef } from "react";
import { onStoryProgress, clamp } from "./progress";

const LAYERS = [
  "/bg-1.png",
  "/bg-2.png",
  "/bg-3.png",
  "/bg-4.png",
  "/bg-5.png",
];

const PHASE_COUNT = LAYERS.length;
const ZOOM_SPEED = 0.15; // How much it scales up per phase

export function Environment() {
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  const gradeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsub = onStoryProgress((p) => {
      // t goes from 0 to (PHASE_COUNT - 1)
      const t = p * (PHASE_COUNT - 1);

      // Render the Cross-Fading Zoom sequence
      refs.current.forEach((el, i) => {
        if (!el) return;
        
        // Fades in completely over the course of 1 phase interval
        // Layer 0 is always opacity 1. Layer 1 fades in from t=0 to 1.
        const opacity = clamp(t - (i - 1), 0, 1);
        
        // Hide completely if it's covered by the next layer to save GPU
        if (opacity <= 0 || t > i + 1) {
          el.style.visibility = "hidden";
          return;
        }
        el.style.visibility = "visible";
        el.style.opacity = String(opacity);

        // Continuous zoom: it is at scale 1.0 right as it starts fading in (t = i - 1)
        // and zooms continuously as you scroll forward.
        const scale = 1.0 + (t - i + 1) * ZOOM_SPEED;
        el.style.transform = `scale(${scale})`;
      });

      // Emotional darkening overlay (same logic as before)
      if (gradeRef.current) {
        let alpha = 0.05;
        if (p > 0.45 && p < 0.65) {
          alpha = 0.05 + ((p - 0.45) / 0.20) * 0.45; // peaks around 0.50
        } else if (p >= 0.65) {
          alpha = 0.50 + ((p - 0.65) / 0.35) * 0.25; // ends around 0.75
        }
        gradeRef.current.style.opacity = String(alpha);
      }
    });

    return () => unsub();
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[oklch(0.12_0.04_270)]"
    >
      {/* 5-Image Zoom Sequence */}
      {LAYERS.map((src, i) => (
        <div
          key={src}
          ref={(el) => { refs.current[i] = el; }}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === 0 ? 1 : 0,
            transform: "scale(1.0)",
            zIndex: i, // Ensure layers stack perfectly in order
          }}
        />
      ))}

      {/* Atmospheric grade overlay (2D, sits over the 3D scene) */}
      <div
        ref={gradeRef}
        className="absolute inset-0 transition-opacity duration-300 mix-blend-multiply"
        style={{ background: "oklch(0.20 0.05 270)", opacity: 0.05, zIndex: 100 }}
      />
      
      {/* Soft vignette to keep text readable */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_15%,rgba(10,5,20,0.85)_100%)]" 
        style={{ zIndex: 101 }}
      />
    </div>
  );
}