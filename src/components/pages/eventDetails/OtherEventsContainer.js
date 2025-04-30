import React from "react";
import Link from 'next/link'; // Import Link from Next.js

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const date = new Date(dateString);
  const day = date.getDate();
  const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
  return `${day}${suffix} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`;
};

const OtherEventsContainer = ({ data }) => {
  return (
    <>
      <div className="sticky-blog-list">
        <h6>Other Events</h6>
        <hr />
        <div className="blog-list-block">
          {data.map(event => (
            <div className="d-flex blog-flex" key={event.attributes.slug}>
              <Link href={`/events/${event.attributes.slug ? event.attributes.slug : ""}`} className="d-flex text-decoration-none align-items-center"> {/* Use Link component */}
                <div className="flex-shrink-0 blog-img">
                  <img src={process.env.NEXT_PUBLIC_STRAPI_URL + event.attributes.Image.data.attributes.url} alt={event.attributes.Title} />
                </div>
                <div className="flex-grow-1 ms-3 blog-post-content">
                  <span>{formatDate(event.attributes.startdate)} to {formatDate(event.attributes.enddate)}</span>
                  <p>{event.attributes.Title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OtherEventsContainer;
