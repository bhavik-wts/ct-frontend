"use client";
import React, { useEffect, useRef, useState } from "react";
import AboutMenu from "./AboutMenu";
import TractorMenu from "./TractorMenu";
import ImplementMenu from "./ImplementMenu";
import InqueryMenu from "./InqueryMenu";
import NetworkMenu from "./NetworkMenu";
import LanguageSelector from "./LanguageSelector";
import FacebookIcon from "@/components/shared/FollowOn/FacebookIcon";
import LinkedInIcon from "@/components/shared/FollowOn/LinkedInIcon";
import YouTubeIcon from "@/components/shared/FollowOn/YoutubeIcon";
import TwitterIcon from "@/components/shared/FollowOn/TwitterIcon";
import PinterestIcon from "@/components/shared/FollowOn/PinterestIcon";
import InstagramIcon from "@/components/shared/FollowOn/InstagramIcon";
import WhatsappIcon from "@/components/shared/FollowOn/WhatsappIcon";
import { GET_MENU_DATA } from "@/graphql/queries/mega-menu-content";
import { fetchData } from "@/lib/graphql-operations";
import MenuContext from "./MenuContext";

// Map of icon components
const iconMap = {
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  pinterest: PinterestIcon,
  whatsapp: WhatsappIcon,
};

// Function to retrieve and render the icon component
const socialIcon = (name) => {
  const IconComponent = iconMap[name.toLowerCase()];
  if (IconComponent) {
    return <IconComponent />;
  }
  return null;
};

const MegaMenu = ({ isMenuOpen, allSocialLinks }) => {
  const [menuData, setMenuData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [activeMenu, setActiveMenu] = useState(1);

  // Array to hold the menu items and their content
  const menus = [
    {
      id: 1,
      label: "About Us",
      className: "about",
      link: "/about-us",
      content: <AboutMenu />,
    },
    {
      id: 2,
      label: "Tractors",
      className: "tractor",
      link: "/tractors",
      content: <TractorMenu />,
    },
    {
      id: 3,
      label: `Tractor's Implement`,
      className: "implement",
      link: "/implements",
      content: <ImplementMenu />,
    },
    {
      id: 4,
      label: "Network",
      className: "network",
      link: "/domestic-network",
      content: <NetworkMenu />,
    },
    {
      id: 5,
      label: "Inquiry",
      className: "inquiry",
      link: "/inquiry",
      content: <InqueryMenu />,
    },
  ];

  // Function to handle hover event
  const handleMouseEnter = (id) => {
    setActiveMenu(id);
    // console.log("changing menu,", id);
  };

  // Function to handle click event
  const handleClick = (id) => {
    setActiveMenu(id);
  };
  useEffect(() => {
    setIsLoading(true);
    async function fetchMenuData() {
      const graphqlData = await fetchData(GET_MENU_DATA);
      setIsLoading(false);
      setMenuData(graphqlData);
    }
    fetchMenuData(); // Call the renamed function
  }, []);

  return (
    <>
      <MenuContext.Provider value={menuData}>
        <section className={`mega-menu ${isMenuOpen ? "open" : ""}`}>
          <div className="container">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="menu-wrapper">
                  <div className="menu-one">
                    <ul>
                      {menus.map((menu) => (
                        <li
                          key={menu.id}
                          // className={`menu-item ${activeMenu === menu.id ? 'active' : ''}`}
                        >
                          <a
                            href={menu.link}
                            onMouseOver={() => handleMouseEnter(menu.id)}
                            onClick={() => handleClick(menu.id)}
                            className={`${menu.className} ${
                              activeMenu === menu.id ? "active" : ""
                            }`}
                          >
                            {menu.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="menu-two-block">
                    <div className="menu-one redirect-menu">
                      <ul>
                        <li>
                          <a href="/awards">Awards & Certifications</a>
                        </li>
                        <li>
                          <a href="/careers">Careers</a>
                        </li>
                        <li>
                          <a href="/blogs">Blog</a>
                        </li>
                        <li>
                          <a href="/contact-us">Contact Us</a>
                        </li>
                      </ul>
                    </div>
                    <hr />
                    <div className="cdms">
                      <span>Want to login in CDMS system?</span>
                      <a href="https://cdms.co.in/cdms/" target="_blank">
                        CDMS Login
                      </a>
                    </div>
                    <hr />
                    <LanguageSelector />
                    <div className="menu-social-media">
                      <span>Follow Us On</span>
                      <ul className="social-list">
                        {allSocialLinks.map((link) => (
                          <li key={link.name}>
                            <a
                              target="_blank"
                              href={link.link}
                              rel="noopener noreferrer"
                            >
                              {socialIcon(link.icon)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="menu-content-wrapper">
                  {!isLoading && menuData && (
                    <>
                      {menus.map((menu) => (
                        <div
                          key={menu.id}
                          className={`${
                            activeMenu === menu.id ? "d-block" : "d-none"
                          }`}
                        >
                          {menu.content}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </MenuContext.Provider>
      <style jsx>{`
        body {
          overflow: ${isMenuOpen ? "hidden" : "auto"};
        }
      `}</style>
    </>
  );
};

export default MegaMenu;
