import React from "react";
import Link from "next/link"; // Import Link from Next.js

const OtherSocialContributionsContainer = ({ data }) => {
  return (
    <>
      <div className="sticky-blog-list">
        <h6>Other Social Contributions</h6>
        <hr />
        <div className="blog-list-block">
          {data.map((socialContributions) => (
            <div
              className="d-flex blog-flex"
              key={socialContributions.attributes.slug}
            >
              <Link
                href={`/social-contributions/${
                  socialContributions.attributes.slug
                    ? socialContributions.attributes.slug
                    : ""
                }`}
                className="d-flex text-decoration-none align-items-center"
              >
                {" "}
                {/* Use Link component */}
                <div className="flex-shrink-0 blog-img">
                  <img
                    src={
                      process.env.NEXT_PUBLIC_STRAPI_URL +
                      socialContributions.attributes.image.data.attributes.url
                    }
                    alt={socialContributions.attributes.title}
                    style={{ aspectRatio: "16/9" }}
                  />
                </div>
                <div className="flex-grow-1 ms-3 blog-post-content">
                  <p>{socialContributions.attributes.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OtherSocialContributionsContainer;
