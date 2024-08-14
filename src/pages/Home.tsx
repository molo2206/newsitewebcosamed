import Hero from "../components/hero/Hero";
import SimpleBanner from "../components/simpleBanner/SimpleBanner";
import Blogs from "../components/blogs/Blogs";
import BannerMission from "../components/bannerDetails/BannerMission";
import Bulletin from "../components/blogs/Bulletin";
import Work from "../components/blogs/Work";

import usePageSEO from "../components/Seo/usePageSEO";
import useAsync from "../hooks/useAsync";
import SimpleBannerCommunicated from "../components/simpleBanner/SimpleBannerCommunicated";
import CommunicatedServices from "../services/CommunicatedServices";
import BannerPartener from "../components/bannerDetails/BannerPartener";

const Home = () => {
  const { data: lastCom } = useAsync(() =>
    CommunicatedServices.getLastCommunicate()
  );
  usePageSEO({
    title: "Acceuil",
    description: "Page 1",
    keywords: ["Keyword 1", "Keyword 2", "Keyword 3"],
    ogTitle: "Acceuil",
    ogDescription: "Page 1",
    ogImage: "http://exemple.com/image.jpg",
    ogUrl: window.location.href,
  });
  return (
    <div className=" dark:bg-slate-900 text-sm ">
      <Hero />
      <BannerMission />
      <SimpleBanner />
      <Blogs />
      <Bulletin />
      <Work />
      <SimpleBannerCommunicated commun={lastCom} />
      <BannerPartener />
    </div>
  );
};

export default Home;
