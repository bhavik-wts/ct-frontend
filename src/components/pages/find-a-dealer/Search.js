"use client";
import React, { useState } from "react";

const Search = ({ onSearch, placeholder = "Search" }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Call the onSearch prop with the new search term
  };

  return (
    <div className="filter-search position-relative">
      <input
        id="search-bar"
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange} // Handle input changes
      />
      <img
        src="/images/search.svg"
        alt="search quest"
        className="search-icon"
      />
    </div>
  );
};

export default Search;
