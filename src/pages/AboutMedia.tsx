import { useTranslation } from "react-i18next";
import BannerMedia from "../components/simpleBanner/BannerMedia";

const AboutMedia = () => {
  const { t } = useTranslation();
  return (
    <div className="container  dark:bg-slate-900 w-full dark:text-white">
      <div className=" px-4 lg:px-14 max-w-screen-2xl mx-auto my-8  py-20">
        <div className=" md:w-12/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="  ">
            <h2 className=" text-5xl text-principal text-neutralDGray font-bold mb-4 ">
              Médias & ressources
            </h2>
          </div>
          <div className="">
            <p className=" text-3xl">
              Actualités, vidéos, histoires, données et publications pour les
              professionnels des médias, les chercheurs et tous ceux qui
              souhaitent en savoir plus sur les urgences sanitaires.
            </p>
          </div>
        </div>
        <div className=" py-6">
          <img
            src="../../src/assets/blogs/j3.webp"
            alt=""
            className="mx-auto w-full h-full
            object-cover transition duration-700 "
          />
        </div>
        <BannerMedia />
      </div>
      
    </div>
  );
};

export default AboutMedia;
