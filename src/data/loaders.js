import qs from "qs";
import { unstable_noStore as noStore } from "next/cache";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

async function fetchData(url) {
  const authToken = null; // Implement getAuthToken() later
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export async function getGlobalPageData() {
  noStore();

  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    populate: [
      "footer.contactSectionText",
      "footer.quickLinkMenu",
      "footer.quickLinkMenu.pageLink",
      "footer.companyLinkMenu",
      "footer.companyLinkMenu.pageLink",
      "privacyPolicy",
      "termsOfUse",
      "companyLogoLg",
      "footer.socialLinks.socialLinks",
      "productLinks.tractorByModels.tractors",
      "productLinks.tractorsBySeries.bySeries",
      "productLinks.implementsByCategory.implement_categories",
      "productLinks.implementByName.implements",
    ],
  });

  return await fetchData(url.href);
}
export async function getSocialContributionsPageData() {
  const query = qs.stringify(
    {
      filters: {
        slug: "social-contribution-1",
      },
      populate: {
        Seo: {
          populate: ["metaTitle", "metaDescription", "metaImage"],
        },
        blocks: {
          populate: {
            coverImage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
            breadcrums: {
              fields: ["title", "link"],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${baseUrl}/api/pages?${query}`;

  // console.log("url", url);
  return await fetchData(url);
}
export async function getAboutUsPageData() {
  const query = qs.stringify(
    {
      filters: {
        slug: "about-us",
      },

      // populate: "*"
      populate: {
        Seo: {
          populate: ["metaTitle", "metaDescription", "metaImage"],
        },
        blocks: {
          populate: {
            coverImage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
            breadcrums: {
              fields: ["title", "link"],
            },
            backgroundimage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
            BannerTitle: {
              populate: "*",
            },
            Banner: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${baseUrl}/api/pages?${query}`;

  // console.log("about url", url);
  return await fetchData(url);
}

export async function getCompanyHistoryData() {
  const query = qs.stringify(
    {
      filters: {
        slug: "company-history",
      },
      populate: {
        Seo: {
          populate: ["metaTitle", "metaDescription", "metaImage"],
        },
        blocks: {
          populate: {
            coverImage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
            breadcrums: {
              fields: ["title", "link"],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${baseUrl}/api/pages?${query}`;

  // console.log("url", url);
  return await fetchData(url);
}

export async function getBecomeADealerPageData() {
  const query = qs.stringify(
    {
      filters: {
        slug: "become-a-dealer",
      },
      populate: {
        Seo: {
          populate: ["metaTitle", "metaDescription", "metaImage"],
        },
        blocks: {
          populate: {
            coverImage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
            breadcrums: {
              fields: ["title", "link"],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${baseUrl}/api/pages?${query}`;

  // console.log("become-a-dealer url", url);
  return await fetchData(url);
}

export async function getBecomeASupplierPageData() {
  const query = qs.stringify(
    {
      filters: {
        slug: "become-a-supplier",
      },
      populate: {
        Seo: {
          populate: ["metaTitle", "metaDescription", "metaImage"],
        },
        blocks: {
          populate: {
            coverImage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
            breadcrums: {
              fields: ["title", "link"],
            },
            TopTitle: {
              populate: "*",
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${baseUrl}/api/pages?${query}`;

  // console.log("become-a-dealer url", url);
  return await fetchData(url);
}

export async function getAwardsPageData() {
  const query = qs.stringify(
    {
      filters: {
        slug: "awards",
      },
      populate: {
        Seo: {
          populate: ["metaTitle", "metaDescription", "metaImage"],
        },
        blocks: {
          populate: {
            coverImage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large", "medium", "small", "thumbnail"],
                },
              },
            },
            breadcrums: {
              fields: ["title", "link"],
            },
            BannerDetail: {
              // fields: ["toptitle", "heading"], // Including fields from BannerDetail array
              popoulate: "*",
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${baseUrl}/api/pages?${query}`;
  // console.log("Awards page url", url);
  return await fetchData(url);
}

export async function getInquiryPageData() {
  return await getPageData("inquiry");
}

export async function getFindADealerPageData() {
  return await getPageData("find-a-dealer");
}

export async function getDomesticNetworkPageData() {
  return await getPageData("domestic-network");
}

export async function getInternationalNetworkPageData() {
  return await getPageData("international-network");
}

export async function getContactUsPageData() {
  return await getPageData("contact-us");
}

export async function getPrivacyPolicyPageData() {
  return await getPageData("privacy-policy");
}

export async function getTermsOfUsePageData() {
  const query = qs.stringify(
    {
      filters: {
        slug: "terms-of-use",
      },
      populate: {
        Seo: {
          populate: ["metaTitle", "metaDescription", "metaImage"],
        },
        blocks: {
          populate: {
            coverImage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
            breadcrums: {
              fields: ["title", "link"],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${baseUrl}/api/pages?${query}`;
  // console.log("Terms of Use page url", url);
  return await fetchData(url);
}

export async function getBlogsPageData() {
  return await getPageData("blogs");
}

export async function getBlogPostPageData(id) {
  return await getPageData(`blog-details`);
}

export async function getEventsPageData() {
  return await getPageData("events");
}

export async function getEventPageData(id) {
  return await getPageData(`events/${id}`);
}

async function getPageData(slug) {
  const query = qs.stringify(
    {
      filters: { slug },
      populate: {
        Seo: {
          populate: ["metaTitle", "metaDescription", "metaImage"],
        },
        blocks: {
          populate: {
            coverImage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
            breadcrums: {
              fields: ["title", "link"],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${baseUrl}/api/pages?${query}`;
  // console.log(`${slug} url`, url);
  return await fetchData(url);
}

export async function getEventsBannerData() {
  const query = qs.stringify(
    {
      filters: {
        slug: "events",
      },
      populate: {
        Seo: {
          populate: ["metaTitle", "metaDescription", "metaImage"],
        },
        blocks: {
          populate: {
            coverImage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
            breadcrums: {
              fields: ["title", "link"],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${baseUrl}/api/pages?${query}`;
  return await fetchData(url);
}

export async function getEventDetailBannerData(title) {
  // console.log("params", params);
  const query = qs.stringify(
    {
      filters: {
        slug: "event-details",
      },
      populate: {
        Seo: {
          populate: ["metaTitle", "metaDescription", "metaImage"],
        },
        blocks: {
          populate: {
            coverImage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
            breadcrums: {
              fields: ["title", "link"],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${baseUrl}/api/pages?${query}`;
  return await fetchData(url);
}

export async function getCareersBannerData() {
  const query = qs.stringify(
    {
      filters: {
        slug: "careers",
      },
      populate: {
        Seo: {
          populate: ["metaTitle", "metaDescription", "metaImage"],
        },
        blocks: {
          populate: {
            coverImage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
            breadcrums: {
              fields: ["title", "link"],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${baseUrl}/api/pages?${query}`;
  return await fetchData(url);
}

export async function getCareerDetailBannerData(title) {
  const query = qs.stringify(
    {
      filters: {
        slug: "careers-details",
      },
      populate: {
        Seo: {
          populate: ["metaTitle", "metaDescription", "metaImage"],
        },
        blocks: {
          populate: {
            coverImage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
            breadcrums: {
              fields: ["title", "link"],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${baseUrl}/api/pages?${query}`;
  return await fetchData(url);
}

export async function getTractorsBannerData() {
  const query = qs.stringify(
    {
      filters: {
        slug: "tractors-page",
      },
      populate: {
        Seo: {
          populate: ["metaTitle", "metaDescription", "metaImage"],
        },
        blocks: {
          populate: {
            coverImage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
            breadcrums: {
              fields: ["title", "link"],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${baseUrl}/api/pages?${query}`;
  return await fetchData(url);
}

export async function getTractorDetailBannerData(title) {
  const query = qs.stringify(
    {
      filters: {
        slug: "tractor-details",
      },
      populate: {
        Seo: {
          populate: ["metaTitle", "metaDescription", "metaImage"],
        },
        blocks: {
          populate: {
            coverImage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
            breadcrums: {
              fields: ["title", "link"],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${baseUrl}/api/pages?${query}`;
  // console.log("url", url);
  return await fetchData(url);
}

export async function getImplementsBannerData() {
  const query = qs.stringify(
    {
      filters: {
        slug: "implement-page",
      },
      populate: {
        Seo: {
          populate: ["metaTitle", "metaDescription", "metaImage"],
        },
        blocks: {
          populate: {
            coverImage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
            breadcrums: {
              fields: ["title", "link"],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${baseUrl}/api/pages?${query}`;
  return await fetchData(url);
}

export async function getImplementDetailBannerData(title) {
  const query = qs.stringify(
    {
      filters: {
        slug: "implement-detail",
      },
      populate: {
        Seo: {
          populate: ["metaTitle", "metaDescription", "metaImage"],
        },
        blocks: {
          populate: {
            coverImage: {
              fields: ["url", "width", "height"],
              populate: {
                formats: {
                  fields: ["large"],
                },
              },
            },
            breadcrums: {
              fields: ["title", "link"],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${baseUrl}/api/pages?${query}`;
  // console.log("implement-details url", url);
  return await fetchData(url);
}
