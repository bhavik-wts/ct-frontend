import React from "react";

const InternationalDistributorsDealersListing = () => {
  const countries = [
    "Chile",
    "Uruguay",
    "Brazil",
    "Peru",
    "Ecuador",
    "Colombia",
    "El Salvador",
    "Guatemala",
    "Mexico",
    "Portugal",
    "Spain",
    "France",
    "UK",
    "Belgium",
    "Netherlands",
    "Denmark",
    "Germany",
    "Italy",
    "Czech Republic",
    "Hungary",
    "Slovakia",
    "Poland",
    "Lithuania",
    "Latvia",
    "Estonia",
    "Finland",
    "Reunion Island",
    "Sudan",
    "Chad",
    "Ethiopia",
    "Uganda",
    "Kenya",
    "Zimbabwe",
    "South Africa",
    "D. R. Congo",
    "Nigeria",
    "Cote d'Ivoire",
    "Mauritania",
    "Morocco",
    "Tunisia",
    "Kuwait",
    "Saudi Arabia",
    "Bhutan",
    "Myanmar",
    "Thailand",
    "Vietnam",
    "Malaysia",
    "Japan",
  ];

  return (
    <>
      <div className="col-md-12 col-lg-12">
        <div className="domestic-network internationl-network">
          <div className="domestic-header">
            <h6>International Network (Distributors / Dealers)</h6>
          </div>
          <ul>
            {countries.map((country, index) => (
              <li key={index}>
                <img src="/images/location-point.svg" alt="location" />
                <span className="ms-2">{country}</span>
              </li>
            ))}
          </ul>
          <div className="domestic-footer">
            <p>Feel free to connect on Our Toll Free Number</p>
            <a href="tel:+9118002122129">+91 1800 212 212 9</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternationalDistributorsDealersListing;
