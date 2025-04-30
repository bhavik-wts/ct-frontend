import React, { useState } from 'react';

const YouTubePlayer = ({ videoUrl }) => {
    const videoId = videoUrl.split('v=')[1].split('&')[0];
    return (
        <div className="youtube-player">
            <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default YouTubePlayer;
