import Link from "next/link";
import React from "react";

const ImplementsListings = ({
  sectionHeading,
  implementCategories,
  implementsNames,
}) => {
  const categoryTitle = implementCategories.title;
  const allCategories = implementCategories.implement_categories.data;

  const implementTitle = implementsNames.title;
  const allImplements = implementsNames.implements.data;

  // Function to chunk the implements into groups of 12
  const chunkImplements = (implement, chunkSize = 12) => {
    const chunks = [];
    for (let i = 0; i < implement.length; i += chunkSize) {
      chunks.push(implement.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const implementChunks = chunkImplements(allImplements);

  return (
    <>
      <div className="col-md-12 col-xl-8">
        <h6>{sectionHeading}</h6>
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <span>{categoryTitle}</span>
            <ul>
              {allCategories.map((category) => (
                <li key={category.attributes.slug}>
                  <Link href={category.attributes.link}>{category.attributes.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          {implementChunks.map((chunk, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              {index === 0 && <span>{implementTitle}</span>}
              <ul>
                {chunk.map((implement) => (
                  <li key={implement.attributes.slug}>
                    <Link href={`/implements/${implement.attributes.slug ? implement.attributes.slug : ""}`}>{implement.attributes.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImplementsListings;
