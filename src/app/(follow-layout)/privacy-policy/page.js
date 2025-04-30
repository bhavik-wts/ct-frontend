import Banner from "@/components/shared/Banner";
import React from "react";
import { GET_PRIVACY_POLICY_PAGE_DATA } from "@/graphql/queries/privacy-policy";
import { fetchData } from "@/lib/graphql-operations";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_PRIVACY_POLICY_PAGE_DATA);
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

const page = async () => {
  const graphqlData = await fetchData(GET_PRIVACY_POLICY_PAGE_DATA);
  const bannerData = graphqlData.pages.data[0].attributes.blocks[0];
  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData;

  return (
    <>
      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={breadcrums}
      />
      <section className="privacy-wrapper py-80">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title">
                <h2>Privacy Policy of Captain Tractors</h2>
                <p>
                  Captain Tractors operates the{" "}
                  <a href="https://captaintractors.com">
                    https://captaintractors.com
                  </a>{" "}
                  website, which provides the SERVICE. This page is used to
                  inform website visitors regarding our policies with the
                  collection, use, and disclosure of Personal Information if
                  anyone decided to use our Service, the captaintractors.com
                  website. If you choose to use our Service, then you agree to
                  the collection and use of information in relation with this
                  policy. The Personal Information that we collect are used for
                  providing and improving the Service. We will not use or share
                  your information with anyone except as described in this
                  Privacy Policy. The terms used in this Privacy Policy have the
                  same meanings as in our Terms and Conditions, which is
                  accessible at{" "}
                  <a href="https://captaintractors.com">
                    https://captaintractors.com
                  </a>
                  , unless otherwise defined in this Privacy Policy.
                </p>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-12 col-lg-6">
              <div className="privacy-card">
                <span className="privacy-icon">
                  <img src="images/information.svg" alt="info" />
                </span>
                <h6>Information Collection and Use</h6>
                <p>
                  For a better experience while using our Service, we may
                  require you to provide us with certain personally identifiable
                  information, including but not limited to your name, phone
                  number, and postal address. The information that we collect
                  will be used to contact or identify you.
                </p>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="privacy-card">
                <span className="privacy-icon">
                  <img src="images/data-log.svg" alt="info" />
                </span>
                <h6>Log Data</h6>
                <p>
                  We want to inform you that whenever you visit our Service, we
                  collect information that your browser sends to us that is
                  called Log Data. This Log Data may include information such as
                  your computer’s Internet Protocol (&quot;IP&quot;) address,
                  browser version, pages of our Service that you visit, the time
                  and date of your visit, the time spent on those pages, and
                  other statistics.
                </p>
              </div>
            </div>

            <div className="col-md-12 col-lg-6">
              <div className="privacy-card">
                <span className="privacy-icon">
                  <img src="images/cookies.svg" alt="info" />
                </span>
                <h6>Cookies</h6>
                <p>
                  Cookies are files with small amount of data that is commonly
                  used an anonymous unique identifier. These are sent to your
                  browser from the website that you visit and are stored on your
                  computer’s hard drive. Our website uses these
                  &quot;cookies&quot; to collection information and to improve
                  our Service. You have the option to either accept or refuse
                  these cookies, and know when a cookie is being sent to your
                  computer. If you choose to refuse our cookies, you may not be
                  able to use some portions of our Service.
                </p>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="privacy-card">
                <span className="privacy-icon">
                  <img src="images/service-provider.svg" alt="info" />
                </span>
                <h6>Service Providers</h6>
                <p>
                  We may employ third-party companies and individuals due to the
                  following reasons:
                </p>
                <ul>
                  <li>
                    <p>To facilitate our Service</p>
                  </li>
                  <li>
                    <p>To perform Service-related services</p>
                  </li>
                  <li>
                    <p>To provide the Service on our behalf</p>
                  </li>
                  <li>
                    <p>To assist us in analyzing how our Service is used</p>
                  </li>
                </ul>
                <p>
                  We want to inform our Service users that these third parties
                  have access to your Personal Information. The reason is to
                  perform the tasks assigned to them on our behalf. However,
                  they are obligated not to disclose or use the information for
                  any other purpose.
                </p>
              </div>
            </div>

            <div className="col-md-12 col-lg-6">
              <div className="privacy-card">
                <span className="privacy-icon">
                  <img src="images/security.svg" alt="info" />
                </span>
                <h6>Security</h6>
                <p>
                  We value your trust in providing us your Personal Information,
                  thus we are striving to use commercially acceptable means of
                  protecting it. But remember that no method of transmission
                  over the internet, or method of electronic storage is 100%
                  secure and reliable, and we cannot guarantee its absolute
                  security.
                </p>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="privacy-card">
                <span className="privacy-icon">
                  <img src="images/links.svg" alt="info" />
                </span>
                <h6>Links to Other Sites</h6>
                <p>
                  Our Service may contain links to other sites. If you click on
                  a third-party link, you will be directed to that site. Note
                  that these external sites are not operated by us. Therefore,
                  we strongly advise you to review the Privacy Policy of these
                  websites. We have no control over, and assume no
                  responsibility for the content, privacy policies, or practices
                  of any third-party sites or services.
                </p>
              </div>
            </div>

            <div className="col-md-12 col-lg-6">
              <div className="privacy-card">
                <span className="privacy-icon">
                  <img src="images/children.svg" alt="info" />
                </span>
                <h6>Children’s Privacy</h6>
                <p>
                  Our Services do not address anyone under the age of 13. We do
                  not knowingly collect personal identifiable information from
                  children under 13. In the case we discover that a child under
                  13 has provided us with personal information, we immediately
                  delete this from our servers. If you are a parent or guardian
                  and you are aware that your child has provided us with
                  personal information, please contact us so that we will be
                  able to do necessary actions.
                </p>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="privacy-card">
                <span className="privacy-icon">
                  <img src="images/changes.svg" alt="info" />
                </span>
                <h6>Changes to This Privacy Policy</h6>
                <p>
                  We may update our Privacy Policy from time to time. Thus, we
                  advise you to review this page periodically for any changes.
                  We will notify you of any changes by posting the new Privacy
                  Policy on this page. These changes are effective immediately,
                  after they are posted on this page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
