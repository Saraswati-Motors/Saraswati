"use client";;
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { twMerge } from "tailwind-merge";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../components/useOutsideClick";

export const CarouselContext = createContext({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({
  items,
  initialScroll = 0
}) => {
  const carouselRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 480; // (md:w-[30rem])
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 840;
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-10"
          ref={carouselRef}
          onScroll={checkScrollability}>
          <div
            className={twMerge("absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l")}></div>

          <div
            className=
              "flex flex-row gap-6 px-6"
            >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="rounded-3xl last:pr-[2%] md:last:pr-[2%]">
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">

    {/* overlay */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/60 backdrop-blur-md"
      onClick={handleClose}
    />

    {/* modal */}
    <motion.div
      ref={containerRef}
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.92, opacity: 0 }}
      className="relative z-50 w-[92vw] min-[840px]:w-[70vw] h-[85vh] min-[840px]:h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
    >

              {/* top image wrapper with background blur */}
              <div className="h-[40%] min-[840px]:h-[45%] w-full relative flex-shrink-0 bg-black/90 overflow-hidden flex items-center justify-center">
                {/* Blurred background image to fill letterbox and avoid empty space */}
                <img
                  src={card.src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-md opacity-40 scale-105 pointer-events-none"
                />
                {/* Sharp centered image preserving its aspect ratio and preventing blur */}
                <img
                  src={card.src}
                  alt={card.title}
                  className="relative z-10 max-w-full max-h-full object-contain"
                />
              </div>

              {/* scrollable content */}
              <div className="flex-1 overflow-y-auto p-5 min-[840px]:p-8">

                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 min-[840px]:top-6 min-[840px]:right-6 text-xl min-[840px]:text-2xl text-gray-400 hover:text-black"
                >
                  ✕
                </button>

                {/* category */}
                <p className="text-xs min-[840px]:text-sm text-gray-500 mb-1 min-[840px]:mb-2">
                  {card.category}
                </p>

                {/* clickable company name */}
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl min-[840px]:text-3xl font-bold text-black hover:underline block mb-3 min-[840px]:mb-6"
                >
                  {card.title}
                </a>

                {/* description */}
                <div className="text-gray-700 text-sm min-[840px]:text-base leading-relaxed space-y-4 min-[840px]:space-y-6">
                  {card.content}
                </div>

              </div>
    </motion.div>
  </div>
)}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[30rem] md:w-[24rem] dark:bg-neutral-900">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-left font-sans text-xs font-medium text-white md:text-sm">
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-2 max-w-xs text-left font-sans text-lg font-semibold [text-wrap:balance] text-white md:text-2xl">
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="absolute inset-0 z-10 object-cover" />
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  fill,
  blurDataURL,
  ...rest
}) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={twMerge(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest} />
  );
};
