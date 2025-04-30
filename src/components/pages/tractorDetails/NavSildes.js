import React from 'react'

const NavSildes = ({ name, url, type }) => {
    const imgUrl = process.env.NEXT_PUBLIC_STRAPI_URL + url

    return (

        <div className="slick-nav">
            {/* {type === 'video' && <span className="play-icon">▶️</span>} Show play icon for video */}

            <img src={type !== 'video' ? imgUrl : url} alt={name} className="img-fluid" />
        </div>
    )
}

export default NavSildes