import React from "react";

const DealerCard = ({ data }) => {
  return (
    <>
      <div className="col-md-6 col-lg-4">
        <div className="dealer-block">
          <div className="dealer-title">
            <span className="dealer-icon">
              <img src="/images/home.svg" alt="home" />
            </span>
            <div className="dealer-name">
              <h6>{data.attributes.Title}</h6>
              <span>
                {data.attributes.District}, {data.attributes.State}
              </span>
            </div>
          </div>
          <hr />
          <div className="dealer-flex">
            <img src="/images/location.svg" alt="location" />
            <p>{data.attributes.Address}</p>
          </div>
          <div className="dealer-flex">
            <img src="/images/mail.svg" alt="mail" />
            <a href="mailto:khana3964@gmail.com">{data.attributes.Email}</a>
          </div>
          <div className="dealer-flex">
            <img src="/images/call.svg" alt="call" />
            <a href="tel:+918866955996">{data.attributes.mobileNumber}</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealerCard;
