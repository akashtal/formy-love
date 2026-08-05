# My Jaan — A Cinematic Love Story

A single-page, scroll-driven story site. Scrolling moves a virtual camera through an
environment that shifts from morning to a starry night, while chapters of your story
surface as floating memories.

## What gets built

**One continuous journey**, broken into chapters:

1. Prologue — dark screen, a whispered line, "Scroll to begin"
2. The First Office — where you met
3. First Conversation
4. First Photo Together
5. First Date
6. Places We Went (Shillong sequence, using your uploads)
7. Funny Us
8. The Hard Days — small fights, the distance
9. Coming Back To Each Other
10. Celebrations & Surprises
11. Dreams Ahead
12. Final Love Letter — night sky, lanterns, handwritten signature, "I will always choose you."

Each chapter carries: title, optional date, a short personal story, and a line of
message. I'll write warm, specific-feeling copy from what you've told me (met at your
first office, the Shillong trip) and leave the rest as beautiful placeholder prose in a
single easy-to-edit file so you can rewrite any line without touching layout.

**Environment & time-of-day:** a layered painterly sky/hills/blossom scene that
cross-fades morning → afternoon → golden hour → sunset → night → stars as you scroll.
Generated as art layers, parallaxed at different depths so it feels like moving inside
the scene, not scrolling a page.

**Photos:** presented as floating polaroids, hanging frames, glass memory cards, film
strips and scrapbook clusters — never plain rectangles. Each drifts in with blur-to-focus,
soft shadow, and gentle idle float. Your 5 uploads are placed now; adding more later is
one line per photo in the chapter data file.

**Atmosphere:** cherry-blossom petals, fireflies at night, drifting light rays, soft fog,
lens bloom, depth blur, and a slow "breathing" background. Density tuned per chapter so
sad chapters go quiet and desaturated, and romance chapters glow.

**Music:** player built now with fade-in, loop, volume slider and mute, plus autoplay
that falls back to first-interaction start. It ships with a placeholder track slot —
upload your song and I'll drop it in. Volume ducks softly at chapter transitions.

**UI:** almost invisible. A thin vertical chapter progress rail, a small music control,
a next-chapter nudge, and a back-to-top at the end.

## Technical notes

The project runs on TanStack Start + React + TypeScript + Tailwind v4 (not Next.js —
same React/TS/Tailwind authoring, different router; everything above works unchanged).
Animation: GSAP + ScrollTrigger for the camera timeline, Framer Motion for element
reveals, Lenis for smooth scroll. Particles and the depth/parallax layers are done in
canvas/CSS-transform rather than Three.js — cheaper, holds 60fps on mobile, and looks the
same for this kind of 2.5D camera work.

Photos are cut out from their backgrounds where a subject should blend into the scene,
and kept full-frame where the photo itself is the memory (the Shillong sign, the sunset
overlook). Cutouts are baked in advance, not at runtime.

Performance: reduced particle counts and simplified parallax on mobile, lazy-loaded
chapter media, GPU-only transforms, and a `prefers-reduced-motion` fallback that keeps
the story readable without motion.

SEO: title, description, Open Graph and Twitter preview on the page.

## Content you can hand me any time

Names beyond Akash and Jaan, real dates, the story behind each memory, and your song
file. Anything missing ships as placeholder text that reads well on its own.
