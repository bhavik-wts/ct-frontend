import React from "react";

const InternationalDetails = ({
  sectionTitle,
  officeTitle,
  officeCity,
  companyName,
  address,
  email,
  phone,
}) => {
  return (
    <section className="dealer-wrapper py-80 contact">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-title">
              <h2>{sectionTitle}</h2> {/* Updated to use sectionTitle prop */}
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="dealer-block h-100">
              <div className="dealer-title">
                <span className="dealer-icon">
                  <img src="images/exports.svg" alt="home" />
                </span>
                <div className="dealer-name">
                  <h6 className="text-capitalize">{officeTitle}</h6>{" "}
                  {/* Updated to use officeTitle prop */}
                  <span>{officeCity}</span>{" "}
                  {/* Updated to use officeCity prop */}
                </div>
              </div>
              <hr />
              <div className="dealer-flex">
                <img src="images/location.svg" alt="location" />
                <a
                  href="https://maps.app.goo.gl/et3ERHRN22bTT3a1A"
                  target="_blank"
                >
                  <b>{companyName}</b> {/* Updated to use companyName prop */}
                  <br />
                  {address} {/* Updated to use address prop */}
                </a>
              </div>
              <div className="dealer-flex">
                <img src="images/mail.svg" alt="mail" />
                <a href={`mailto:${email}`}>{email}</a>{" "}
                {/* Updated to use email prop */}
              </div>
              <div className="dealer-flex">
                <img src="images/call.svg" alt="call" />
                <div>
                  <a
                    href={`tel:${phone.replace(
                      "(for INTERNATIONAL Sales)",
                      ""
                    )}`}
                  >
                    {phone.replace("(for INTERNATIONAL Sales)", "")}
                  </a>
                  (for INTERNATIONAL Sales) {/* Updated to use phone prop */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternationalDetails;
