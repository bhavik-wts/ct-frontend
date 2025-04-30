import Link from "next/link";
import React from "react";

const QuickLinksMenu = ({ data }) => {
  return (
    <>
      <div className="col-md-12 col-lg-3">
        <div className="footer-block">
          <span>{data.title}</span>
          <ul>
            {data.pageLink &&
              data.pageLink.map((link) => (
                <li key={link.id}>
                  <Link href={link.link}>{link.title}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default QuickLinksMenu;
