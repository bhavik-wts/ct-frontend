"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import Loading from "./loading";
import { getStrapiURL } from "@/lib/utils";
import { GET_TRACTOR_BY_SLUG_VIEWER } from "@/graphql/queries/get-tractor-by-slug-viewer";
import { fetchData as graphqlFetchData } from "@/lib/graphql-operations";

// Dynamically import the 3D viewer to disable SSR
const ModelViewer3d = dynamic(() => import("@/components/pages/viewer/ModelViewer3d"), {
  ssr: false,
});

const TractorViewer = () => {
  const { slug } = useParams();
  const router = useRouter();
  const modelViewerRef = useRef(null);
  const baseUrl = getStrapiURL();

  const [tractorData, setTractorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelLoading, setModelLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState(null);
  const [showArButton, setShowArButton] = useState(false);
  const [activeColor, setActiveColor] = useState(null);

  // Fetch tractor data using GraphQL
  const fetchTractorData = async () => {
    try {
      const response = await graphqlFetchData(GET_TRACTOR_BY_SLUG_VIEWER, { slug });
      const tractor = response.tractors.data;
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

  // Run on client only
  useEffect(() => {
    if (!tractorData) {
      fetchTractorData();
    }

    if (typeof window !== "undefined") {
      const isMobile = /android|webos|blackberry|iemobile|opera mini/i.test(navigator.userAgent);
      const isIPhone = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      if (isMobile && !isIPhone) {
        setShowArButton(true);
      }
    }
  }, [tractorData]);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const { GLBfile, colors, name, tractor_category, HotspotDetail } = tractorData.attributes || {};
  const modelPath = baseUrl + GLBfile?.data?.attributes?.url;

  return (
    <section className="web-3d">
      {/* Mobile Buttons */}
      <div className="d-flex flex-row justify-content-center align-items-center gap-3 d-md-none">
        <button className="exit-btn d-block mob-exit-btn" onClick={() => router.back()}>
          Exit
        </button>
        <div
          className="ibutton-s mob-ibutton"
          onClick={() => setShowTooltip(!showTooltip)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <img src="/images/ibutton.svg" alt="Info" style={{ width: 24, height: 24, cursor: "pointer" }} />
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

      {/* 3D Viewer */}
      <div className="web-3d-image">
        <ModelViewer3d
          ref={modelViewerRef}
          activeColor={activeColor}
          hotspotData={HotspotDetail}
          modelPath={modelPath}
          onModelLoaded={() => {
            if (typeof window !== "undefined") {
              console.log("Model loaded successfully");
              setModelLoading(false);
            }
          }}
        />
        {modelLoading && (
          <div className="loader-3d-model-viewer">
            <Loading />
          </div>
        )}
      </div>

      {/* Options Panel */}
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
              }
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

        {/* Desktop Tooltip and Exit */}
        <div className="d-none d-md-inline-flex d-flex flex-row justify-content-center align-items-center gap-3">
          <div
            className="position-relative"
            onClick={() => setShowTooltip(!showTooltip)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <img src="/images/ibutton.svg" alt="Info" style={{ width: 24, height: 24, cursor: "pointer" }} />
            {showTooltip && (
              <div className="custom-tooltip">
                <div className="tooltip-arrow" />
                <div className="tooltip-content">
                  This is your big tooltip or callout with any info you want to show!
                </div>
              </div>
            )}
          </div>

          <button className="exit-btn d-none d-md-inline-flex" onClick={() => router.back()}>
            Exit
          </button>
        </div>
      </div>

      {showArButton && (
        <div className="ar-btn">
          <button onClick={() => modelViewerRef.current?.enterAR()}>
            AR View
          </button>
        </div>
      )}
    </section>
  );
};

export default TractorViewer;
