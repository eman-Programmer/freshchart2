"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image, { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SlideItem {
  image: StaticImageData | string;
  title: string;
  description: string;
  button1Text: string;
  button2Text: string;
}

export default function Slider({
  spaceBetween,
  slidesPerView,
  pageList,
}: {
  spaceBetween: number;
  slidesPerView: number;
  pageList: SlideItem[];
}) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full">
      <Swiper
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== "boolean" && swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination-dots",
        }}
        
        className="w-full relative group"
      >
        {pageList.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[400px] overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />

              <div className="absolute inset-0 bg-[#059f00]/60 z-10" />

              <div className="absolute inset-0 z-20 flex items-center justify-start pl-12 md:pl-20 pr-16">
                <div className="text-white max-w-xl text-left">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 leading-tight drop-shadow-sm">
                    {slide.title}
                  </h1>

                  <p className="text-xs sm:text-sm md:text-base mb-4 opacity-95">
                    {slide.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <button className="bg-white text-[#00b050] hover:bg-gray-100 font-semibold text-xs sm:text-sm px-5 py-2 rounded-md transition-colors shadow-sm cursor-pointer">
                      {slide.button1Text}
                    </button>

                    <button className="border-2 border-white text-white hover:bg-white/20 font-semibold text-xs sm:text-sm px-5 py-2 rounded-md transition-colors cursor-pointer">
                      {slide.button2Text}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button
          ref={prevRef}
          aria-label="Previous Slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-[#00b050] shadow-md hover:bg-gray-100 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

        <button
          ref={nextRef}
          aria-label="Next Slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-[#00b050] shadow-md hover:bg-gray-100 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

       <div className="custom-pagination-dots !absolute !bottom-3 !left-0 !right-0 !w-full z-30 flex items-center justify-center gap-1.5 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:bg-white/60 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet-active]:!bg-white [&_.swiper-pagination-bullet-active]:!w-7 [&_.swiper-pagination-bullet-active]:!rounded-full [&_.swiper-pagination-bullet]:transition-all" />
      </Swiper>
    </div>
  );
}