import Link from "next/link";
import React from "react";

const DownloadBanner = ({ toptitle,
  heading,
  description,
  Buttonlabel,
  buttonlink, backgroundimage }) => {

  const url = backgroundimage.data.attributes.url;

  return (
    <>
      <section className="banner download"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_URL + url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <h3>{toptitle}</h3>
                <h1 className="text-white">
                  {heading}
                </h1>
                <p className="text-white opacity-75">
                  {description}
                </p>
                <Link href={buttonlink}>
                  <button className="download-btn">
                    {Buttonlabel}</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DownloadBanner;
