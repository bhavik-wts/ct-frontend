"use client";
import React from "react";

const FilterDropdown = ({
  options,
  selectedItem,
  onItemChange,
  defaultOption = "select",
}) => {
  return (
    <>
      <select
        className="form-select"
        aria-label="Filter select"
        value={selectedItem}
        onChange={(e) => onItemChange(e.target.value)} // Call onItemChange when the selection changes
      >
        <option hidden value="">
          {defaultOption}
        </option>{" "}
        {/* Default option */}
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
};

export default FilterDropdown;
