import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { chapters, HER, HIM } from "@/data/story";
import { Environment } from "@/components/story/Environment";
import { Particles } from "@/components/story/Particles";
import { ChapterSection } from "@/components/story/ChapterSection";
import { Prologue } from "@/components/story/Prologue";
import { Finale } from "@/components/story/Finale";
import { MusicPlayer, startMusic } from "@/components/story/MusicPlayer";
import { LoadingScreen } from "@/components/story/LoadingScreen";
import { ProgressRail } from "@/components/story/ProgressRail";
import { setStoryProgress } from "@/components/story/progress";

const TITLE = "My Jaan — Our Story, One Scroll At A Time";
const DESCRIPTION =
  "A cinematic scroll-through of our love story: from the first office to Shillong hills, February trips, December lights, and a letter at the end.";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
}));

function Index() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Wait until loading is complete before starting Lenis
    if (loading) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setStoryProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };

    if (reduced) {
      window.addEventListener("scroll", update, { passive: true });
      update();
      return () => window.removeEventListener("scroll", update);
    }

    const lenis = new Lenis({
      duration: 1.5,
      smoothWheel: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;
    lenis.on("scroll", (e: unknown) => {
      update();
      // Trigger music on the very first Lenis scroll event
      startMusic();
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    update();

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [loading]);

  const backToTop = () => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 2.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Environment />
      <Particles />
      <ProgressRail lenis={lenisRef} />
      <MusicPlayer />

      <Prologue />
      {chapters.map((chapter, i) => (
        <ChapterSection key={chapter.id} chapter={chapter} index={i} />
      ))}
      <Finale onBackToTop={backToTop} />
    </main>
  );
}
