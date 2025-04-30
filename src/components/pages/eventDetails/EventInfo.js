import React from "react";

// Function to format date
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options).replace(/(\d+)(th|st|nd|rd)/, '$1th');
};

// Function to format time
const formatTime = (dateString) => {
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  return new Date(dateString).toLocaleTimeString('en-US', options);
};

const EventInfo = ({ startDate, endDate, title, featuredImage, venue }) => {
  return (
    <>
      <div className="share-blog">
        <h6>Event Info</h6>
        <hr />
        <div className="event-info">
          <span>
            <img src="/images/date-icon.svg" alt="date" />
          </span>
          <div className="event-content">
            <small>Date</small>
            <h6>{formatDate(startDate)}</h6>
          </div>
        </div>
        <div className="event-info">
          <span>
            <img src="/images/time-icon.svg" alt="time" />
          </span>
          <div className="event-content">
            <small>Time</small>
            {/* Display start time in 12-hour format */}
            <h6>{formatTime(startDate)}</h6>
          </div>
        </div>
        <div className="event-info">
          <span>
            <img src="/images/location-pin-icon.svg" alt="location" />
          </span>
          <div className="event-content">
            <small>Venue</small>
            <h6>{venue}</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventInfo;
