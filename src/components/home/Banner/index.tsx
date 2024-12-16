"use client";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";
import { useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Body4, Frame } from "@/atoms";
import Image from "@/atoms/Image";

interface BannerProps {
  bannerList: Array<{
    s3Key: string;
    type: "WEB" | "APP";
    link?: string;
    notice?: any;
    noticeId?: number;
  }>;
}

export function Banner({ bannerList }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(1);

  const bucketAddress =
    "https://pjh-image-bucket.s3.ap-northeast-2.amazonaws.com/";

  if (bannerList.length === 0) {
    return null;
  }

  return (
    <Frame col w="100%" px={20} py={10} zIndex={10}>
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex + 1);
        }}
        className="w-full"
      >
        {bannerList.map((banner, index) => (
          <SwiperSlide key={`banner_${index}`}>
            {banner.type === "WEB" ? (
              <a
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Image
                  src={`${bucketAddress}${banner.s3Key}`}
                  alt={`Banner ${index}`}
                  height={120}
                />
              </a>
            ) : (
              <Link
                href={banner.noticeId ? `/notice/${banner.noticeId}` : "#"}
                className="block w-full"
              >
                <Image
                  src={`${bucketAddress}${banner.s3Key}`}
                  alt={`Banner ${index}`}
                  height={120}
                />
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {bannerList.length > 1 && (
        <Frame
          col
          position="absolute"
          bottom={16}
          right={24}
          px={8}
          py={2}
          radius={12}
          zIndex={50}
          bg="white"
          opacity={0.7}
        >
          <Body4>
            {currentIndex}/{bannerList.length}
          </Body4>
        </Frame>
      )}
    </Frame>
  );
}

export default Banner;
