"use client";
import React from "react";
import AllFilters from "./AllFilters";
import Search from "./Search";

const FilterSearchContainer = ({
  onSearchChange,
  onStateChange,
  onDistrictChange,
  onCategoryChange,
  districts,
  states,
  categories,
}) => {
  return (
    <>
      <div className="col-md-12">
        <div className="dealer-filter">
          <AllFilters
            districts={districts}
            states={states}
            categories={categories}
            onStateChange={onStateChange}
            onDistrictChange={onDistrictChange}
            onCategoryChange={onCategoryChange}
          />
          <Search onSearch={onSearchChange} placeholder="Search Dealer" />
        </div>
      </div>
    </>
  );
};

export default FilterSearchContainer;
