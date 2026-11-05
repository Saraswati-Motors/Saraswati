"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  // scroll animation for logo
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -120]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.85]);

  // Auto-play with audio as soon as component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    video.play().catch(() => {
      // Browser blocked autoplay with sound — fall back to muted autoplay
      video.muted = true;
      setIsMuted(true);
      video.play();
    });
  }, []);

  // Fade audio out as hero scrolls out of view, fade back in when returning
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleScroll = () => {
      if (isMuted) return;
      const heroHeight = sectionRef.current?.offsetHeight || window.innerHeight;
      const scrolled = window.scrollY;
      const fadeStart = heroHeight * 0.2;
      const fadeEnd = heroHeight * 0.8;
      if (scrolled <= fadeStart) {
        video.volume = 1;
      } else if (scrolled >= fadeEnd) {
        video.volume = 0;
      } else {
        video.volume = 1 - (scrolled - fadeStart) / (fadeEnd - fadeStart);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMuted]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isMuted) {
      video.muted = false;
      video.volume = 1;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/diwali.mp4" type="video/mp4" />
      </video>

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Mute / Unmute button — bottom right */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-300"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97V10l2.45 2.45c.03-.15.05-.3.05-.45zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l1.5 1.5L20.5 18 5.5 3H4.27zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
            Unmute
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            Mute
          </>
        )}
      </button>

      {/* content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">

        {/* Logo */}
        <motion.img
          src="/saraswati.webp"
          alt="Saraswati Motors Group Logo"
          style={{ y, scale }}
          className="w-[460px] md:w-[860px] mb-6"
        />

        {/* Tagline */}
        <div className="text-xl sm:text-2xl md:text-2xl font-bold tracking-widest text-center text-[#FEFDF3] drop-shadow-md">
          A LEGACY OF TRUST. ACROSS EVERY JOURNEY.
        </div>

      </div>
    </section>
  );
}
