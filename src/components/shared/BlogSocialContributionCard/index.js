import React from "react";
import parse from "html-react-parser"; // Import html-react-parser

// Function to extract text from parsed HTML
const extractTextFromHTML = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html; // Set the HTML content
  return tempDiv.innerText; // Return the text content
};

const CommonCard = ({ isSlider, isContribution, data }) => {
  let allData = data.attributes;
  console.log(allData);
  const { title, content, image, slug, publishedAt } = allData;
  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  console.log(content);
  return (
    <>
      <div className={isContribution ? "social-block" : "blog-wrapper"}>
        <div className={isContribution ? "social-image" : "blog-image"}>
          <img
            src={process.env.NEXT_PUBLIC_STRAPI_URL + image.data.attributes.url}
            alt={image.data.attributes.name}
          />
        </div>
        <div className={isContribution ? "social-content" : "blog-content"}>
          {!isContribution && <span>{date}</span>}
          {!isContribution ? <h3>{title}</h3> : <h6>{title}</h6>}
          {!isContribution && (
            <p
              className="mt-2"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
            >
              {extractTextFromHTML(content)} {/* Render only text content */}
            </p>
          )}

          <a
            href={
              isContribution
                ? `/social-contributions/${slug}`
                : `/blogs/${slug}`
            }
          >
            Read More
          </a>
        </div>
      </div>
    </>
  );
};

export default CommonCard;
