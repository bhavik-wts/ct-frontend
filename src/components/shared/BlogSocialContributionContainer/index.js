"use client";

import React, { useEffect, useState } from "react";
import CommonCard from "../BlogSocialContributionCard";
import SearchBar from "../SearchBar";

const ContributionContainer = ({ isBlogPage, data }) => {
  useEffect(() => {
    setFilteredResults(data);
  }, []);

  const [filteredResults, setFilteredResults] = useState([]);

  return (
    <>
      <section
        className={`py-80 bg-white ${isBlogPage ? "blog" : "contribution"}`}
      >
        <div className="container">
          <div className="social-wrapper mt-0">
            <SearchBar
              count={filteredResults.length}
              allData={data}
              setFilteredResults={setFilteredResults}
            />
            <div className="row g-4">
              {filteredResults.length === 0 ? (
                <p className="no-record-found">No Record Found</p> // Display message if no blogs are found
              ) : (
                filteredResults.map((socialContribution, index) => (
                  <>
                    <div className="col-md-6 col-lg-4" key={index}>
                      <CommonCard
                        isContribution={!isBlogPage}
                        data={socialContribution}
                      />
                    </div>
                  </>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContributionContainer;
