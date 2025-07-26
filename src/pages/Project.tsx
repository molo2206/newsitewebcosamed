import ProjectServices from "../services/ProjectServices";
import useAsync from "../hooks/useAsync";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import { useTranslation } from "react-i18next";
import ProjectCard from "../components/blogs/ProjectCard";
import { motion } from "framer-motion";

const Project = () => {
  const { data, loading } = useAsync(() => ProjectServices.getProjetct());
  const { t } = useTranslation();

  return (
    <div className="p-6 mx-auto dark:bg-slate-900 w-full dark:text-white min-h-screen">
      {/* Breadcrumb */}
      <div className="px-6 pt-6">
        <BreadCumb title={t("Project")} />
      </div>

      {/* Hero header */}

      <section className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md">
        <h1 className="text-[16px] font-bold uppercase tracking-widest">
          {t("Project")}
        </h1>
      </section>

      {/* Grid des projets */}
      <section className=" mx-auto  py-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogDetailLoad key={i} />
            ))}
          </div>
        ) : (
          <>
            {data?.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
              >
                {data.map((project: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard projet={project} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-300 mt-8">
                {t("No_project_found")}
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Project;
