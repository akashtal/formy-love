import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * A continuous, subtle "rain" of cherry blossoms.
 */

interface Petal {
  x: number;
  y: number;
  w: number;   // width
  h: number;   // height
  vx: number;  // x velocity
  vy: number;  // y velocity
  a: number;   // alpha/opacity
  sway: number; // phase for horizontal sway
  swaySpeed: number;
  rot: number;  // rotation phase
  rotSpeed: number; // rotation speed
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Increase petal count and sizes so they are clearly visible
    const MAX_PETALS = window.innerWidth < 600 ? 60 : 150;
    const petals: Petal[] = Array.from({ length: MAX_PETALS }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      w: 4 + Math.random() * 6,     // width of petal (4 to 10px)
      h: 8 + Math.random() * 12,    // height of petal (8 to 20px)
      vx: 0.3 + Math.random() * 1.2, // drifting right
      vy: 0.8 + Math.random() * 1.5, // falling down
      a: 0.5 + Math.random() * 0.4,  // highly visible (0.5 to 0.9 opacity)
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.015 + Math.random() * 0.02,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.05,
    }));

    let raf = 0;
    let time = 0;

    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, w, h);

      for (const p of petals) {
        // Physics update
        p.x += p.vx + Math.sin(time * p.swaySpeed + p.sway) * 0.8;
        p.y += p.vy;
        p.rot += p.rotSpeed;

        // Wrap around smoothly
        if (p.y > h + 30) {
          p.y = -30;
          p.x = Math.random() * w;
        }
        if (p.x > w + 30) {
          p.x = -30;
        }

        ctx.save();
        ctx.globalAlpha = p.a;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot); // Spin the petal 
        
        // Add a gentle depth-wobble by scaling the Y axis based on rotation
        ctx.scale(1, 0.4 + Math.abs(Math.sin(time * p.rotSpeed * 2)) * 0.6);

        // Draw an organic petal shape (teardrop)
        ctx.beginPath();
        ctx.moveTo(0, -p.h / 2); // top point
        ctx.bezierCurveTo(p.w, -p.h / 3, p.w, p.h / 2, 0, p.h / 2); // right side curve
        ctx.bezierCurveTo(-p.w, p.h / 2, -p.w, -p.h / 3, 0, -p.h / 2); // left side curve
        ctx.closePath();

        // Beautiful soft pink fill
        ctx.fillStyle = "#ffb7c5"; 
        ctx.fill();

        // Subtle specular highlight so they pop out of the background
        ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
        ctx.shadowBlur = 4;
        
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-10 h-[100svh] w-full"
    />
  );
}