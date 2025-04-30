import React from "react";
import parse from "html-react-parser";

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  // Add suffix for the day
  const suffix = day % 10 === 1 && day !== 11 ? 'st' :
    day % 10 === 2 && day !== 12 ? 'nd' :
      day % 10 === 3 && day !== 13 ? 'rd' : 'th';

  return `${day}${suffix} ${month}, ${year}`;
};

const EventCard = ({ isLeft, data }) => {
  const { Title, startdate, enddate, Image, content } = data.attributes;

  const startDate = formatDate(startdate);
  const endDate = formatDate(enddate);
  const displayDate = startDate === endDate ? startDate : `${startDate} to ${endDate}`;

  return (
    <>
      <section className="event-listing mt-130">
        <div className="container">
          <div className="row align-items-center g-4 g-md-5">
            {isLeft ? (
              <>
                <div className="col-md-12 col-lg-6">
                  <div className="event-listing-image position-relative">
                    <img
                      src={process.env.NEXT_PUBLIC_STRAPI_URL + Image.data.attributes.url}
                      alt="event"
                      className="img-fluid"
                    />
                    <div className="top-pattern">
                      <img src="images/frame-blue-pattern.svg" alt="pattern" />
                    </div>
                    <div className="bottom-pattern">
                      <img
                        src="images/event-orange-pattern.svg"
                        alt="pattern"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="section-title">
                    <h3 className="display-date">{displayDate}</h3>
                    <h2>{Title}</h2>
                    <div className="content-limit">{parse(content)}</div>
                    <a href={`events/${data.attributes.slug}`}>Know More</a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-md-12 col-lg-6">
                  <div className="section-title">
                    <h3 className="display-date">{displayDate}</h3>
                    <h2>{Title}</h2>
                    <div className="content-limit">{parse(content)}</div>
                    <a href={`events/${data.attributes.slug}`}>Know More</a>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="event-listing-image position-relative">
                    <img
                      src={process.env.NEXT_PUBLIC_STRAPI_URL + Image.data.attributes.url}
                      alt="event"
                      className="img-fluid"
                    />
                    <div className="top-pattern">
                      <img src="images/frame-blue-pattern.svg" alt="pattern" />
                    </div>
                    <div className="bottom-pattern">
                      <img
                        src="images/event-orange-pattern.svg"
                        alt="pattern"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default EventCard;
