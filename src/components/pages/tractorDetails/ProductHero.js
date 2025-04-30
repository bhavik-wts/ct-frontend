import React from "react";
import ProductSlider from "./ProductSlider";
import ColorThumbs from "./ColorThumbs";
import MainSlide from "./MainSlide";
import NavSildes from "./NavSildes";
import YouTubePlayer from "./YouTubePlayer"; // Import the YouTubePlayer component
import { getYouTubeThumbnail, getYouTubeVideoId } from "@/lib/utils";

const ProductHero = ({
  name,
  description,
  categoryName,
  colorMedia,
  videoLinks,
  tractorSlides,
  slug,
}) => {
  const mainSlides = tractorSlides
    ? tractorSlides.map((tractor) => (
        <>
          <MainSlide
            name={tractor.slide.data.attributes.name}
            url={tractor.slide.data.attributes.url}
          />
        </>
      ))
    : null;

  let allNavSlides = [];

  tractorSlides &&
    tractorSlides.forEach((tractor) => {
      allNavSlides.push({
        name: tractor.slide.data.attributes.name,
        url: tractor.slide.data.attributes.url,
        type: "tractor", // Add type for tractor slides
      });
    });

  // Add video thumbnails to navSlides and mainSlides
  if (videoLinks.length > 0) {
    videoLinks.forEach((video) => {
      const videoUrl = video.youtubevideourl;
      const videoId = getYouTubeVideoId(video.youtubevideourl);
      const thumbnailUrl = getYouTubeThumbnail(videoId);
      allNavSlides.push({
        name: thumbnailUrl,
        url: thumbnailUrl,
        type: "video",
      });
      const videoThumbnail = <YouTubePlayer videoUrl={videoUrl} />;

      mainSlides.push(videoThumbnail);
    });
  }

  const navSlides = allNavSlides.map((slide) => (
    <>
      <NavSildes name={slide.name} url={slide.url} type={slide.type} />
    </>
  ));

  return (
    <>
      <section className="plough-slider-wrapper py-80">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-4">
              <div className="section-title mb-0">
                <h3>{categoryName}</h3>
                <h2>{name}</h2>
              </div>
            </div>
            <div className="col-md-12 col-lg-8">
              <div className="section-title">
                <p>{description}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-2">
              <div className="tractor-thumb">
                {colorMedia.data &&
                  colorMedia.data.length > 0 &&
                  colorMedia.data.map((media) => (
                    <>
                      <ColorThumbs key={media.id} data={media} />
                    </>
                  ))}
              </div>
            </div>
            <ProductSlider
              mainSlides={mainSlides}
              navSlides={navSlides}
              slug={slug}
              category={categoryName}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductHero;
