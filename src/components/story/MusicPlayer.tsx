import { useEffect } from "react";

/**
 * Invisible background music player.
 */

const TRACK_URL = "/background-music.mp3";
const TARGET_VOLUME = 0.45;

let audio: HTMLAudioElement | null = null;
let started = false;

// Initialize audio only on the client to prevent SSR (Server-Side Rendering) crashes
function initAudio() {
  if (typeof window === "undefined") return null;
  if (!audio) {
    audio = new Audio(TRACK_URL);
    audio.loop = true;
    audio.volume = TARGET_VOLUME;
    audio.preload = "auto";
  }
  return audio;
}

function tryPlay() {
  const a = initAudio();
  if (!a || started) return;
  a.play()
    .then(() => { started = true; })
    .catch(() => { /* still blocked by browser */ });
}

// Attach listeners at module load ONLY on the client (browser) side.
// Capturing phase (true) guarantees we hear the event before anything stops propagation.
if (typeof window !== "undefined") {
  const events = ["pointerdown", "keydown", "touchstart"] as const;
  const handler = () => {
    tryPlay();
    if (started) {
      events.forEach((ev) => document.removeEventListener(ev, handler, true));
    }
  };
  events.forEach((ev) => document.addEventListener(ev, handler, true));
}

/**
 * Call this from anywhere (e.g. Lenis scroll) as an extra nudge.
 * It won't do anything if audio is already playing.
 */
export function startMusic() {
  tryPlay();
}

/**
 * Renders nothing — audio is managed at module level.
 */
export function MusicPlayer() {
  useEffect(() => {
    // Attempt immediate autoplay when the React component mounts
    tryPlay();
  }, []);

  return null;
}