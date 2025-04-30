"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/pagination"; // Import pagination styles
import { Navigation, Pagination } from "swiper/modules"; // Import necessary Swiper modules
import ImageComponent from "./ImageComponent";
import CommonCard from "../BlogSocialContributionCard";
import BoardMemberComponent from "./BoardMemberComponent";
import TestimonialCard from "@/components/pages/Careers/TestimonialCard";
import AwardImageComponent from "@/components/pages/awards/AwardImageComponent";
import TractorFeature from "@/components/pages/tractorDetails/TractorFeature";
import ImplementCard from "@/components/pages/implementDetails/ImplementSlider/ImplementCard";
import Product from "../ProductSlider/Product";
import Implement from "../ProductSlider/Implement";

// Common carousel options
const commonOptions = {};

// Unique options for each type
const uniqueOptions = {
  "image-only": {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 30,
    breakpoints: {
      0: { slidesPerView: 1 },
      380: { slidesPerView: 1 },
      700: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1366: { slidesPerView: 2 },
      1399: { slidesPerView: 3 },
    },
  },
  contribution: {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1366: { slidesPerView: 3 },
    },
  },
  Board_Of_Directors: {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 4,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      380: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1366: {
        slidesPerView: 3,
      },
      1399: {
        slidesPerView: 4,
      },
    },
  },

  Team: {
    spaceBetween: 30,
    slidesPerView: 4,
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1366: { slidesPerView: 3 },
      1399: { slidesPerView: 4 },
    },
  },
  testimonial: {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 1,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      380: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 1,
      },
    },
  },
  "award-slider": {
    loop: true,
    spaceBetween: 32,
    slidesPerView: 1,
    grabCursor: true,
    pagination: {
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      380: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 1,
      },
    },
  },
  "implement-slider": {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 3,
    breakpoints: {
      0: { slidesPerView: 1 },
      380: { slidesPerView: 1 },
      700: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1366: { slidesPerView: 2 },
      1399: { slidesPerView: 3 },
    },
  },
  "details-page-tractors-slider": {
    loop: true,
    spaceBetween: 30,
    // slidesPerView: 'auto',
    centerInsufficientSlides: true,
    centeredSlides: true,
    breakpoints: {
      768: {
        slidesPerView: 3,
        centeredSlides: true,
      },
      480: {
        slidesPerView: 1,
      },
      320: {
        slidesPerView: 1,
      },
    },
  },
  "details-page-implement-slider": {
    loop: true,
    centeredSlides: true,
    spaceBetween: 30,
    slidesPerView: 3,
    breakpoints: {
      768: {
        slidesPerView: 3, // Show 2 slides for screens 768px and up
      },
      480: {
        slidesPerView: 1, // Show 1 slide for screens 480px and up
      },
    },
  },
};

const getCarouselOptions = (type) => {
  const uniqueOpts = uniqueOptions[type] || uniqueOptions["contribution"];

  // Ensure that loop is enabled and adjust options here if needed
  return { ...commonOptions, ...uniqueOpts };
};

const renderCarouselItems = (type, data, isWhite) => {
  const components = {
    "image-only": ImageComponent,
    contribution: CommonCard,
    Board_Of_Directors: BoardMemberComponent,
    Team: BoardMemberComponent,
    testimonial: TestimonialCard,
    "award-slider": AwardImageComponent,
    "tractor-feature": TractorFeature,
    blog: CommonCard,
    "implement-slider": ImplementCard,
    "details-page-tractors-slider": Product,
    "details-page-implement-slider": Implement,
  };

  const Component = components[type];
  if (!Component) return null;
  // console.log("data while rendering", data);
  return data.map((item, index) => (
    <>
      {/* {console.log("data item", item)} */}
      <Component
        key={item.id || index} // Ensure unique keys
        data={item}
        isSlider={true}
        isWhite={isWhite}
        isGalleryImageCard={type === "image-only"}
        isContribution={type === "contribution"}
      />
    </>
  ));
};

const Slider = forwardRef(({ type, data, isWhite }, ref) => {
  const swiperRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useImperativeHandle(ref, () => ({
    prev: () => swiperRef.current?.slidePrev(),
    next: () => swiperRef.current?.slideNext(),
  }));

  // console.log("data in slider component", type, data);
  const options = getCarouselOptions(type);

  if (!isMounted) return null;
  // console.log("data in slider component2", type, data);

  return (
    <Swiper
      ref={swiperRef}
      modules={[Navigation, Pagination]}
      {...options}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
    >
      {renderCarouselItems(type, data, isWhite).map((item) => (
        <SwiperSlide key={item.key}>{item}</SwiperSlide>
      ))}
    </Swiper>
  );
});

// Add displayName for debugging
Slider.displayName = "Slider";

export default Slider;
