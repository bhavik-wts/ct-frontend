import React from "react";
import ReactHtmlParser from "html-react-parser"; // Import the parser

const index = ({ title, image, date, content, isBlogPage }) => {
  const updatedContent = content.replaceAll(
    "http://localhost:1337",
    process.env.NEXT_PUBLIC_STRAPI_URL
  );
  return (
    <>
      <div className={isBlogPage ? "w-100" : "col-md-12 col-lg-8"}>
        <div className="blog-detail-wrapper">
          {image && (
            <img
              src={
                process.env.NEXT_PUBLIC_STRAPI_URL + image.data.attributes.url
              }
              className="w-100"
              alt={image.data.attributes.name}
            />
          )}
          <br />
          {isBlogPage && <span>{date}</span>}
          <h2>{title}</h2>
          <hr />
          <div>
            {ReactHtmlParser(updatedContent)}{" "}
            {/* Parse and render HTML content */}
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
