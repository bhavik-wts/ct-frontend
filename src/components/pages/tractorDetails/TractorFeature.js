import React from 'react';

const TractorFeature = ({ data }) => {

    // Destructure the necessary properties from the data object
    const { title, description, image } = data;

    // Split the description into an array of items for rendering
    const imgUrl = process.env.NEXT_PUBLIC_STRAPI_URL + image?.data?.attributes?.url
    const descriptionItems = description.split('\n').filter(item => item.trim() !== '');


    return (
        <div className="row g-4">
            <div className="col-md-12 col-lg-6">
                <div className="feature-image">
                    <img
                        src={imgUrl || "/images/feature-image.jpg"} // Fallback image
                        alt={title}
                        className="img-fluid"
                    />
                </div>
            </div>
            <div className="col-md-12 col-lg-6">
                <div className="feature-block">
                    <h4>{title}</h4>
                    <p>{descriptionItems[0]}</p> {/* Display the first line of description separately */}
                    <ul>
                        {descriptionItems.slice(1).map((item, index) => (
                            <li key={index}>
                                <img src="/images/list-correct.svg" alt="correct" />
                                <p>{item}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TractorFeature;