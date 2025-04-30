"use client";

import React, { useState } from "react";
import JobListingContainer from "./JobListingContainer";
import SearchFilterContainer from "./SearchFilterContainer";

const JobListing = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(null);
  const [selectedCity, setSelectedCity] = useState(""); // State for selected city

  const handleSearch = (term, city) => {
    setSearchTerm(term); // Update the search term state
    setSelectedCity(city); // Update the selected city state
  };

  return (
    <section className="listing-wrapper py-80 job">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="section-title text-center">
              <h3>Dummy Text</h3>
              <h2>Current Openings</h2>
            </div>
          </div>
        </div>
        <SearchFilterContainer
          count={filteredJobs}
          onSearch={handleSearch}
          isCareer={true}
          allData={data}
          placeholder="Search Designation"
          defaultOption="Select Location"
        />
        <JobListingContainer
          data={data}
          searchTerm={searchTerm}
          selectedCity={selectedCity} // Pass selected city to JobListingContainer
          setFilteredJobs={setFilteredJobs}
        />
      </div>
    </section>
  );
};

export default JobListing;
