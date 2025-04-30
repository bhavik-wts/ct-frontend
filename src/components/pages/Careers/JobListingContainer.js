import React from "react";
import JobCard from "./JobCard";

const JobListingContainer = ({
  data,
  searchTerm,
  selectedCity,
  setFilteredJobs,
}) => {
  // Filter the job listings based on the search term and selected city
  const filteredData = data.filter((job) => {
    const matchesSearch = job.attributes.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity
      ? job.attributes.city === selectedCity
      : true; // Check if city matches
    return matchesSearch && matchesCity; // Filter based on both search term and city
  });

  setFilteredJobs(filteredData.length); // Update the count of filtered jobs
  return (
    <div className="row g-4">
      {filteredData.length > 0 ? (
        filteredData.map((job) => (
          <JobCard
            data={job}
            key={job.attributes.slug} // Use slug as key
          />
        ))
      ) : (
        <p className="no-record-found">No record found</p>
      )}
    </div>
  );
};

export default JobListingContainer;
