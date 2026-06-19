"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FlipWords } from "../components/FlipWords";

export default function Hero() {

  // scroll animation
  const { scrollY } = useScroll();

  // move logo up on scroll
  const y = useTransform(scrollY, [0, 300], [0, -120]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.85]);

  const words = ["Excellence", "Trust", "Quality"];

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: "url('/bg.webp')", // put image in public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
        <div className="text-2xl md:text-4xl font-semibold tracking-wide text-center">

          <span className="inline-block align-middle">
            <FlipWords words={words} className="text-yellow-400" />
          </span>

          <span className="ml-0.20rem text-white align-middle">
            Across Every Journey.
          </span>

        </div>

      </div>
    </section>
  );
}
