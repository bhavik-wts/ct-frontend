"use client";
import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PrevArrow, NextArrow } from "./CustomArrows";

const HeroSlider = ({ mainSlidesData, navSlidesData }) => {
  const [mainSlider, setMainSlider] = useState(null);
  const [navSlider, setNavSlider] = useState(null);

  const mainSliderRef = useRef(null);
  const navSliderRef = useRef(null);
  // console.log("mainSlides", mainSlidesData);
  useEffect(() => {
    if (mainSliderRef.current && navSliderRef.current) {
      setMainSlider(mainSliderRef.current);
      setNavSlider(navSliderRef.current);
    }
  }, [mainSliderRef, navSliderRef]);

  const mainSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true, // Use fade for a smoother transition
    prevArrow: <PrevArrow className="prev-slick-slider" />,
    nextArrow: <NextArrow className="next-slick-slider" />,
    asNavFor: navSlider,
  };

  const navSettings = {
    slidesToShow: Math.min(4, navSlidesData.length), // Show 3 navigation slides
    slidesToScroll: 1,
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    vertical: true, // Keep vertical for nav slides
    // centerPadding: '25px',
    arrows: false,
    asNavFor: mainSlider,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          vertical: false,
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
    <div className="row">
      <div className="col-md-12 col-lg-9">
        <div className="slider">
          <Slider {...mainSettings} ref={mainSliderRef}>
            {mainSlidesData.map((slidedata, index) => (
              <div className="slider-for-image" key={index}>
                <img
                  src={
                    process.env.NEXT_PUBLIC_STRAPI_URL +
                    slidedata.slide.data.attributes.url
                  } // Ensure slide.url is correct
                  alt={name}
                  className="img-fluid mx-auto"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="col-md-12 col-lg-3">
        <div className="slider slider-nav">
          <Slider {...navSettings} ref={navSliderRef}>
            {navSlidesData.map((slideData, index) => (
              <div className="slick-nav" key={index}>
                {/* {console.log("slide url", slideData)} */}
                <img
                  src={
                    process.env.NEXT_PUBLIC_STRAPI_URL +
                    slideData.slide.data.attributes.url
                  } // Assuming slide has a url property
                  alt={name}
                  className="img-fluid"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
