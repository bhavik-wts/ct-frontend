import React from 'react'

const TestimonialCard = ({ data }) => {
    const { name, city, content, Image } = data
    return (
        <>

            <div className="testimonial-wrapper bg-white">
                <div className="row justify-content-center">
                    <div className="col-md-5 col-12">
                        <div className="testimonial-image">
                            <img src={process.env.NEXT_PUBLIC_STRAPI_URL + Image.data.attributes.url} alt={process.env.NEXT_PUBLIC_STRAPI_URL + Image.data.attributes.name} />
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="quote-left">
                            <img src="/images/quote-left.svg" alt="quote" />
                        </div>

                        <div className="testimonial-scroll">
                            <p>{content}</p>
                        </div>

                        <div className="testimonial-footer">
                            <div>
                                <h6>{name}</h6>
                                <span>{city}</span>
                            </div>

                            <div className="quote-right text-end">
                                <img src="/images/quote-right.svg" alt="quote" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>)
}

export default TestimonialCard