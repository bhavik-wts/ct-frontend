'use client'
import VideoModal from "@/components/shared/VideoModal";
import React, { useState, useEffect } from "react"; // Added useEffect import

const IntegratedSection = ({ data }) => {
    const { topTitle,
        title,
        description,
        posterImage,
        mediaFile } = data

    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    const handleOpenModal = () => setIsModalOpen(true); // Function to open modal
    const handleCloseModal = () => setIsModalOpen(false); // Function to close modal

    const posterUrl = process.env.NEXT_PUBLIC_STRAPI_URL + posterImage.data.attributes.url;
    const posterAlt = process.env.NEXT_PUBLIC_STRAPI_URL + posterImage.data.attributes.name;
    const videoUrl = process.env.NEXT_PUBLIC_STRAPI_URL + mediaFile.data.attributes.url;


    return (
        <>
            <section className="integrated py-80">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-12 col-lg-5">
                            <div className="section-title">
                                <img src="images/number-one.svg" alt="one-badge" className="mb-20" />
                                <h3>{topTitle}</h3>
                                <h2>{title}</h2>
                                <p>{description}</p>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-7">
                            <div className="video-block">
                                <img src={posterUrl} alt={posterAlt} className="img-fluid" />
                                <div className="video-play-button">
                                    <button onClick={handleOpenModal}> {/* Added onClick to open modal */}
                                        <svg width="21" height="26" viewBox="0 0 21 26" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M2.42633 25.3011L19.9263 14.0511C20.2828 13.8215 20.5 13.4248 20.5 13C20.5 12.5752 20.2828 12.1784 19.9263 11.949L2.42633 0.698957C2.04301 0.448644 1.54742 0.435284 1.15191 0.652549C0.749024 0.872276 0.5 1.29228 0.5 1.75001V24.25C0.5 24.7077 0.749024 25.1277 1.15191 25.3475C1.33742 25.4487 1.54496 25.5 1.75004 25.5C1.98441 25.5 2.22125 25.4341 2.42633 25.3011Z"
                                                fill="#201E1E" />Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                            been the industry&apos;s standard dummy text ever since the 1500s.
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="frame-01">
                    <img src="images/frame_01.svg" alt="frame" />
                </div>
                <div className="frame-02 right-0">
                    <img src="images/frame_02.svg" alt="frame" />
                </div>
            </section>
            <VideoModal videoUrl={videoUrl} handleCloseModal={handleCloseModal} isModalOpen={isModalOpen} />
        </>
    )
}

export default IntegratedSection