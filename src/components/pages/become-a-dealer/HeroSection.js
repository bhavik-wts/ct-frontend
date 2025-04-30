"use client";
import React, { useState, useEffect } from "react"; // Added useEffect import
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import { Modal } from "react-bootstrap"; // Import Bootstrap Modal
import ReactHtmlParser from "html-react-parser"; // Import the parser
import VideoModal from "@/components/shared/VideoModal";

const HeroSection = ({ title, heading, video, posterImage, description }) => {
  const [parsedDescription, setParsedDescription] = useState(""); // State for parsed description
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const posterImageUrl = posterImage.data.attributes.url;
  const videoUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL + video.data.attributes.url;

  useEffect(() => {
    setParsedDescription(ReactHtmlParser(description)); // Parse HTML description safely on client side
  }, [description]);

  const handlePlayButtonClick = () => {
    setIsModalOpen(true); // Open modal on button click
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <>
      <section className="milstobne-video py-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="section-title text-center mb-4">
                <h3>{title}</h3>
                <h2>{heading}</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-10">
              <div className="milestone-video-block">
                <img
                  src={process.env.NEXT_PUBLIC_STRAPI_URL + posterImageUrl}
                  alt="history"
                  className="img-fluid border-0"
                />
                <div className="video-play-button">
                  <button onClick={handlePlayButtonClick}>
                    {" "}
                    {/* Updated to handle click */}
                    <svg
                      width="21"
                      height="26"
                      viewBox="0 0 21 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.42633 25.3011L19.9263 14.0511C20.2828 13.8215 20.5 13.4248 20.5 13C20.5 12.5752 20.2828 12.1784 19.9263 11.949L2.42633 0.698957C2.04301 0.448644 1.54742 0.435284 1.15191 0.652549C0.749024 0.872276 0.5 1.29228 0.5 1.75001V24.25C0.5 24.7077 0.749024 25.1277 1.15191 25.3475C1.33742 25.4487 1.54496 25.5 1.75004 25.5C1.98441 25.5 2.22125 25.4341 2.42633 25.3011Z"
                        fill="#201E1E"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="milstone-video-content">
                <p>{parsedDescription}</p> {/* Render parsed description */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <VideoModal
        videoUrl={videoUrl}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default HeroSection;
