"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Banner = ({ subText, heading, coverImage, breadcrums }) => {
  const url = coverImage?.data?.attributes?.url;
  const currentPathName = usePathname();

  return (
    <>
      <section
        className="banner social"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_URL + url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <h3>{subText}</h3>
                <h1 className="text-white">{heading}</h1>
              </div>
              <ul>
                {breadcrums.length > 0 &&
                  breadcrums.map((breadcrum) => (
                    <li key={breadcrum.id}>
                      <Link
                        href={breadcrum.link ? breadcrum.link : ""}
                        className={
                          currentPathName === breadcrum.link ? "active" : ""
                        }
                      >
                        {breadcrum.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
