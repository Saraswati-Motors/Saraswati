"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {

  // scroll animation
  const { scrollY } = useScroll();

  // move logo up on scroll
  const y = useTransform(scrollY, [0, 300], [0, -120]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.85]);

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/bg.webp"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/cover.mp4" type="video/mp4" />
      </video>

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

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
