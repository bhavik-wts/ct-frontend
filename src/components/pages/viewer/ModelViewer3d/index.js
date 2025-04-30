"use client";
import {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  onModelLoaded,
  useState,
} from "react";
import ibutton from "../../../../../public/images/ibutton.svg";
import close from "../../../../../public/images/close.svg";

const ModelViewer3d = forwardRef(
  ({ modelPath, activeColor, hotspotData, onModelLoaded }, ref) => {
    // console.log("activecolor", activeColor);
    const modelViewerRef = useRef(null);
    const [activeHotspot, setActiveHotspot] = useState(null);

    // Define all the available colors for all models here
    // const COLORS = {
    //   RED: "#ff0026", // RGBA for red
    //   GREEN: "#00c854", // RGBA for green
    //   BLUE: "#0875db", // RGBA for blue
    //   BLACK: "#000", // RGBA for black
    // };

    const hotspotClickHandler = (hotspotDetail) => {
      setActiveHotspot(hotspotDetail); // Set active hotspot for modal
      const target = `${hotspotDetail.dataPositionX} ${hotspotDetail.dataPositionY} ${hotspotDetail.dataPositionZ}`;
      const cameraOrbit = `${hotspotDetail.camaraOrbitPhi} ${hotspotDetail.camaraOrbitTheta} ${hotspotDetail.camaraOrbitRadius}`;
      const fov = hotspotDetail.fieldOfView;

      modelViewerRef.current.cameraTarget = target;
      modelViewerRef.current.cameraOrbit = cameraOrbit;
      modelViewerRef.current.fieldOfView = fov;
    };

    // Function to change material color
    const changeMaterialColor = (colorName) => {
      const color = colorName;

      const modelViewerElement = modelViewerRef.current;

      if (modelViewerElement) {
        const handleLoad = () => {
          if (onModelLoaded) {
            onModelLoaded(); // Call the callback passed to ModelViewer3d
          }

          const model = modelViewerElement.model;
          if (model) {
            const material = model.materials.find(
              (mat) => mat.name === "mat_87.001"
            );
            if (material) {
              material.pbrMetallicRoughness.setBaseColorFactor(color);
            }
          }
        };

        // If the model is already loaded, handle immediately
        if (modelViewerElement.model) {
          handleLoad();
        } else {
          // Wait for the model to load
          modelViewerElement.addEventListener("load", handleLoad, {
            once: true,
          });
        }
      }
    };

    // Use effect to set initial color on mount
    useEffect(() => {
      if (activeColor) {
        changeMaterialColor(activeColor.code || "#000");
      }
    }, [activeColor, onModelLoaded]);

    // Use forwardRef to expose the enterAR method to the parent component
    useImperativeHandle(ref, () => ({
      enterAR: () => {
        if (modelViewerRef.current) {
          modelViewerRef.current.activateAR();
        }
      },
    }));

    return (
      <div className="model-viewer-wrapper">
        <model-viewer
          ref={modelViewerRef}
          src={modelPath || "/models/200DI 2WD.glb"}
          // src={modelPath || "/models/tractor_Variant.glb"}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          tone-mapping="commerce"
          // poster="poster.webp"
          shadow-intensity="3"
          // environment-image="/hdrs/whipple_creek_regional_park_04_1k.hdr"
          environment-image="/hdrs/sunflowers_puresky_1k.hdr"
          skybox-image="/hdrs/3915.jpg"
          // skybox-image="/hdrs/farm_field_1k.hdr"
          skybox-height="3m"
          skybox-radius="5m"
          // cameraTarget="0 0 0"
          min-camera-orbit="auto 30deg auto"
          max-camera-orbit="auto 85deg auto"
          exposure="0.9"
          // orientation="0 0 95deg"
        >
          {/* <effect-composer>
                    <bloom-effect
                        exposure="0.02"
                        knee="0.5"
                        radius="0.05"
                        threshold="0.05"
                    ></bloom-effect>
                </effect-composer> */}

          {hotspotData?.map((hotspot, index) => (
            <button
              key={index}
              className="hotspot-button"
              slot={`hotspot-${index}`}
              data-position={`${hotspot.dataPositionX} ${hotspot.dataPositionY} ${hotspot.dataPositionZ}`}
              data-normal={`${hotspot.dataNormalX} ${hotspot.dataNormalY} ${hotspot.dataNormalZ}`}
              data-visibility-attribute="hidden"
              onClick={() => hotspotClickHandler(hotspot)}
            >
              <img src={ibutton.src}></img>
              <span className="hotspot-label">{hotspot.hotspotLabel}</span>
            </button>
          ))}
        </model-viewer>
        {activeHotspot && (
          <div className="modal-overlay" onClick={() => setActiveHotspot(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {/* Header Section with Label & Close Button */}
              <div className="modal-header">
                <span className="modal-label">
                  {activeHotspot.hotspotLabel}
                </span>
                <button
                  className="modal-close"
                  onClick={() => setActiveHotspot(null)}
                >
                  <img src={close.src}></img>
                </button>
              </div>

              <hr className="modal-divider" />

              <div className="modal-body">
                <p>{activeHotspot.hotspotContent}</p>
              </div>
            </div>
          </div>
        )}
        
      </div>
    );
  }
);

ModelViewer3d.displayName = "ModelViewer3d";

export default ModelViewer3d;
