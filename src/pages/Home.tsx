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
import { useEffect, useState } from "react";

const Home = () => {
  const { data: lastCom } = useAsync(() =>
    CommunicatedServices.getLastCommunicate()
  );
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
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    // Afficher le div après le chargement de la page
    setShowDiv(true);

    // Facultatif : cacher le div après un certain temps
    const timer = setTimeout(() => setShowDiv(false), 10000); // 5 secondes
    return () => clearTimeout(timer); // Nettoyage du timer
  }, []);
  return (
    <div className=" dark:bg-slate-900 text-sm ">
      {showDiv && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Bienvenue !</h2>
            <p className="text-gray-600">Chargement de données.</p>
          </div>
        </div>
      )}
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
