'use client'
import React, { useState } from 'react';
import VideoModal from '@/components/shared/VideoModal';

const StoryLine = ({ data }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');

    const handlePlayButtonClick = (url) => {
        setCurrentVideoUrl(url);
        setModalOpen(true);
    };

    return (
        <>
            <section className="story-line py-80">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-12 col-lg-4">
                            <div className="section-title">
                                <h3>{data.storyLineTopTitle}</h3>
                                <h2>{data.storyLineTitle}</h2>
                                <p>{data.storyLineDescription}</p>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-8">
                            <div className="row g-4 g-md-3">
                                {data.storyLineVideos.map((video, index) => (
                                    <div className="col-md-6 col-lg-6" key={index}>
                                        <div className="story-video-wrapper">
                                            <img src={process.env.NEXT_PUBLIC_STRAPI_URL + video.posterImage.data.attributes.url} alt="plant" className="w-100" /> {/* Assuming video object has imageUrl */}
                                            <div className="video-play-button">
                                                <button onClick={() => handlePlayButtonClick(process.env.NEXT_PUBLIC_STRAPI_URL + video.video.data.attributes.url)}>
                                                    <svg width="21" height="26" viewBox="0 0 21 26" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M2.42633 25.3011L19.9263 14.0511C20.2828 13.8215 20.5 13.4248 20.5 13C20.5 12.5752 20.2828 12.1784 19.9263 11.949L2.42633 0.698957C2.04301 0.448644 1.54742 0.435284 1.15191 0.652549C0.749024 0.872276 0.5 1.29228 0.5 1.75001V24.25C0.5 24.7077 0.749024 25.1277 1.15191 25.3475C1.33742 25.4487 1.54496 25.5 1.75004 25.5C1.98441 25.5 2.22125 25.4341 2.42633 25.3011Z"
                                                            fill="#201E1E" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {isModalOpen && (
                <VideoModal
                    videoUrl={currentVideoUrl}
                    handleCloseModal={() => setModalOpen(false)} // Function to close the modal
                    isModalOpen={isModalOpen} // Pass the modal open state
                />
            )}
        </>
    )
}

export default StoryLine