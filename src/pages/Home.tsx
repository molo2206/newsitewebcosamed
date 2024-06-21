import Hero from "../components/hero/Hero";
import SimpleBanner from "../components/simpleBanner/SimpleBanner";
import Blogs from "../components/blogs/Blogs";
import BannerMission from "../components/bannerDetails/BannerMission";
import Bulletin from "../components/blogs/Bulletin";
import Work from "../components/blogs/Work";
import Parteners from "../components/blogs/Parteners";
import Seo from "../components/Seo";
import useAsync from "../hooks/useAsync";
import SimpleBannerCommunicated from "../components/simpleBanner/SimpleBannerCommunicated";
import CommunicatedServices from "../services/CommunicatedServices";
const Home = () => {
  const { data: lastCom } = useAsync(() =>
    CommunicatedServices.getLastCommunicate()
  );
  return (
    <div className=" dark:bg-slate-900">
      <Seo title="Home" />
      <Hero />
      {/* <OverviewCounter /> */}
      <BannerMission />
      <SimpleBanner />
      <Blogs />
      <Bulletin />
      <Work />
      <SimpleBannerCommunicated commun={lastCom} />
      <Parteners />
    
    </div>
  );
};

export default Home;
