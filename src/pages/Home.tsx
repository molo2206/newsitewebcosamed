import Hero from "../components/hero/Hero";
import Blogs from "../components/blogs/Blogs";
import BannerMission from "../components/bannerDetails/BannerMission";
import Bulletin from "../components/blogs/Bulletin";

import usePageSEO from "../components/Seo/usePageSEO";
import useAsync from "../hooks/useAsync";
import SimpleBannerCommunicated from "../components/simpleBanner/SimpleBannerCommunicated";
import CommunicatedServices from "../services/CommunicatedServices";
import BannerPartener from "../components/bannerDetails/BannerPartener";
import AboutMediaHome from "./AboutMediaHome";
import DonateBanner from "./DonateBanner";
// import Visitors from "../hooks/Visitors";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

const Home = () => {
  const { data: lastCom } = useAsync(() =>
    CommunicatedServices.getLastCommunicate()
  );
  // const location = useLocation();
  // const { registervisitor } = Visitors();
  // useEffect(() => {
  //   registervisitor(location);
  // }, []);

  usePageSEO({
    title: "Acceuil",
    description: "Acceuil",
    keywords: ["Santé", "Actualité", "Gap", "Alert", "Projet"],
    ogTitle: "Cosamed asbl",
    ogDescription:
      "Est une association à but non lucratif reconnue par le gouvernement congolais et composée de prestataires de santé allant des agents de santé communautaires aux médecins.",
    ogImage: "https://www.cosamed.org/",
    ogUrl: window.location.href,
  });

  return (
    <div className=" dark:bg-slate-900 text-sm ">
      <Hero />
      <BannerMission />
      <Blogs />
      <Bulletin />
      <SimpleBannerCommunicated commun={lastCom} />
      <BannerPartener />
      <AboutMediaHome />
      <DonateBanner />
    </div>
  );
};

export default Home;
