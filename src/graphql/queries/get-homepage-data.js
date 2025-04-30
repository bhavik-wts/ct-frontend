import { gql } from "@apollo/client";

export const GET_HOME_PAGE_DATA = gql`
  query {
  pages(filters: { slug: { eq: "home" } }) {
    data {
      attributes {
        Name
        slug
        Seo {
          metaTitle
          metaDescription
          metaImage {
            data {
              attributes {
                name
                alternativeText
                width
                height
                formats
              }
            }
          }
        }
        blocks {
          ... on ComponentBlockHeroSlider {
            SlideInfo {
              banner {
                data {
                  attributes {
                    name
                    url
                  }
                }
              }
              bannerMobile {
                data{
                  attributes{
                    name
                    url
                  }
                }
              }
              topTitle
              title
              description
              buttonLink
              buttonLabel
            }
          }
          ... on ComponentBlockSlideTopInfo {
            tractorSliderTopTitle: topTitle
            tractorSliderMainHeading: mainHeading
            tractorSliderDescription: description
            # No tractors here, it will be fetched separately
          }
          ... on ComponentBlockHomeIntegratedSection {
            topTitle
            title
            description
            posterImage {
              data {
                attributes {
                  name
                  url
                }
              }
            }
            mediaFile {
              data {
                attributes {
                  name
                  url
                }
              }
            }
          }
          ... on ComponentBlockSlideTopInfo {
            implementSliderTopTitle: topTitle
            implementSliderMainHeading: mainHeading
            implementSliderDescription: description
          }
          ... on ComponentBlockHomeStoryLine {
            storyLineTopTitle: topTitle
            storyLineTitle: title
            storyLineDescription: description
            storyLineVideos: VideoDetail {
              video {
                data {
                  attributes {
                    name
                    url
                  }
                }
              }
              posterImage {
                data {
                    attributes {
                      name
                      url
                    }
                  }
              }
            }
          }
          ... on ComponentBlockSlideTopInfo {
            socialContributionTopTitle: topTitle
            socialContributionMainHeading: mainHeading
            socialContributionDescription: description
          }
          ... on ComponentCommonComponentsTestimonialSlider {
            testimonialSliderTopTitle: toptitle
            testimonialSliderMainTitle: maintitle
            testimonialSliderDescription: description
            testimonials: Testimonials {
              name
              city
              content
              Image {
                data {
                  attributes {
                    name
                    url
                  }
                }
              }
            }
          }
          ... on ComponentBlockSlideTopInfo {
            blogsTopTitle: topTitle
            blogsMainHeading: mainHeading
            blogsDescription: description
          }
          ...on ComponentBlockFactsSection {
            factsSectionTopTitle : topTitle
            factsSectionHeading : heading
            factsSectionDescription : description
            factsSectionBackgroundImage : backgroundImage{
              data{
                attributes{
                  name
                  url
                }
              }
            }
            incorporationText
            incorporationSubtext
            
            turnoverText
            turnoverSubtext
            
            volumeText
            volumeSubtext
            
            researchFacilityText
            researchFacilitySubext
            
            
            countriesText
            countriesSubText
            
            
            dealersText
            dealersSubtext
            
            noOfTractorsText
            noOfTractorsSubtext
            
            otherFactText
            otherFactSubtext
          }
        }
      }
    }
  }

  tractors {
    allTractors: data {
      attributes {
        name
        tractor_category {
          data {
            attributes {
              name
            }
          }
        }
        colors{
          data{attributes{colorName colorCode}}
        }
        slug
        tractorType
        internationalTractorLink
        slideMainimage{
        data {
            attributes {
              name
              url
            }
          }
        }
      }
    }
  }
  
  
  implements {
    allImplements: data {
      attributes {
        name
        length
        width
        height
        slug
        approxWeight
        slideMainimage{
        data {
            attributes {
              name
              url
            }
          }
        }
      }
    }
  }
  socialContributions(  sort: ["publishedAt:desc"]
      ){
    allSocialContributions: data {
      attributes{
        title
        slug
        image{
          data{
            attributes{
              name
              url
            }
          }
        }
  			content
        
      }
    }
  }

    blog(
      sort: ["publishedAt:desc"]
    ) {
      data {
        id
        attributes {
          title
          slug
          image {
            data {
              attributes {
                name
                url
              }
            }
          }
          publishedAt
          content
        }
      }
    }
  
}
`;