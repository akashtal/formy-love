import { useEffect, useState } from "react";
import { startMusic } from "@/components/story/MusicPlayer";
import { motion, AnimatePresence } from "motion/react";

// The massive background images that need to be fully loaded before starting
const LAYERS = [
  "/bg-1.png",
  "/bg-2.png",
  "/bg-3.png",
  "/bg-4.png",
  "/bg-5.png",
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Disable scrolling completely on the body while the loading screen is active
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    let loaded = 0;

    // Track start time to ensure the loader stays on screen for at least 1.5s for a cinematic feel
    const t0 = performance.now();

    const checkReady = () => {
      loaded++;
      // If all 5 images are loaded, wait until at least 1.5s has passed before showing the button
      if (loaded >= LAYERS.length) {
        const elapsed = performance.now() - t0;
        const remaining = Math.max(0, 1500 - elapsed);
        setTimeout(() => setReady(true), remaining);
      } else {
        setProgress(Math.round((loaded / LAYERS.length) * 100));
      }
    };

    LAYERS.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = checkReady;
      img.onerror = checkReady; // proceed even if one fails
    });
  }, []);

  const handleBegin = () => {
    // This single tap perfectly satisfies mobile browsers' strict audio unlock rule!
    startMusic();
    setDismissed(true);
    setTimeout(onComplete, 1000); // Wait for the fade out animation to finish before unmounting
  };

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
        >
          {/* Subtle cherry blossom or romantic motif */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,183,197,0.05),transparent_50%)]" />

          <div className="z-10 flex flex-col items-center gap-8">
            <h1 className="font-serif text-3xl font-light tracking-widest text-white/90 sm:text-5xl">
              Our Story
            </h1>

            <div className="flex h-10 items-center justify-center">
              {!ready ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="h-[2px] w-32 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full bg-white/70"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-white/40">
                    Loading memories...
                  </span>
                </div>
              ) : (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleBegin}
                  className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/20"
                >
                  TAP TO BEGIN
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
