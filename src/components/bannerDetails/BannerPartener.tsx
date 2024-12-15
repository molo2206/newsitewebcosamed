import "react-multi-carousel/lib/styles.css";
import BlogCardLoand from "../../components/blogs/BlogCardLoad";
import useAsync from "../../hooks/useAsync";
import PartenersServices from "../../services/PartenersServices";
import { useTranslation } from "react-i18next";
import PartnerCard from "../../components/blogs/PartnerCard";
import { useNavigate } from "react-router-dom";

function BannerPartener() {
  const { t } = useTranslation();
  const { data, loading } = useAsync(() => PartenersServices.getPartners());
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate("/contact"); // Remplace "/about" par la route cible
  };
  return (
    <div className="container bg-white dark:bg-slate-800 mt-10 px-5">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="lg:text-xl md:text-lg font-extrabold text-gray-800 dark:text-white">
            {t("Partnerships")}
          </h1>
          <p className="text-gray-600 mt-2 lg:text-xl md:text-xl dark:text-white">{t("Data_how_collaborate")}</p>
        </header>

        {/* Liste des Partenaires */}
        <section className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 py-4">
          {loading
            ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
            : data.map((item: any, index: number) => (
                <PartnerCard partners={item} key={index} />
              ))}
        </section>

        {/* Section Contact */}
        <section className="mt-8 text-center dark:bg-slate-800">
          <h2 className="lg:text-xl md:text-lg font-extrabold text-gray-800 mb-4 dark:text-white">
            Devenir Partenaire
          </h2>
          <p className="text-gray-600 mb-6 lg:text-xl md:text-xl font-light dark:text-white">
            Si vous souhaitez devenir partenaire de notre organisation et
            rejoindre notre réseau d'excellence, contactez-nous dès aujourd'hui.
          </p>
          <button
              onClick={goToAbout}
              className="mt-4 px-6 py-2 bg-principal text-white rounded-md hover:bg-hover"
            >
              Aller à la page contactez-nous
            </button>
            
        </section>
        <br />
      </div>
    </div>
  );
}

export default BannerPartener;
