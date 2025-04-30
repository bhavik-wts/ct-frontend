import React from "react";

const SearchBar = ({ count, allData, setFilteredResults }) => {
  const handleSearch = () => {
    const searchQuery = document
      .getElementById("search-bar")
      .value.toLowerCase();
    if (searchQuery == "") {
      setFilteredResults(allData);
    } else {
      let filteredResults = [];

      for (let data of allData) {
        const title = data.attributes.title.toLowerCase();
        if (title.includes(searchQuery)) filteredResults.push(data);
      }

      setFilteredResults(filteredResults);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="blog-filter-wrapper">
            <span>Showing {count} results</span>

            <div className="filter-search position-relative">
              <input
                type="text"
                id="search-bar"
                className="form-control"
                placeholder="Search"
                onChange={handleSearch}
              />
              <img
                src="images/search.svg"
                alt="search quest"
                className="search-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
