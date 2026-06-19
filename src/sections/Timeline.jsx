import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SmartImage from "../components/SmartImage";

const data = [
  { year: 1992, image: "/history/1992.webp", text: "The journey began with the establishment of our first branch in Rajapur, laying the foundation for our future growth." },
  { year: 2006, image: "/history/2006.webp", text: "Expanded our presence with the launch of operations in Old Prayagraj, strengthening our regional footprint." },
  {
    year: "2014",
    image: "/history/2014.webp",
    text: "Recognized as India’s No. 2 in Hero MotoCorp sales, while simultaneously building one of the country’s largest secondary networks to expand our nationwide presence."
  },
  { year: 2020, image: "/history/2020.webp", text: "Entered a new phase of progress with the launch of our Maruti Suzuki Arena showroom." },
  { year: 2021, image: "/history/2021.webp", text: "Diversified our offerings with the inauguration of the Maruti Suzuki Driving School." },
  {
    year: 2022,
    image: "/history/2022-koraon.webp",
    text: "Expanded our footprint by opening Arena showrooms in Koraon and Pratapgarh, along with new outlets in Manjhanpur and Kunda, strengthening accessibility and network reach."
  },
  { year: 2023, image: "/history/2023-naini.webp", text: "Opened our Commercial Showroom in Naini, marking a significant step in our growth journey." },
  { year: 2023, image: "/history/2023-truevalue.webp", text: "Launched True Value operations, expanding our presence in the pre-owned vehicle segment." },
  { year: 2023, image: "/history/2023-nexa.webp", text: "Continued our expansion with the introduction of Nexa." },
  { year: 2024, image: "/history/2024.webp", text: "Signed a Letter of Intent (LOI) with Holiday Inn, marking our strategic entry into the hospitality sector." },
  { year: 2026, image: "/history/2026.webp", text: "Honored with the Maruti Suzuki Young Entrepreneur Award by Chairman R. C. Bhargava and MD & CEO Hisashi Takeuchi, celebrating our achievements as a Platinum Dealer of India." }
];

export default function Timeline() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const next = () => setIndex((prev) => (prev + 1) % data.length);
  const prev = () => setIndex((prev) => (prev - 1 + data.length) % data.length);

  const current = data[index];

  useEffect(() => {
    const container = containerRef.current;
    const activeItem = itemRefs.current[index];
    if (container && activeItem) {
      const containerWidth = container.offsetWidth;
      const itemOffsetLeft = activeItem.offsetLeft;
      const itemWidth = activeItem.offsetWidth;
      const scrollLeft = itemOffsetLeft - containerWidth / 2 + itemWidth / 2;
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [index]);

  return (
    <section className="w-full py-14 md:py-20 px-4 sm:px-6 md:px-10 overflow-hidden">

      {/* Header */}
      <h2 className="max-w-7xl mx-auto text-center  text-5xl md:text-6xl font-bold mb-3">
        OUR LEGACY
      </h2>

      <p className="text-center text-sm sm:text-base md:text-xl max-w-3xl mx-auto mb-10 md:mb-16 text-gray-700">
        From strong beginnings to a future of growing possibilities.
      </p>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 xl:gap-12">

        <button onClick={prev} className="hidden lg:block text-red-600">
          <ChevronLeft size={32} />
        </button>

        {/* Year */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: .4 }}
            className="font-extrabold text-red-600 text-center text-[54px] sm:text-[72px] md:text-[100px] lg:text-[120px] xl:text-[150px] leading-none"
          >
            {current.year}
          </motion.h1>
        </AnimatePresence>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.image}
            initial={{ rotate: -8, opacity: 0, scale: .9 }}
            animate={{ rotate: -6, opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white border-[12px] border-white shadow-xl w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px] lg:w-[380px] xl:w-[420px] aspect-[4/3] flex-shrink-0 overflow-hidden"
          >
            <SmartImage
              src={current.image || "/fallback.jpg"}
              alt={`Saraswati Motors legacy in ${current.year} - ${current.text}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={current.text}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-xs sm:max-w-md lg:max-w-[280px] xl:max-w-sm text-gray-700 text-center lg:text-left text-sm sm:text-base lg:text-lg"
          >
            {current.text}
          </motion.p>
        </AnimatePresence>

        <button onClick={next} className="hidden lg:block text-red-600">
          <ChevronRight size={32} />
        </button>

        {/* Mobile/Tablet arrows */}
        <div className="flex lg:hidden gap-6 pt-2">
          <button onClick={prev} className="text-red-600">
            <ChevronLeft size={28} />
          </button>
          <button onClick={next} className="text-red-600">
            <ChevronRight size={28} />
          </button>
        </div>
      </div>

      {/* Bottom Timeline */}
      <div 
        ref={containerRef}
        className="mt-14 md:mt-20 overflow-x-auto pb-6 scrollbar-none scroll-smooth relative"
      >
        <div className="relative min-w-max lg:min-w-0 px-[45vw] lg:px-4">
          {/* Horizontal line running behind the timeline dots */}
          <div className="absolute top-[8px] left-[45vw] right-[45vw] h-[2px] bg-gray-300 lg:left-4 lg:right-4" />
          
          <div className="flex justify-between gap-16 md:gap-20 lg:gap-0 relative">
            {data.map((item, i) => (
              <button 
                key={i} 
                ref={(el) => (itemRefs.current[i] = el)}
                onClick={() => setIndex(i)} 
                className="flex flex-col items-center focus:outline-none relative group"
              >
                {/* Timeline Dot */}
                <div 
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 ${
                    i === index 
                      ? "bg-red-600 border-red-600 scale-125 shadow-md shadow-red-200" 
                      : "border-red-600 bg-white group-hover:scale-110"
                  }`} 
                />
                {/* Year Label */}
                <span 
                  className={`text-xs md:text-sm mt-2 transition-all duration-300 font-semibold ${
                    i === index 
                      ? "text-red-600 font-extrabold scale-110" 
                      : "text-gray-500 group-hover:text-gray-800"
                  }`}
                >
                  {item.year}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}