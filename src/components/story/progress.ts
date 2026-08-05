// Tiny scroll-progress store. Components subscribe imperatively so scrolling
// never triggers a React re-render.
type Listener = (progress: number) => void;

const listeners = new Set<Listener>();
let current = 0;

export function setStoryProgress(p: number) {
  current = p;
  for (const l of listeners) l(p);
}

export function getStoryProgress() {
  return current;
}

export function onStoryProgress(l: Listener): () => void {
  listeners.add(l);
  l(current);
  return () => {
    listeners.delete(l);
  };
}

export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v));