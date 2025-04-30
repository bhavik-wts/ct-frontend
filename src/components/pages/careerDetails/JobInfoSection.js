import React from "react";

const JobInfoSection = ({ title, list }) => {
  // console.log("title", title);
  // console.log("list", list);

  return (
    <div className="col-md-4">
      <div className="jd-block">
        <span>{title}</span>

        <ul>{list && list.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </div>
  );
};

export default JobInfoSection;
