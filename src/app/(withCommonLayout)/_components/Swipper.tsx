"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Swipper = () => {
  const slides = [
    "https://i.postimg.cc/qvVK5KXM/versity1.jpg",
    "https://i.postimg.cc/xC4JyN1J/versity.jpg",
  ];

  return (
    <div className="w-full">
      <Swiper
        pagination={{ clickable: true }}
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
        loop={true}
      >
        {slides.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[480px] lg:h-[600px]">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <h2 className="text-white text-3xl lg:text-5xl font-bold text-center px-4">
                  Jashore University of Science and Technology
                  
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swipper;
