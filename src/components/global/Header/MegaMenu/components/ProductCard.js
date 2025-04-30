import React from 'react'

const ProductCard = ({ data, selectedItem, onSelect, type }) => {
    const imgUrl = process.env.NEXT_PUBLIC_STRAPI_URL + data?.attributes?.slideMainimage?.data?.attributes?.url
    const isCurrentTractorSelected = selectedItem.attributes.slug === data.attributes.slug;
    return (
        <div className={`tractor-thumb-menu ${isCurrentTractorSelected ? "active" : ""}`} style={{ cursor: "pointer" }} onClick={() => onSelect(data)}>
            <div className="thumb-image">
                <img
                    src={imgUrl}
                    alt={data?.attributes?.name || "tractor"}
                    className="img-fluid"
                />
            </div>
            <div className="tractor-content">
                <h6>{data?.attributes?.name || "Tractor Name"}</h6>
                {type === "tractor" &&
                    <span>{data?.attributes?.tractorType || "Tractor Type"}</span>
                }
            </div>
            <div className={`check-status ${isCurrentTractorSelected ? "d-block" : ""}`}>
                <img src="/images/check-fill.png" alt="check" />
            </div>
        </div>
    );
}

export default ProductCard;