import Hero from "../components/hero/Hero";
import Blogs from "../components/blogs/Blogs";
import BannerMission from "../components/bannerDetails/BannerMission";
import Bulletin from "../components/blogs/Bulletin";

import usePageSEO from "../components/Seo/usePageSEO";
import DonateBanner from "./DonateBanner";
// import Visitors from "../hooks/Visitors";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

const Home = () => {
  // const location = useLocation();
  // const { registervisitor } = Visitors();
  // useEffect(() => {
  //   registervisitor(location);
  // }, []);

  usePageSEO({
    title: "Acceuil | COSAMED ASBL",
    description: "Acceuil",
    keywords: ["Santé", "Actualité", "Gap", "Alert", "Projet"],
    ogTitle: "Cosamed asbl",
    ogDescription:
      "Est une association à but non lucratif reconnue par le gouvernement congolais et composée de prestataires de santé allant des agents de santé communautaires aux médecins.",
    ogImage: "https://www.cosamed.org/",
    ogUrl: window.location.href,
  });

  return (
    <div className=" bg-slate-100 dark:bg-slate-900 text-sm ">
      <Hero />
      <BannerMission />
      <Blogs />
      <Bulletin />
      <DonateBanner />
    </div>
  );
};

export default Home;
