"use client";

import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'; // Import dynamic for lazy loading

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import HeroSlide from "./HeroSlide";

// Dynamically import OwlCarousel, disabling SSR
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false
});

const HeroSectionSlider = ({ data }) => {
    const options = {
        loop: true,
        autoplay: true,
        margin: 0,
        dots: true,
        nav: false,
        items: 1,
        autoplayTimeout: 3000,
        smartSpeed: 1000,
        responsive: {
            0: { items: 1 },
            380: { items: 1 },
            600: { items: 1 },
        },
    };

    return (
        <section className="hero">
            {/* OwlCarousel only renders on the client */}
            <OwlCarousel className="hero-slider-images owl-carousel owl-theme hero-slider" {...options}>
                {data && data.map((slide, index) => (
                    <HeroSlide
                        key={index}
                        banner={slide.banner}
                        bannerMobile={slide.bannerMobile}
                        topTitle={slide.topTitle}
                        title={slide.title}
                        description={slide.description}
                        buttonLink={slide.buttonLink}
                        buttonLabel={slide.buttonLabel}
                    />
                ))}
            </OwlCarousel>
        </section>
    );
};

export default HeroSectionSlider;
