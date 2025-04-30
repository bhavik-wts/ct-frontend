import Link from "next/link";
import React from "react";

const CopyrightSection = ({ data }) => {
  data = data.data.attributes;
  const copyrightText = data.copyrightText;
  const privacyPolicyTitle = data.privacyPolicy.title;
  const privacyPolicyLink = data.privacyPolicy.link;
  const termsOfUseTitle = data.termsOfUse.title;
  const termsOfUseLink = data.termsOfUse.link;

  return (
    <>
      <section className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="copyright-block">
                <p>{copyrightText}</p>
                <ul>
                  <li>
                    <Link href={privacyPolicyLink}>{privacyPolicyTitle}</Link>
                  </li>
                  <li>
                    <Link href={termsOfUseLink}>{termsOfUseTitle}</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CopyrightSection;
