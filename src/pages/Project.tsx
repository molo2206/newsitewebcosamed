import { useTranslation } from "react-i18next";
import BreadCumb from "../components/navbar/BreadCumb";

const Project = () => {
  const { t } = useTranslation();
  return (
    <div className="container dark:bg-slate-900 w-full dark:text-white  h-full py-4">
      <div>
        <BreadCumb title={t("Project")} />
        <section className="mb-10 ">
          <div className=" h-20">
            <h1 className=" font-semibold text-center dark:bg-slate-900 dark:text-slate-200 sm:text-sm md:text-3xl">
              {t("Project")}
            </h1>
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-4"></div>
        </section>
      </div>
    </div>
  );
};

export default Project;
