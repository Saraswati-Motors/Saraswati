"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function SectionSlider({ slides }) {
  return (
    <div className="w-full h-[80vh]">

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={1200}
        pagination={{ clickable: true }}
        loop
        className="h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            
            <div className="relative h-full w-full">

              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.alt || slide.title || "Slider background image"}
                loading="lazy"
                className="absolute w-full h-full object-cover"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30">

                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h2>

                <p className="text-lg md:text-xl max-w-2xl">
                  {slide.desc}
                </p>

              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}