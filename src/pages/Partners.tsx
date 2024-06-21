import BlogCardLoand from "../components/blogs/BlogCardLoad";
import useAsync from "../hooks/useAsync";
import PartenersServices from "../services/PartenersServices";
import { useTranslation } from "react-i18next";
import PartnerCard from "../components/blogs/PartnerCard";
import BreadCumb from "../components/navbar/BreadCumb";
const Partners = () => {
  const { t } = useTranslation();
  const { data, loading } = useAsync(() => PartenersServices.getPartners());
  return (
    <div className="container dark:bg-slate-900 w-full dark:text-white  h-full py-4">
      <div>
        <BreadCumb title={"Partners"} />
        <section className="mb-10 ">
          <div className=" h-20">
            <h1 className=" font-semibold text-center dark:bg-slate-900 dark:text-slate-200 sm:text-sm md:text-3xl">
              {t("How_collaborate")}
            </h1>
          </div>
          <div className=" bg-slate-400">
            <h1 className=" font-semibold text-center dark:bg-slate-900 dark:text-slate-200 sm:text-sm md:text-md">
              {t("Data_how_collaborate")}
            </h1>
          </div>
          <h1 className=" mb-8 border-l-8 py-2 pl-2 text-center text-3xl font-bold">
            {t("Partners")}
          </h1>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-4">
            {loading
              ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
              : data.map((item: any, index: number) => (
                  <PartnerCard partners={item} key={index} />
                ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Partners;
