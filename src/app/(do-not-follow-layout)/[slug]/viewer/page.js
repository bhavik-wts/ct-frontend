"use client";
export const dynamic = "force-dynamic";

import { useRef, useState, useEffect } from "react";
import ModelViewer3d from "@/components/pages/viewer/ModelViewer3d";
import { useParams, useRouter } from "next/navigation";
import Loading from "./loading";
import { getStrapiURL } from "@/lib/utils";
import { GET_TRACTOR_BY_SLUG_VIEWER } from "@/graphql/queries/get-tractor-by-slug-viewer";
import { fetchData as graphqlFetchData } from "@/lib/graphql-operations";
import ibutton from "../../../../../public/images/ibutton.svg";

const TractorViewer = () => {
  const { slug } = useParams();
  const [tractorData, setTractorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelLoading, setModelLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);


  const [error, setError] = useState(null);
  const [showArButton, setShowArButton] = useState(false);
  const [activeColor, setActiveColor] = useState(null); // Track active color
  const modelViewerRef = useRef(null);
  const router = useRouter();
  const baseUrl = getStrapiURL();

  // Fetch tractor data using GraphQL
  const fetchTractorData = async () => {
    try {
      const response = await graphqlFetchData(GET_TRACTOR_BY_SLUG_VIEWER, {
        slug,
      });
      const tractor = response.tractors.data;
      // console.log("new hotspot data", tractor);
      if (!tractor || tractor.length === 0)
        throw new Error("No tractor found for the given slug");
      setTractorData(tractor[0]);
      setActiveColor({
        name: tractor[0]?.attributes?.colors?.data[0]?.attributes?.colorName,
        code: tractor[0]?.attributes?.colors?.data[0]?.attributes?.colorCode,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!tractorData) {
      fetchTractorData();
    }

    // Check for mobile and AR device support only on the client-side
    if (typeof window !== "undefined") {
      const isMobile = /android|webos|blackberry|iemobile|opera mini/i.test(
        navigator.userAgent
      );
      const isIPhone =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isMobile && !isIPhone) setShowArButton(true);
    }
  }, [tractorData]); // Depend on tractorData to only run when data is fetched or updated

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const { GLBfile, colors, name, tractor_category, HotspotDetail } =
    tractorData.attributes || {};
  const modelPath = baseUrl + GLBfile?.data?.attributes?.url;

  return (
    <section className="web-3d">
      
      <div className="d-flex flex-row justify-content-center align-items-center gap-3 d-md-none">
      <button
        className="exit-btn d-block mob-exit-btn"
        onClick={() => router.back()}
      >
        Exit
      </button>
          <div className="ibutton-s mob-ibutton" onClick={() => setShowTooltip(!showTooltip)} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
            <img src={ibutton.src} alt="Info" style={{ width: "24px", height: "24px", cursor: "pointer" }} />

            {showTooltip && (
              <div className="custom-tooltip">
                <div className="tooltip-arrow" />
                <div className="tooltip-content">
                  This is your big tooltip or callout with any info you want to show!
                </div>
              </div>
            )}
          </div>
        </div>
      <div className="web-3d-image">
        <ModelViewer3d
          ref={modelViewerRef}
          activeColor={activeColor}
          hotspotData={HotspotDetail} // Pass HotspotDetail to ModelViewer3d
          modelPath={modelPath}
          onModelLoaded={() => {
            console.log("Model loaded successfully");
            setModelLoading(false);
          }}
        />
        {modelLoading && (
          <div className="loader-3d-model-viewer">
            <Loading /> {/* Show loader while model is loading */}
          </div>
        )}
      </div>
      <div className="web-3d-option">
        <div className="colors">
          {colors?.data.map((color, index) => (
            <button
              key={index}
              style={{ backgroundColor: color.attributes.colorCode }}
              className="color-btn"
              onClick={() =>
                setActiveColor({
                  name: color.attributes.colorName,
                  code: color.attributes.colorCode,
                })
              } // Update activeColor on click
            />
          ))}
        </div>
        <div className="modal-name">
          <ul>
            <li>
              <span className="name">{name}</span>
            </li>
            <li>
              <span>{tractor_category?.data?.attributes?.name}</span>
            </li>
          </ul>
        </div>
        <div className="d-none d-md-inline-flex d-flex flex-row justify-content-center align-items-center gap-3">
          <div className="position-relative" onClick={() => setShowTooltip(!showTooltip)} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
            <img src={ibutton.src} alt="Info" style={{ width: "24px", height: "24px", cursor: "pointer" }} />

            {showTooltip && (
              <div className="custom-tooltip">
                <div className="tooltip-arrow" />
                <div className="tooltip-content">
                  This is your big tooltip or callout with any info you want to show!
                </div>
              </div>
            )}
          </div>
          <button
            className="exit-btn d-none d-md-inline-flex"
            onClick={() => router.back()}
          >
            Exit
          </button>
        </div>
        {/* <div>
          <img src={ibutton.src}></img>
        </div>
        <button
          className="exit-btn d-none d-md-inline-flex"
          onClick={() => router.back()}
        >
          Exit
        </button> */}
      </div>
      {showArButton && (
        <div className="ar-btn">
          <button onClick={() => modelViewerRef.current.enterAR()}>
            AR View
          </button>
        </div>
      )}
    </section>
  );
};

export default TractorViewer;
