"use client";

import { Maximize2, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/media/ahmed-fayyaz-introduction.mp4";
const POSTER_SRC = "/media/ahmed-fayyaz-introduction-poster.jpg";

export function IntroductionVideo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;

    if (!card || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          video.play().catch(() => {
            setIsPlaying(false);
          });
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.55, 1] }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  async function openFullscreen() {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      await video.requestFullscreen();
      return;
    }

    const safariVideo = video as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
    };
    safariVideo.webkitEnterFullscreen?.();
  }

  return (
    <div
      className="group relative mx-auto w-full max-w-[620px] overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#07182a] p-2 shadow-[0_28px_70px_rgba(11,30,51,0.28)] sm:p-3"
      ref={cardRef}
    >
      <div className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-black">
        <video
          aria-label="Ahmed Fayyaz introduction video"
          className="size-full object-cover"
          controls
          muted
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          playsInline
          poster={POSTER_SRC}
          preload="metadata"
          ref={videoRef}
          src={VIDEO_SRC}
        >
          Your browser does not support HTML video.
        </video>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/65 to-transparent p-4 pb-10 text-white">
          <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] backdrop-blur-md">
            <span className={`size-1.5 rounded-full ${isPlaying ? "animate-pulse bg-emerald-400" : "bg-white/45"}`} />
            {isPlaying ? "Playing while in view" : "Introduction"}
          </span>
          <span className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/75 sm:flex">
            <Volume2 className="size-3.5" /> Unmute for sound
          </span>
        </div>

        <button
          aria-label="Open introduction video in full screen"
          className="absolute right-4 top-14 flex items-center gap-2 rounded-full border border-white/15 bg-[#0b1e33]/80 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white opacity-100 shadow-lg backdrop-blur-md transition hover:bg-[#2d69a7] sm:top-auto sm:bottom-12 sm:opacity-0 sm:group-hover:opacity-100"
          onClick={openFullscreen}
          type="button"
        >
          <Maximize2 className="size-3.5" /> Full screen
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 px-3 pb-2 pt-4 text-white sm:px-4">
        <div>
          <p className="text-sm font-extrabold tracking-[-0.02em]">Ahmed Fayyaz</p>
          <p className="mt-1 text-[11px] text-white/45">Senior Full Stack Developer</p>
        </div>
        <span className="rounded-full border border-[#8cc8ff]/25 bg-[#8cc8ff]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#b9ddff]">
          01:07
        </span>
      </div>
    </div>
  );
}
