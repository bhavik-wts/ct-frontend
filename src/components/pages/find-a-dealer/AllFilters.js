"use client";
import React from "react";
import FilterDropdown from "./FilterDropdown";

const AllFilters = ({
  onDistrictChange,
  onStateChange,
  onCategoryChange,
  states,
  districts,
  categories,
}) => {
  return (
    <>
      <div className="category">
        <FilterDropdown
          options={Array.from(new Set(states))}
          onItemChange={onStateChange}
          defaultOption="Select State"
        />
        <FilterDropdown
          options={Array.from(new Set(districts))}
          onItemChange={onDistrictChange}
          defaultOption="Select District"
        />
        <FilterDropdown
          options={Array.from(new Set(categories))}
          onItemChange={onCategoryChange}
          defaultOption="Select Category"
        />
      </div>
    </>
  );
};

export default AllFilters;
