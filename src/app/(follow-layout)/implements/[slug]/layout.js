import Page from "./page";

import { GET_IMPLEMENTS_DETAILS_PAGE_DATA } from "@/graphql/queries/implement-details";
import { fetchData } from "@/lib/graphql-operations";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_IMPLEMENTS_DETAILS_PAGE_DATA);
  const seoData = await graphqlData.pages.data[0].attributes.Seo;
  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    openGraph: {
      images: [
        process.env.NEXT_PUBLIC_STRAPI_URL +
          seoData.metaImage.data.attributes.formats.medium.url,
      ],
    },
  };
}

export default Page;
