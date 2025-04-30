"use client";

import React, { useEffect, useState } from "react";

const LanguageSelector = () => {
  const [isGoogleTranslateLoaded, setIsGoogleTranslateLoaded] = useState(false);

  useEffect(() => {
    // Ensure that this runs only on the client-side (in the browser)
    if (typeof window !== "undefined") {
      // Function to dynamically load the Google Translate script
      const addGoogleTranslateScript = () => {
        const googleTranslateScript = document.createElement("script");
        googleTranslateScript.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        googleTranslateScript.async = true;
        document.head.appendChild(googleTranslateScript);
      };

      // Callback for Google Translate initialization
      window.googleTranslateElementInit = function () {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,gu",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );

        // Flag that Google Translate is ready
        setIsGoogleTranslateLoaded(true);

        // Manipulate the Google Translate widget after loading
        setTimeout(() => {
          const googleTranslateElement = document.querySelector(
            ".goog-te-gadget-simple"
          );

          if (googleTranslateElement) {
            // Add a custom 'form-select' class to the Google Translate widget
            googleTranslateElement.classList.add("form-select");

            // Remove all <img> tags inside the Google Translate widget
            const images = googleTranslateElement.querySelectorAll("img");
            images.forEach((img) => img.remove());
          }

          // Hide element with id ':2.container' using MutationObserver
          const observer = new MutationObserver(() => {
            const containerElement = document.getElementById(":2.container");
            if (containerElement) {
              containerElement.style.visibility = "hidden"; // Set visibility to hidden

              // Remove inline styles from body
              document.body.removeAttribute("style");

              observer.disconnect(); // Stop observing once the element is found and hidden
            }
          });

          // Start observing the body for child additions
          observer.observe(document.body, { childList: true, subtree: true });
        }, 500); // Delay to ensure the widget is loaded before manipulation
      };

      // Add the script only once to avoid multiple script injections
      if (
        !document.querySelector(
          'script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]'
        )
      ) {
        addGoogleTranslateScript();
      }
    }
  }, []); // Empty dependency array ensures this only runs once on mount

  return (
    <div className="language megamenu-language">
      <span>Language</span>
      {/* Hidden Google Translate widget container */}
      <div id="google_translate_element"></div>
    </div>
  );
};

export default LanguageSelector;
