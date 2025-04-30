import React, { useState, useEffect } from "react";
import Search from "../find-a-dealer/Search";
import FilterDropdown from "../find-a-dealer/FilterDropdown";

const SearchFilterContainer = ({
  onSearch,
  count,
  allData,
  isCareer,
  defaultOption,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    if (isCareer) {
      // Extract unique cities from allData
      const uniqueCities = [
        ...new Set(
          allData.map((job) => job.attributes.city).filter((city) => city)
        ),
      ]; // Ensure no empty cities
      setFilterOptions(uniqueCities);
    } else {
      // Extract unique years from eventsData
      const uniqueYears = [
        ...new Set(
          allData
            .map((event) => {
              const startTime = new Date(event.attributes.startdate);
              return !isNaN(startTime) ? startTime.getFullYear() : null; // Check for valid date
            })
            .filter((year) => year !== null)
        ),
      ]; // Filter out invalid years
      setFilterOptions(uniqueYears);
    }
  }, [allData, isCareer]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    onSearch(term, selectedFilter); // Pass the search term and selected filter to the parent component
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onSearch(searchTerm, filter); // Pass the search term and selected filter to the parent component
  };

  return (
    <div className="container pt-4">
      <div className="blog-filter-wrapper">
        <span>Showing {count} results</span>
        <div className="search-block">
          <Search onSearch={handleSearch} placeholder={placeholder} />
          <FilterDropdown
            options={filterOptions}
            selectedItem={selectedFilter}
            onItemChange={handleFilterChange}
            defaultOption={defaultOption}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilterContainer;
