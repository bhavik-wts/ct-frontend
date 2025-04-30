import React from "react";
import QuickLinksMenu from "./QuickLinksMenu";
import CompanyLinks from "./CompanyLinks";
import GetInTouch from "./GetInTouch";

const Footer = ({ data }) => {
  data = data.data.attributes;
  const companyDescription = data.companyInfoText;
  const quickLinkMenuData = data.footer.quickLinkMenu;
  const companyLinkMenuData = data.footer.companyLinkMenu;
  const contactSectionHeading = data.footer.contactSectionHeading;
  const contactNoTitle = data.footer.contactNoTitle;
  const socialLinksData = data.footer.socialLinks;
  const contactNo = data.contactNo;

  return (
    <>
      <footer>
        <div className="container">
          <div className="row justify-content-between g-4">
            <div className="col-md-6 col-lg-3">
              <a href="/">
                <img src="/images/footer-logo.png" alt="logo" />
              </a>
              <p className="mt-20">{companyDescription}</p>
            </div>
            <div className="col-md-8">
              <div className="row justify-content-between g-4">
                <QuickLinksMenu data={quickLinkMenuData} />
                <CompanyLinks data={companyLinkMenuData} />
                <GetInTouch
                  heading={contactSectionHeading}
                  contactNoTitle={contactNoTitle}
                  contactNo={contactNo}
                  socialLinksData={socialLinksData}
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
