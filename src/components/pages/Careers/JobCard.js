"use client";
import React from "react";
import Link from "next/link";

const JobCard = ({ data }) => {
  const { title, city, experienceDetail, slug } = data.attributes;

  return (
    <div className="col-md-6 col-lg-4" style={{ cursor: "pointer" }}>
      <Link href={`/careers/${slug}`} className="text-decoration-none">
        <div className="listing-block">
          <span>
            <img src="/images/users.svg" alt="users" />
          </span>
          <div className="listing-content">
            <small>{city}</small>
            <h5>{title}</h5> {/* Changed <a> to <h5> for better semantics */}
            <p>
              <img src="/images/suitcase.svg" alt="experience" />
              {experienceDetail}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default JobCard;
