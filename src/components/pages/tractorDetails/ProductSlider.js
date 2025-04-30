"use client";
import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PrevArrow, NextArrow } from "../implements/CustomArrows";
import Link from "next/link";
// import { PrevArrow, NextArrow } from './CustomArrows';

const ProductSlider = ({ mainSlides, navSlides, slug, category }) => {
  // console.log("mainSlides", mainSlides);
  const [mainSlider, setMainSlider] = useState(null);
  const [navSlider, setNavSlider] = useState(null);

  const mainSliderRef = useRef(null);
  const navSliderRef = useRef(null);

  useEffect(() => {
    if (mainSliderRef.current && navSliderRef.current) {
      setMainSlider(mainSliderRef.current);
      setNavSlider(navSliderRef.current);
    }
  }, []);

  const mainSettings = {
    // infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    asNavFor: navSliderRef.current || null,
  };

  const navSettings = {
    // infinite: false,
    slidesToShow: Math.min(4, navSlides.length), // Prevents breaking if fewer items exist
    slidesToScroll: 1,
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    vertical: true,
    swipeToSlide: true,
    verticalSwiping: true,
    // centerPadding: "20px",
    arrows: false,
    asNavFor: mainSliderRef.current || null,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          // vertical: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          vertical: false,
          centerMode: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          vertical: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          vertical: false,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  };

  return (
    <>
      <div className="col-md-12 col-lg-8">
        <div className="position-relative">
          <div className="slider slider-for">
            <Slider ref={mainSliderRef} {...mainSettings}>
              {" "}
              {/* Assign ref here */}
              {mainSlides}
            </Slider>
          </div>
          {category == "Above 30 HP Tractor" ||
          category == "Below 30 HP Tractor" ? (
            <></>
          ) : (
            <div className="view-button">
              <a href={`/${slug}/viewer`}>360 View</a>
            </div>
          )}
        </div>
      </div>
      <div className="col-md-12 col-lg-2">
        <div className="slider slider-nav">
          <Slider ref={navSliderRef} {...navSettings}>
            {navSlides.map((slide, index) => (
              <div
                key={index}
                onClick={() => {
                  if (mainSliderRef.current) {
                    const currentIndex =
                      mainSliderRef.current.innerSlider.state.currentSlide;
                    if (currentIndex !== index) {
                      mainSliderRef.current.slickGoTo(index);
                    }
                  }
                }}
              >
                {slide}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default ProductSlider;
