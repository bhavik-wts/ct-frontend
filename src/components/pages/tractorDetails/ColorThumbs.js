import React from 'react'

const ColorThumbs = ({ data }) => {
    const imgUrl = process.env.NEXT_PUBLIC_STRAPI_URL + data?.attributes?.url

    return (
        <div className="slick-nav position-relative">
            <img
                src={imgUrl || "/images/tractor-thumb-1.png"}
                alt="slider"
                className="img-fluid"
            />
        </div>)
}

export default ColorThumbs