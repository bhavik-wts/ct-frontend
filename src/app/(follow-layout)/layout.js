import "../globals.css";
import BootstrapClient from "@/components/BootstrapClient";
import CopyrightSection from "@/components/global/CopyrightSection";
import ProductLinksContainer from "@/components/global/ProductLinksContainer";
import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GET_GLOBAL_DATA } from "@/graphql/queries/get-global-data";
import { fetchData } from "@/lib/graphql-operations";
import Script from "next/script";
import FloatingButtons from "@/components/shared/FloatingButtons";
import { NotificationProvider } from "@/context/notificationContext";
import NotificationList from "@/components/global/Notification/Notification";
import ScrollToTop from "@/components/global/ScrollToTop";

export const metadata = {
  title: "Captian tractors",
  description: "Leading min tractors maker.",
};
export default async function RootLayout({ children }) {
  const graphqlData = await fetchData(GET_GLOBAL_DATA);
  const globalData = graphqlData.global;

  return (
    <html lang="en">
      <head></head>
      <body>
        <NotificationProvider>
          <ScrollToTop />
          <Header data={globalData} />
          {children}
          <BootstrapClient />
          <ProductLinksContainer data={globalData} />
          <Footer data={globalData} />
          <CopyrightSection data={globalData} />
          <FloatingButtons />
          <NotificationList />
        </NotificationProvider>
      </body>
    </html>
  );
}
