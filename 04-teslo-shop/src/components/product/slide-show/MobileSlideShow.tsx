'use client';
import Image from 'next/image';
import React from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import './slideshow.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Pagination } from 'swiper/modules';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

const MobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={`${className}`}>
      <Swiper
        style={{
          width: '100vw',
          height: '500px',
        }}
        spaceBetween={30}
        effect={'fade'}
        autoplay={{
          delay: 2500,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={600}
              height={500}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MobileSlideShow;
