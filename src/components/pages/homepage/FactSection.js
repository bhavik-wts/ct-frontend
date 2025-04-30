import React from 'react'

const FactSection = ({ topTitle, heading, description, backgroundImage, incorporationText, incorporationSubtext, turnoverText, turnoverSubtext, volumeText, volumeSubtext, researchFacilityText, researchFacilitySubext, countriesText, countriesSubText, dealersText, dealersSubtext, noOfTractorsText, noOfTractorsSubtext, otherFactText, otherFactSubtext
}) => {
    return (
        <>
            <section className="facts py-80" style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_URL + backgroundImage?.data?.attributes?.url})` }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="section-title text-center">
                                <h3>{topTitle}</h3>
                                <h2 className="text-white">{heading}</h2>
                                <p>{description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="facts-list">
                        <div className="row g-4 g-xl-4">
                            <div className="col-sm-6 col-lg-4 col-xl-3">
                                <div className="fact-wrapper">
                                    <span>
                                        <img src="/images/fact_01.svg" alt="fact" />
                                    </span>
                                    <div className="fact-content">
                                        <h6>{incorporationText}</h6>
                                        <p>{incorporationSubtext}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4 col-xl-3">
                                <div className="fact-wrapper">
                                    <span>
                                        <img src="/images/fact_02.svg" alt="fact" />
                                    </span>
                                    <div className="fact-content">
                                        <h6>{turnoverText}</h6>
                                        <p>{turnoverSubtext}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4 col-xl-3">
                                <div className="fact-wrapper">
                                    <span>
                                        <img src="/images/fact_03.svg" alt="fact" />
                                    </span>
                                    <div className="fact-content">
                                        <h6>{volumeText}</h6>
                                        <p>{volumeSubtext}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4 col-xl-3">
                                <div className="fact-wrapper">
                                    <span>
                                        <img src="/images/fact_04.svg" alt="fact" />
                                    </span>
                                    <div className="fact-content">
                                        <h6>{researchFacilityText}</h6>
                                        <p>{researchFacilitySubext}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-4 col-xl-3">
                                <div className="fact-wrapper">
                                    <span>
                                        <img src="/images/fact_05.svg" alt="fact" />
                                    </span>
                                    <div className="fact-content">
                                        <h6>{countriesText}</h6>
                                        <p>{countriesSubText}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4 col-xl-3">
                                <div className="fact-wrapper">
                                    <span>
                                        <img src="/images/fact_06.svg" alt="fact" />
                                    </span>
                                    <div className="fact-content">
                                        <h6>{dealersText}</h6>
                                        <p>{dealersSubtext}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4 col-xl-3">
                                <div className="fact-wrapper">
                                    <span>
                                        <img src="/images/fact_07.svg" alt="fact" />
                                    </span>
                                    <div className="fact-content">
                                        <h6>{noOfTractorsText}</h6>
                                        <p>{noOfTractorsSubtext}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4 col-xl-3">
                                <div className="fact-wrapper">
                                    <span>
                                        <img src="/images/fact_08.svg" alt="fact" />
                                    </span>
                                    <div className="fact-content">
                                        <h6>{otherFactText}</h6>
                                        <p>{otherFactSubtext}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>)
}

export default FactSection
