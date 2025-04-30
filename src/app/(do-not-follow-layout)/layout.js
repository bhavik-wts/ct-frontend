import Script from "next/script";
import "../globals.css";
import BootstrapClient from "@/components/BootstrapClient";

export const metadata = {
    title: "Product Viewer",
    description: "View product details",
};

export default function ViewerLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </head>
            <body>
                {/* Load the necessary scripts for model-viewer and effects */}
                <Script async src="https://ga.jspm.io/npm:es-module-shims@1.7.1/dist/es-module-shims.js"></Script>

                <Script type="importmap" id="three">
                    {`
                        {
                            "imports": {
                                "three": "https://cdn.jsdelivr.net/npm/three@^0.167.1/build/three.module.min.js",
                                "@google/model-viewer": "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js",
                                "@google/model-viewer-effects": "https://cdn.jsdelivr.net/npm/@google/model-viewer-effects/dist/model-viewer-effects.min.js"
                            }
                        }
                    `}
                </Script>

                <Script
                    type="module"
                    src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
                    strategy="beforeInteractive" // Load before interactive
                ></Script>

                <Script
                    type="module"
                    src="https://cdn.jsdelivr.net/npm/@google/model-viewer-effects/dist/model-viewer-effects.min.js"
                    strategy="beforeInteractive" // Load before interactive
                ></Script>

                <BootstrapClient />
                <main className="viewer-layout">
                    {children}
                </main>
            </body>
        </html>
    );
}