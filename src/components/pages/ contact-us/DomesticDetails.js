import React from 'react'

const DomesticDetails = (
    { mainTitle,
        headOfficeTitle,
        headOfficeCity,
        headOfficeAddress,
        headOfficeEmail,
        headOfficePhone,
        headOfficeMobile,
        registerOfficeTitle,
        registerOfficeCity,
        registerOfficeAddress,
        registerOfficeEmail,
        registerOfficePhone,
        domesticInquiryTitle,
        domesticInquiryPhone,
        supplyChainTitle,
        supplyChainNumber,
        hrEnquiryTitle,
        hrInquiryNumber,
        otherInquiryTitle,
        otherInquiryNumer }

) => {
    return (
        <section className="dealer-wrapper py-80 pb-0 contact">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title">
                            <h2>{mainTitle}</h2>
                        </div>
                    </div>
                </div>
                <div className="row g-4">
                    <div className="col-md-6 col-lg-4">
                        <div className="dealer-block h-100">
                            <div className="dealer-title">
                                <span className="dealer-icon">
                                    <img src="images/home.svg" alt="home" />
                                </span>
                                <div className="dealer-name">
                                    <h6 className="text-capitalize">{headOfficeTitle}</h6>
                                    <span>{headOfficeCity}</span>
                                </div>
                            </div>
                            <hr />
                            <div className="dealer-flex">
                                <img src="images/location.svg" alt="location" />
                                <a href="https://maps.app.goo.gl/gLvaCgk4H4Z8bx1R6" target="_blank">{headOfficeAddress}</a>
                            </div>
                            <div className="dealer-flex">
                                <img src="images/mail.svg" alt="mail" />
                                <a href={`mailto:${headOfficeEmail}`}>{headOfficeEmail}</a>
                            </div>
                            <div className="dealer-flex">
                                <img src="images/call.svg" alt="call" className="mt-1" />
                                <div>
                                    {headOfficePhone.split(',').map((phone, index) => (
                                        <a key={index} href={`tel:${phone.trim()}`}>{phone.trim()}{index < headOfficePhone.split(',').length - 1 ? ',' : ''}</a>
                                    ))}
                                </div>
                            </div>
                            <div className="dealer-flex">
                                <img src="images/mobile.svg" alt="call" className="mt-1" />
                                <div>
                                    {headOfficeMobile.split(',').map((mobile, index) => (
                                        <a key={index} href={`tel:${mobile.trim()}`}>{mobile.trim()}{index < headOfficeMobile.split(',').length - 1 ? ',' : ''}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="dealer-block h-100">
                            <div className="dealer-title">
                                <span className="dealer-icon">
                                    <img src="images/home.svg" alt="home" />
                                </span>
                                <div className="dealer-name">
                                    <h6 className="text-capitalize">{registerOfficeTitle}</h6>
                                    <span>{registerOfficeCity}</span>
                                </div>
                            </div>
                            <hr />
                            <div className="dealer-flex">
                                <img src="images/location.svg" alt="location" />
                                <a href="https://maps.app.goo.gl/et3ERHRN22bTT3a1A" target="_blank">{registerOfficeAddress}</a>
                            </div>
                            <div className="dealer-flex">
                                <img src="images/mail.svg" alt="mail" />
                                <a href="javascript:void(0)">{registerOfficeEmail}</a>
                            </div>
                            <div className="dealer-flex">
                                <img src="images/call.svg" alt="call" />
                                <a href={`tel:${registerOfficePhone}`}>{registerOfficePhone}</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="dealer-block h-100">
                            <div className="dealer-flex">
                                <img src="images/mobile.svg" alt="call" className="mt-1" />
                                <div>
                                    <p className="mb-1">{domesticInquiryTitle}</p>
                                    {domesticInquiryPhone.split(',').map((phone, index) => (
                                        <a key={index} href={`tel:${phone.trim()}`}><b>{phone.trim()}</b>{index < domesticInquiryPhone.split(',').length - 1 ? ',' : ''}</a>
                                    ))}
                                </div>
                            </div>
                            <hr />
                            <div className="dealer-flex">
                                <img src="images/mobile.svg" alt="call" className="mt-1" />
                                <div>
                                    <p className="mb-1">{supplyChainTitle}</p>
                                    <a href={`tel:${supplyChainNumber}`}><b>{supplyChainNumber}</b></a>
                                </div>
                            </div>
                            <hr />
                            <div className="dealer-flex">
                                <img src="images/mobile.svg" alt="call" className="mt-1" />
                                <div>
                                    <p className="mb-1">{hrEnquiryTitle}</p>
                                    <a href={`tel:${hrInquiryNumber}`}><b>{hrInquiryNumber}</b></a>
                                </div>
                            </div>
                            <hr />
                            <div className="dealer-flex">
                                <img src="images/mobile.svg" alt="call" className="mt-1" />
                                <div>
                                    <p className="mb-1">{otherInquiryTitle}</p>
                                    {otherInquiryNumer.split(',').map((number, index) => (
                                        <a key={index} href={`tel:${number.trim()}`}><b>{number.trim()}</b>{index < otherInquiryNumer.split(',').length - 1 ? ',' : ''}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DomesticDetails