import ImageSlider from "@/components/pages/Careers/ImageSlider";
import EventInfo from "@/components/pages/eventDetails/EventInfo";
import OtherEventsContainer from "@/components/pages/eventDetails/OtherEventsContainer";
import Banner from "@/components/shared/Banner";
import ContentRenderer from "@/components/shared/ContentRenderer";
import RecentPostContainer from "@/components/shared/RecentPostContainer";

import { GET_EVENT_DETAIL_PAGE_DATA } from "@/graphql/queries/events-details"; // Existing query
import { fetchData } from "@/lib/graphql-operations";

export const metadata = {
  title: "Event Details",
  description: "Event details",
};

const Page = async ({ params }) => {
  const { slug } = params; // Get the slug from params

  // Fetch data for blog details
  const graphqlDetailData = await fetchData(GET_EVENT_DETAIL_PAGE_DATA, {
    slug,
  });
  const bannerData = graphqlDetailData.pages.data[0].attributes.blocks[0];
  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData;

  // Create a new updatedBreadcrum array
  const slugLink = `/events/${slug}`; // Create the new link using the slug
  const updatedBreadcrum = breadcrums.map((item, index) => {
    if (index === breadcrums.length - 1) {
      return { ...item, link: slugLink }; // Update the last breadcrumb's link
    }
    return item; // Return unchanged breadcrumb
  });

  const gallaryData = graphqlDetailData.pages.data[0].attributes.blocks[1];
  const {
    toptitle,
    maintitle,
    LifeSliderDetails: gallarySliderData,
  } = gallaryData;

  const recentEventsData = graphqlDetailData.recentEvents.data;

  const eventDetails = graphqlDetailData.eventBySlug.data;

  const {
    Title: eventTitle,
    Image: featuredImage,
    startdate: startDate,
    enddate: endDate,
    venue,
    content,
    publishedAt,
  } = eventDetails[0].attributes;

  // console.log("recent", recentEventsData);

  return (
    <>
      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={updatedBreadcrum}
      />
      <section className="blog-details py-80">
        <div className="container">
          <div className=" mt-0">
            <div className="row g-4">
              <ContentRenderer
                gallaryData={gallaryData}
                isBlogPage={false}
                title={eventTitle}
                date={publishedAt}
                image={featuredImage}
                content={content}
              />
              <div className="col-md-12 col-lg-4">
                <div className="sticky-point">
                  {recentEventsData && recentEventsData.length > 0 && (
                    <>
                      <OtherEventsContainer data={recentEventsData} />
                    </>
                  )}
                  <EventInfo
                    startDate={startDate}
                    endDate={endDate}
                    title={eventTitle}
                    image={featuredImage}
                    venue={venue}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ImageSlider
        topTitle={toptitle}
        mainHeading={maintitle}
        data={gallarySliderData}
      />
    </>
  );
};

export default Page;
