"use client";

import React, { useEffect, useRef, useState } from "react";
import MegaMenu from "./MegaMenu";

const Index = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [menuName, setMenuName] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering
  const menuContentRefs = useRef([]);
  const allSocialLinks = data?.data.attributes.footer.socialLinks.socialLinks;

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "" : "hidden"; // Prevent background scrolling
    setIsHeaderScrolled(!isHeaderScrolled);
  };

  const handleScroll = () => {
    if (window.scrollY >= 50) {
      // Check if window is defined
      setIsHeaderScrolled(true);
    } else {
      setIsHeaderScrolled(false);
    }
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 991);
  };

  // Using useEffect to run only on the client side
  useEffect(() => {
    setIsClient(true); // Set client-side flag

    // Ensure window is defined before adding event listeners
    if (typeof window !== "undefined") {
      // Add scroll and resize event listeners
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);

      // Call handleResize immediately to set the initial value for isMobile
      handleResize();

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  if (!isClient) {
    return null; // Prevent rendering on the server side
  }

  return (
    <>
      <section
        className={`toll-number ${isHeaderScrolled ? "d-none" : "d-flex"}`}
      >
        <img src="/images/phone.svg" alt="phone" />
        <p>
          Call Us on Our Toll-Free Number :
          <a href="tel:1800 212 2129">1800 212 2129</a>
        </p>
      </section>

      <header
        className={`${
          isHeaderScrolled || isMenuOpen ? "header-scroll top-40" : ""
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="header-wrapper">
                <div className="header-block">
                  <a href="/">
                    <img src="/images/header-logo.png" alt="logo" />
                  </a>
                </div>
                <div className="button-block">
                  <a href="/inquiry">Request a Quote</a>
                  <div
                    className={`menu btn12 ${isMenuOpen && "open"}`}
                    data-menu="12"
                    onClick={handleMenuClick}
                  >
                    <div className="icon"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MegaMenu isMenuOpen={isMenuOpen} allSocialLinks={allSocialLinks} />
    </>
  );
};

export default Index;
