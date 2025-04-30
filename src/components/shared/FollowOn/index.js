import React from "react";
import FacebookIcon from "./FacebookIcon";
import LinkedInIcon from "./LinkedInIcon";
import YouTubeIcon from "./YoutubeIcon";
import TwitterIcon from "./TwitterIcon";
import InstagramIcon from "./InstagramIcon";
import PinterestIcon from "./PinterestIcon";
import WhatsappIcon from "./WhatsappIcon";

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

const FollowOn = ({ data }) => {
  return (
    <>
      <p>Follow Us On</p>
      <ul className="social-list">
        {data.socialLinks.map((link, index) => (
          <li key={index} className="me-2">
            <a href={link.link} target="_blank" rel="noopener noreferrer">
              {socialIcon(link.icon)}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FollowOn;
