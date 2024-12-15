import BlogCardLoand from "../components/blogs/BlogCardLoad";
import useAsync from "../hooks/useAsync";
import PartenersServices from "../services/PartenersServices";
import { useTranslation } from "react-i18next";
import BreadCumb from "../components/navbar/BreadCumb";
import { useNavigate } from "react-router-dom";
import usePageSEO from "../components/Seo/usePageSEO";
const Partners = () => {
  const { t } = useTranslation();
  const { data, loading } = useAsync(() => PartenersServices.getPartners());
  const navigate = useNavigate();
  const goToAbout = () => {
    navigate("/contact"); // Remplace "/about" par la route cible
  };
  usePageSEO({
    title: "Partenariats",
    description: "Partenariats",
    keywords: ["Santé", "Actualité", "Gap", "Alert", "Projet"],
    ogTitle: "Cosamed asbl",
    ogDescription:
      "Est une association à but non lucratif reconnue par le gouvernement congolais et composée de prestataires de santé allant des agents de santé communautaires aux médecins.",
    ogImage: "https://www.cosamed.org/",
    ogUrl: window.location.href,
  });
  return (
    <div className="container dark:bg-slate-900 w-full dark:text-white  h-full py-2">
      <div>
        <BreadCumb title={"Partners"} />

        <div className="">
          <header className="bg-principal dark:bg-slate-800 w-full dark:text-white rounded-lg text-white py-10">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold">{t("Partnerships")}</h1>
              <p className="mt-4 text-lg">{t("Data_how_collaborate")}</p>
            </div>
          </header>

          {/* Liste des Partenaires */}
          <section className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8 mt-10">
            {loading
              ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
              : data.map((partners: any) => (
                  <div
                    key={partners?.id}
                    className="bg-white border dark:bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={partners?.image}
                      alt={`Logo de ${partners.image}`}
                      className="w-64 h-64 object-contain mx-auto mb-4"
                    />
                    <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-white">
                      {partners?.full_name}
                    </h2>
                    <a
                      href={partners?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-principal hover:text-hover"
                    >
                      Visitez leur site →
                    </a>
                  </div>
                ))}
          </section>
          {/* Section Contact */}
          <section className="md:mt-12 text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 dark:text-white">
              Devenir Partenaire
            </h2>
            <p className="text-gray-600 mb-6 text-xl dark:text-white">
              Si vous souhaitez devenir partenaire de notre organisation et
              rejoindre notre réseau d'excellence, contactez-nous dès
              aujourd'hui.
            </p>
            <button
              onClick={goToAbout}
              className="mt-4 px-6 py-2 bg-principal text-white dark:bg-slate-800 dark:text-white rounded-md hover:bg-hover"
            >
              Aller à la page contactez-nous
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Partners;
