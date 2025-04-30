import Link from 'next/link';
import React from 'react'

const HeroSlide = ({ banner, topTitle, title, description, buttonLink, buttonLabel, bannerMobile }) => {
    console.log("banner in", bannerMobile);
    const imgUrl = process.env.NEXT_PUBLIC_STRAPI_URL + banner.data.attributes.url;
    const imgMobileUrl = process.env.NEXT_PUBLIC_STRAPI_URL + bannerMobile.data.attributes.url;

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <div className="slider-one">
                            <picture>
                                <source media="(max-width: 768px)" srcSet={imgMobileUrl} />
                                <img src={imgUrl} alt="hero" />
                            </picture>
                            <div className="section-title">
                                {topTitle && (
                                    <h3>{topTitle}</h3>
                                )}
                                {title && (
                                    <h1 className="text-white">{title}</h1>
                                )}
                                {description && (
                                    <p className="text-white opacity-75">{description}</p>
                                )}
                                {buttonLabel && (
                                    <Link href={buttonLink ? buttonLink : "/"}>{buttonLabel}</Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSlide