"use client";
import EventCard from "@/components/pages/events/EventCard";
import Banner from "@/components/shared/Banner";
import React, { useState, useEffect } from "react";
import { GET_EVENT_LISTING_DATA } from "@/graphql/queries/event-listing";
import { fetchData } from "@/lib/graphql-operations";
import { GET_ALL_EVENTS } from "@/graphql/queries/get-all-events";
import SearchFilterContainer from "@/components/pages/Careers/SearchFilterContainer";
import Loading from "@/app/(do-not-follow-layout)/[slug]/viewer/loading";

// New async function for data fetching
const fetchEventData = async () => {
  const graphqlData = await fetchData(GET_EVENT_LISTING_DATA);
  const allEventsData = await fetchData(GET_ALL_EVENTS);
  return {
    bannerData: graphqlData.pages.data[0].attributes.blocks[0],
    eventsData: allEventsData.event.data,
  };
};

const Page = () => {
  const [bannerData, setBannerData] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      const { bannerData, eventsData } = await fetchEventData();
      setBannerData(bannerData);
      setEventsData(eventsData);
      setFilteredEvents(eventsData); // Initialize filteredEvents with all events
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSearch = (term, selectedYear) => {
    setSearchTerm(term); // Update the search term state
    const filtered = eventsData.filter((event) => {
      const matchesSearch = event.attributes.Title.toLowerCase().includes(
        term.toLowerCase()
      );
      const matchesYear = selectedYear
        ? new Date(event.attributes.startdate).getFullYear().toString() ===
          selectedYear
        : true;
      return matchesSearch && matchesYear; // Filter based on both search term and year
    });
    setFilteredEvents(filtered); // Update filtered events based on search term and year
  };

  // Provide default values to avoid destructuring errors
  const {
    subText = "",
    headingAlias: commonBannerHeading = "",
    coverImage = "",
    breadcrums = [],
  } = bannerData || {};

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Banner
            subText={subText}
            heading={commonBannerHeading}
            coverImage={coverImage}
            breadcrums={breadcrums}
          />
          <div style={{ minHeight: "600px" }}>
            <SearchFilterContainer
              count={filteredEvents.length}
              onSearch={handleSearch}
              isCareer={false}
              allData={eventsData}
              defaultOption="Select Year"
              placeholder="Search Event"
            />

            {filteredEvents.length === 0 ? (
              <div className="container">
                <p className="no-record-found">No Record Found</p>
              </div>
            ) : (
              filteredEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  data={event}
                  isLeft={index % 2 === 0}
                />
              ))
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Page;
