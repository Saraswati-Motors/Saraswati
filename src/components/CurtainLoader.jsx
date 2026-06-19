import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CurtainLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // "loading" | "ready" | "fading" | "opening"

  useEffect(() => {
    // Prevent scrolling while curtain is active
    document.body.style.overflow = "hidden";
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Transition to interactive "ready" phase
          setTimeout(() => {
            setPhase("ready");
          }, 300);
          return 100;
        }
        // Increment progress smoothly and dynamically
        const increment = Math.max(1, Math.floor(Math.random() * 8) + 1);
        return Math.min(100, prev + increment);
      });
    }, 25);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleStartUnveil = () => {
    setPhase("fading");
  };

  const handleLogoFadeComplete = () => {
    if (phase === "fading") {
      setPhase("opening");
    }
  };

  const handleCurtainsOpenComplete = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden select-none pointer-events-auto bg-black font-sans">
      {/* Curtain Panels */}
      <div className="absolute inset-0 flex">
        {/* Left Curtain */}
        <motion.div
          animate={phase === "opening" ? { x: "-100%" } : { x: 0 }}
          transition={{
            duration: 1.8,
            ease: [0.76, 0, 0.24, 1], // Custom slow premium bezier ease
          }}
          onAnimationComplete={phase === "opening" ? handleCurtainsOpenComplete : undefined}
          className="w-1/2 h-full bg-[#05060b] relative flex justify-end"
        >
          {/* Gold seam edge split line */}
          <div className="absolute top-0 right-0 w-[2px] h-full bg-[#d4af37]/50 shadow-[0_0_10px_rgba(212,175,55,0.4)] z-20" />
          {/* Internal shadow for depth */}
          <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-black via-black/40 to-transparent z-10" />
        </motion.div>

        {/* Right Curtain */}
        <motion.div
          animate={phase === "opening" ? { x: "100%" } : { x: 0 }}
          transition={{
            duration: 1.8,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="w-1/2 h-full bg-[#05060b] relative flex justify-start"
        >
          {/* Gold seam edge split line */}
          <div className="absolute top-0 left-0 w-[2px] h-full bg-[#d4af37]/50 shadow-[0_0_10px_rgba(212,175,55,0.4)] z-20" />
          {/* Internal shadow for depth */}
          <div className="absolute top-0 left-0 w-48 h-full bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
        </motion.div>
      </div>

      {/* Main Brand Content Overlay */}
      <AnimatePresence onExitComplete={handleLogoFadeComplete}>
        {(phase === "loading" || phase === "ready") && (
          <motion.div
            key="loader-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white z-10"
          >
            {/* Soft gold/red light glow behind the logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-red-600/5 via-yellow-600/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

            <div className="flex flex-col items-center space-y-8 max-w-lg px-6 text-center">
              {/* Logo Container with Rotational Gold Rings */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-36 h-36 flex items-center justify-center p-3 rounded-full border border-white/5 bg-black/40 backdrop-blur-md shadow-2xl"
              >
                {/* Dashed outer ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-[#d4af37]/20"
                />
                
                {/* Thin gold inner accent border */}
                <div className="absolute inset-2 rounded-full border border-[#d4af37]/15" />

                <img
                  src="/saraswati.webp"
                  alt="Saraswati Motors Logo"
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                />
              </motion.div>

              {/* Title & Brand Phrase */}
              <div className="space-y-3">
                <motion.h1
                  initial={{ letterSpacing: "0.15em", opacity: 0 }}
                  animate={{ letterSpacing: "0.3em", opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 font-sans"
                >
                  SARASWATI
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex items-center justify-center gap-3"
                >
                  <div className="w-8 h-[1px] bg-[#d4af37]/40" />
                  <span className="text-[10px] md:text-xs tracking-[0.25em] font-light text-[#fff7e1] uppercase">
                    Heritage of Trust
                  </span>
                  <div className="w-8 h-[1px] bg-[#d4af37]/40" />
                </motion.div>
              </div>

              {/* Interactive Loading or Reveal Action */}
              <div className="h-24 flex items-center justify-center w-full mt-4">
                <AnimatePresence mode="wait">
                  {phase === "loading" ? (
                    <motion.div
                      key="progress-bar-container"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center space-y-3 w-60"
                    >
                      {/* Gradient Brand Color Progress Bar */}
                      <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                        <motion.div
                          className="h-full bg-gradient-to-r from-red-600 via-[#d4af37] to-[#fff7e1] rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] tracking-widest text-[#d4af37] font-mono font-bold">
                        {progress}%
                      </span>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="unveil-button"
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleStartUnveil}
                      className="btn-shine px-8 py-3.5 bg-gradient-to-r from-[#d4af37] to-[#b8952b] text-black font-extrabold rounded-full text-xs uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_40px_rgba(212,175,55,0.55)] transition-all duration-300"
                    >
                      UNVEIL THE EXPERIENCE
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
