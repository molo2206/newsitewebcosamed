import TeamsServices from "../services/TeamsServices";
import useAsync from "../hooks/useAsync";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import TeamCard from "../components/blogs/TeamCard";
import BreadCumb from "../components/navbar/BreadCumb";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import usePageSEO from "../components/Seo/usePageSEO";
import Pagination from "../components/Pagination/Pagination";

const Team = () => {
  const { data = [], loading } = useAsync(() => TeamsServices.getTeam());
  const { t } = useTranslation();

  usePageSEO({
    title: "Gouvernance",
    description: "Gouvernance",
    keywords: ["Santé", "Actualité", "Gap", "Alert", "Projet"],
    ogTitle: "Cosamed asbl",
    ogDescription:
      "Est une association à but non lucratif reconnue par le gouvernement congolais et composée de prestataires de santé allant des agents de santé communautaires aux médecins.",
    ogImage: "https://www.cosamed.org/",
    ogUrl: window.location.href,
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentMembers = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <main className="bg-white dark:bg-slate-900 w-full min-h-screen dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <BreadCumb title={t("Reports")} />

        <motion.header
          className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[16px] font-bold">{t("Rencontrez notre équipe")}</h1>
          <p className="mt-4 text-[12px]">
            {t(
              "Nous sommes une équipe de professionnels dévoués qui travaillent pour réaliser de grandes choses."
            )}
          </p>
        </motion.header>

        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          {loading
            ? Array.from(Array(postsPerPage).keys()).map((_, i) => <BlogDetailLoad key={i} />)
            : currentMembers.map((member: any, index: number) => (
                <motion.div
                  key={member.id || index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <TeamCard team={member} />
                </motion.div>
              ))}
        </motion.section>

        {/* Pagination */}
        {!loading && (
          <div className="mt-10">
            <Pagination
              postsPerPage={postsPerPage}
              totalPasts={data.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Team;
