import ProjectServices from "../services/ProjectServices";
import useAsync from "../hooks/useAsync";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import { useTranslation } from "react-i18next";
import ProjectCard from "../components/blogs/ProjectCard";
const Project = () => {
  const { data, loading } = useAsync(() => ProjectServices.getProjetct());

  const { t } = useTranslation();

  return (
    <>
      <div className="p-6  dark:bg-slate-900 w-full  dark:text-white mx-auto space-y-6">
        <BreadCumb title={t("Project")} />
        <section className="mb-10 ">
          <header className="bg-principal dark:bg-slate-800 w-full dark:text-white text-white py-10">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold">{t("Project")}</h1>
              <p className="mt-4 text-lg">{t("Discover_all_our")}</p>
            </div>
          </header>
        </section>
        <section className=" mx-auto space-y-6">
          {loading
            ? Array.from(Array(6).keys()).map((_, i) => (
                <BlogDetailLoad key={i} />
              ))
            : data?.map((project: any, index: number) => (
                <ProjectCard projet={project} key={index} />
              ))}
        </section>
      </div>
    </>
  );
};

export default Project;
