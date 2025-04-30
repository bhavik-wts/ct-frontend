import FollowOn from "@/components/shared/FollowOn";
import React from "react";

const GetInTouch = ({ heading, contactNoTitle, contactNo, socialLinksData }) => {
  return (
    <>
      <div className="col-md-12 col-lg-5">
        <div className="footer-block">
          <span>{heading}</span>
          <p>{contactNoTitle}</p>
          <a href={`tel:${contactNo}`} className="call">
            {contactNo}
          </a>
          <FollowOn data={socialLinksData} />
        </div>
      </div>
      ;
    </>
  );
};

export default GetInTouch;
