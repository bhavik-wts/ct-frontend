"use client";
import React, { useEffect, useState } from "react";
import Banner from "@/components/shared/Banner";
import FilterSearchContainer from "@/components/pages/find-a-dealer/FilterSearchContainer";
import DealerContainer from "@/components/pages/find-a-dealer/DealerContainer";
import { fetchData } from "@/lib/graphql-operations";
import { GET_FIND_A_DEALER_DATA } from "@/graphql/queries/find-a-dealer";
import { GET_ALL_DEALERS } from "@/graphql/queries/get-all-dealers";

const Page = () => {
  // banner data
  const [subText, setSubText] = useState("");
  const [heading, setHeading] = useState("");
  const [coverImage, setCoverImage] = useState([]);
  const [breadcrums, setBreadcrums] = useState([]);

  // dealer data
  const [dealers, setDealers] = useState([]);
  const [allDealers, setAllDealers] = useState([]);

  // filters data
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [currentState, setCurrentState] = useState("");
  const [currentDistrict, setCurrentDistrict] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    fetchData(GET_ALL_DEALERS).then((data) => {
      setAllDealers(data.dealers.data);
      setDealers(data.dealers.data);
    });

    fetchData(GET_FIND_A_DEALER_DATA).then((data) => {
      const bannerData = data.pages.data[0].attributes.blocks[0];

      setHeading(bannerData.headingAlias);
      setSubText(bannerData.subText);
      setCoverImage(bannerData.coverImage);
      setBreadcrums(bannerData.breadcrums);
    });
  }, []);

  useEffect(() => {
    const filteredDealers = applyFilters(allDealers);
    setDealers(filteredDealers);
  }, [currentDistrict, currentState, currentCategory, allDealers]);

  for (let tempDealer of allDealers) {
    const district = tempDealer.attributes.District;
    const state = tempDealer.attributes.State;
    const category = tempDealer.attributes.Category;

    if (!districts.includes(district)) {
      setDistricts((districts) => [...districts, district]);
    }

    if (!states.includes(state)) {
      setStates((states) => [...states, state]);
    }

    if (!categories.includes(category)) {
      setCategories((categories) => [...categories, category]);
    }
  }

  const applyFilters = (dealers) => {
    let filteredDealers = [...dealers]; // Copy array to avoid modifying original

    if (currentDistrict !== "") {
      filteredDealers = filteredDealers.filter(
        (dealer) => dealer.attributes.District === currentDistrict
      );
    }

    if (currentState !== "") {
      filteredDealers = filteredDealers.filter(
        (dealer) => dealer.attributes.State === currentState
      );
    }

    if (currentCategory !== "") {
      filteredDealers = filteredDealers.filter(
        (dealer) => dealer.attributes.Category === currentCategory
      );
    }

    return filteredDealers;
  };

  const onDistrictChange = (value) => {
    setCurrentDistrict(value);
    handleFilterChange();
  };

  const onStateChange = (value) => {
    setCurrentState(value);
    handleFilterChange();
  };

  const onCategoryChange = (value) => {
    setCurrentCategory(value);
    handleFilterChange();
  };

  const handleFilterChange = () => {
    let tempDealers = allDealers;

    if (currentDistrict != "") {
      for (let tempDealer of tempDealers) {
        if (tempDealer.attributes.District != currentDistrict) {
          tempDealers = tempDealers.filter((item) => item != tempDealer);
        }
      }
    }

    if (currentState != "") {
      for (let tempDealer of tempDealers) {
        if (tempDealer.attributes.State != currentState) {
          tempDealers = tempDealers.filter((item) => item != tempDealer);
        }
      }
    }

    if (currentCategory != "") {
      for (let tempDealer of tempDealers) {
        if (tempDealer.attributes.Category != currentCategory) {
          tempDealers = tempDealers.filter((item) => item != tempDealer);
        }
      }
    }

    setDealers(tempDealers);
  };

  const onSearchChange = () => {
    const searchValue = document.getElementById("search-bar").value;

    let tempDealers = dealers;

    if (searchValue != "") {
      for (let dealer of tempDealers) {
        if (
          dealer.attributes.Title.toLowerCase().includes(
            searchValue.toLowerCase()
          )
        ) {
          tempDealers = tempDealers.filter((d) => d == dealer);
        } else {
          tempDealers = tempDealers.filter((d) => d != dealer);
        }
      }

      handleFilterChange();
      setDealers(tempDealers);
    } else {
      setDealers(allDealers);
      handleFilterChange();
    }
  };

  return (
    <>
      <Banner
        subText={subText}
        heading={heading}
        coverImage={coverImage}
        breadcrums={breadcrums}
      />
      <section className="dealer-wrapper py-80">
        <div className="container">
          <FilterSearchContainer
            districts={districts}
            states={states}
            categories={categories}
            onSearchChange={onSearchChange}
            onDistrictChange={onDistrictChange}
            onStateChange={onStateChange}
            onCategoryChange={onCategoryChange}
          />
          <DealerContainer data={dealers} />
        </div>
      </section>
    </>
  );
};

export default Page;
