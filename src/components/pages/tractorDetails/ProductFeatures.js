"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import TractorFeature from "./TractorFeature";
import { motion, useScroll } from "framer-motion";

// Throttle function to limit the rate of function calls
const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const ProductFeatures = ({ data }) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const containerRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState("none");
  const [blockWidth, setBlockWidth] = useState(0);


  // Effect to measure block width
  useEffect(() => {
    const updateBlockWidth = () => {
      const block = document.querySelector('.scroll-block');
      if (block) {
        setBlockWidth(block.offsetWidth);
      }
    };

    updateBlockWidth();
    window.addEventListener('resize', updateBlockWidth);
    return () => window.removeEventListener('resize', updateBlockWidth);
  }, []);

  let topTitle,
    mainHeading,
    features = null;
  if (data) {
    topTitle = data.topTitle;
    mainHeading = data.mainHeading;
    features = data.features;
  }


  // Calculate the sliding position based on threshold
  const calculateSlidePosition = (currentIndex) => {
    if (!features || !features.length) return 0;

    const threshold = 5; // Start sliding after 5th block
    if (currentIndex <= threshold) {
      return 0; // Don't slide for first 5 blocks
    }

    // Stop sliding at second last block
    const maxIndex = features.length - 2; // Second last block
    const slideIndex = Math.min(currentIndex - threshold, maxIndex - threshold);

    return -slideIndex * blockWidth;
  };

  const scrollVariants = {
    animate: {
      x: calculateSlidePosition(currentSlide),
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  // Calculate height based on number of features
  const featureSectionHeight = features ? `${features.length * 50}vh` : "200vh";

  useEffect(() => {
    const container = containerRef.current;
    let isSticky = false;
    let lastScrollY = scrollY.get();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isSticky = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (container) {
      observer.observe(container);
    }

    const handleScroll = throttle(() => {
      if (isSticky) {
        const currentScrollY = scrollY.get();
        const direction = currentScrollY > lastScrollY ? "down" : "up";
        lastScrollY = currentScrollY;

        setScrollDirection(direction);

        if (direction === "down" && currentSlide < features.length - 1) {
          setCurrentSlide((prev) => prev + 1);
          sliderRef.current.swiper.slideNext();
        } else if (direction === "up" && currentSlide > 0) {
          setCurrentSlide((prev) => prev - 1);
          sliderRef.current.swiper.slidePrev();
        }
      }
    }, 500);

    const unsubscribe = scrollY.onChange(handleScroll);

    return () => {
      unsubscribe();
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [scrollY, currentSlide, features]);

  // Slider settings
  const sliderSettings = {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    onSlideChange: (swiper) => {
      setCurrentSlide(swiper.realIndex);
    },
  };

  return (
    <>
      <section
        id="feature-section"
        className="tractor-feature py-80"
        style={{ minHeight: featureSectionHeight }}
      >
        <div className="container" ref={containerRef}>
          <div className="row">
            <div className="col-md-6">
              <div className="section-title">
                <h3>{topTitle}</h3>
                <h2>{mainHeading}</h2>
              </div>
            </div>
            <div className="col-md-6">
              <div className="slider-button-block d-none d-lg-block text-end">
                {/* Previous button */}
                <button
                  className="owl-prev-slider"
                  onClick={() => {
                    sliderRef.current.swiper.slidePrev();
                    setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
                  }}
                >
                  <svg
                    width="22"
                    height="12"
                    viewBox="0 0 22 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.279759 6.68472C0.279759 6.68472 0.280238 6.6852 0.280713 6.68568L5.25685 11.7182C5.6297 12.0952 6.23255 12.0938 6.60398 11.7149C6.97493 11.336 6.9735 10.7233 6.60064 10.3464L3.25973 6.9678L21.0476 6.9678C21.5738 6.9678 22 6.53471 22 6C22 5.46529 21.5738 5.0322 21.0476 5.0322L3.25925 5.0322L6.60017 1.65361C6.97302 1.27665 6.97445 0.664034 6.6035 0.28514C6.23255 -0.0937542 5.62923 -0.0952067 5.25637 0.281752L0.280236 5.31431C0.280236 5.31431 0.279759 5.3148 0.279284 5.31528C-0.0935702 5.69369 -0.0926184 6.30824 0.279284 6.6852L0.279759 6.68472Z"
                      fill="#201E1E"
                    />
                  </svg>
                </button>
                {/* Next button */}
                <button
                  className="owl-next-slider"
                  onClick={() => {
                    sliderRef.current.swiper.slideNext();
                    setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
                  }}
                >
                  <svg
                    width="22"
                    height="12"
                    viewBox="0 0 22 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.7202 5.31528C21.7202 5.31528 21.7198 5.3148 21.7193 5.31431L16.7432 0.281754C16.3703 -0.0952044 15.7674 -0.0937527 15.396 0.285141C15.0251 0.664035 15.0265 1.27665 15.3994 1.65361L18.7403 5.0322L0.952371 5.0322C0.426186 5.0322 0 5.46529 0 6C0 6.53471 0.426186 6.9678 0.952371 6.9678L18.7407 6.9678L15.3998 10.3464C15.027 10.7233 15.0256 11.336 15.3965 11.7149C15.7674 12.0938 16.3708 12.0952 16.7436 11.7182L21.7198 6.68569C21.7198 6.68569 21.7202 6.6852 21.7207 6.68472C22.0936 6.30631 22.0926 5.69176 21.7207 5.3148L21.7202 5.31528Z"
                      fill="#201E1E"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Swiper Slider */}
          <Swiper {...sliderSettings} ref={sliderRef}>
            {features &&
              features.map((feature, index) => (
                <SwiperSlide key={index} className="feature-slide">
                  <TractorFeature data={feature} />
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="slider-button-block d-lg-none d-block text-center">
            {/* Previous button */}
            <button
              className="owl-prev-slider"
              onClick={() => {
                sliderRef.current.swiper.slidePrev();
                setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
              }}
            >
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.279759 6.68472C0.279759 6.68472 0.280238 6.6852 0.280713 6.68568L5.25685 11.7182C5.6297 12.0952 6.23255 12.0938 6.60398 11.7149C6.97493 11.336 6.9735 10.7233 6.60064 10.3464L3.25973 6.9678L21.0476 6.9678C21.5738 6.9678 22 6.53471 22 6C22 5.46529 21.5738 5.0322 21.0476 5.0322L3.25925 5.0322L6.60017 1.65361C6.97302 1.27665 6.97445 0.664034 6.6035 0.28514C6.23255 -0.0937542 5.62923 -0.0952067 5.25637 0.281752L0.280236 5.31431C0.280236 5.31431 0.279759 5.3148 0.279284 5.31528C-0.0935702 5.69369 -0.0926184 6.30824 0.279284 6.6852L0.279759 6.68472Z"
                  fill="#201E1E"
                />
              </svg>
            </button>
            {/* Next button */}
            <button
              className="owl-next-slider"
              onClick={() => {
                sliderRef.current.swiper.slideNext();
                setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
              }}
            >
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.7202 5.31528C21.7202 5.31528 21.7198 5.3148 21.7193 5.31431L16.7432 0.281754C16.3703 -0.0952044 15.7674 -0.0937527 15.396 0.285141C15.0251 0.664035 15.0265 1.27665 15.3994 1.65361L18.7403 5.0322L0.952371 5.0322C0.426186 5.0322 0 5.46529 0 6C0 6.53471 0.426186 6.9678 0.952371 6.9678L18.7407 6.9678L15.3998 10.3464C15.027 10.7233 15.0256 11.336 15.3965 11.7149C15.7674 12.0938 16.3708 12.0952 16.7436 11.7182L21.7198 6.68569C21.7198 6.68569 21.7202 6.6852 21.7207 6.68472C22.0936 6.30631 22.0926 5.69176 21.7207 5.3148L21.7202 5.31528Z"
                  fill="#201E1E"
                />
              </svg>
            </button>
          </div>

          {/* Custom Progress Bar (Clickable) */}
          <div className="col-md-12">
            <div className="tractor-scroll-wrapper">
              {/* <div className="tractor-scroll">
                {features &&
                  features.map((feature, index) => (
                    <div
                      key={index}
                      className={`scroll-block ${currentSlide === index ? "active" : ""}`}
                      onClick={() => {
                        setCurrentSlide(index);
                        sliderRef.current.swiper.slideTo(index);
                      }}
                    >
                      <div className="scroll-tractor">
                        <img
                          src="/images/tractor-scroll.png"
                          alt={`tractor ${index}`}
                          className="tractor-image"
                        />
                      </div>
                      <div className="scroll-content">
                        <span></span>
                        <h6>{feature.title}</h6>
                      </div>
                    </div>
                  ))}
              </div> */}
              <motion.div
                className="tractor-scroll"
                initial={{ x: 0 }}
                animate="animate"
                variants={scrollVariants}
              >
                {features &&
                  features.map((feature, index) => (
                    <div
                      key={index}
                      className={`scroll-block ${currentSlide === index ? "active" : ""}`}
                      onClick={() => {
                        setCurrentSlide(index);
                        sliderRef.current.swiper.slideTo(index);
                      }}
                    >
                      <div className="scroll-tractor">
                        <img
                          src="/images/tractor-scroll.png"
                          alt={`tractor ${index}`}
                          className="tractor-image"
                        />
                      </div>
                      <div className="scroll-content">
                        <span></span>
                        <h6>{feature.title}</h6>
                      </div>
                    </div>
                  ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductFeatures;
