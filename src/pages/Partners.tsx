import BlogCardLoand from "../components/blogs/BlogCardLoad";
import useAsync from "../hooks/useAsync";
import PartenersServices from "../services/PartenersServices";
import { useTranslation } from "react-i18next";
import BreadCumb from "../components/navbar/BreadCumb";
import { useNavigate } from "react-router-dom";
import usePageSEO from "../components/Seo/usePageSEO";
import { motion } from "framer-motion";
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
    <div className=" dark:bg-slate-900 w-full dark:text-white  h-full p-6">
      <div>
        <BreadCumb title={"Partners"} />

        <div className="">
          <header className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-[16px] font-bold">{t("Partnerships")}</h1>
              <p className="mt-4 text-[12px]">{t("Data_how_collaborate")}</p>
            </div>
          </header>

          {/* Liste des Partenaires */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10">
            {loading
              ? Array.from({ length: 20 }).map((_, i) => (
                  <BlogCardLoand key={i} />
                ))
              : data.map((partner: any, index: number) => (
                  <motion.article
                    key={partner?.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gray-50 dark:bg-slate-900 border dark:border-slate-700 rounded-md p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  >
                    <img
                      src={partner?.image}
                      alt={`Logo de ${partner?.full_name || "partenaire"}`}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mx-auto mb-4 transition-transform duration-300 group-hover:scale-105"
                    />

                    <h2 className="text-[12px] font-semibold text-gray-800 dark:text-white line-clamp-2">
                      {partner?.full_name}
                    </h2>

                    {partner?.url && (
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-[12px] text-principal hover:text-hover transition-colors"
                      >
                        Visitez leur site →
                      </a>
                    )}
                  </motion.article>
                ))}
          </section>

          <motion.section
            className="md:mt-12 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[13px] font-semibold text-gray-800 mb-4 dark:text-white">
              Devenir Partenaire
            </h2>

            <p className="text-gray-600 mb-6 text-[12px] dark:text-white">
              Si vous souhaitez devenir partenaire de notre organisation et
              rejoindre notre réseau d'excellence, contactez-nous dès
              aujourd'hui.
            </p>

            <motion.button
              onClick={goToAbout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-2 bg-principal text-[12px] text-white dark:bg-slate-800 dark:text-white rounded-md hover:bg-hover transition-colors"
            >
              Aller à la page contactez-nous
            </motion.button>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Partners;
