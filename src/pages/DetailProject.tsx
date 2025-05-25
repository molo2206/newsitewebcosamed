import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import ProjectServices from "../services/ProjectServices";
import { date_format, showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import { useTranslation } from "react-i18next";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import Error404 from "./Error404";

const DetailProject = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { lang } = useAuthContext();

  const { data, error, loading } = useAsync(
    () => ProjectServices.oneProject(id),
    id
  );

  const translation = showingTranslateValue(data?.translations, lang);

  if (error) return <Error404 />;

  if (loading)
    return (
      <>
        {Array.from(Array(3).keys()).map((_, idx) => (
          <BlogDetailLoad key={idx} />
        ))}
      </>
    );

  return (
    <div className=" dark:bg-slate-900 text-gray-800 dark:text-gray-100 p-6 md:px-8">
      {/* Fil d'ariane */}
      <BreadCumb
        title={translation?.title}
        second={"/load-data/communicated"}
        secondTitle={t("Project")}
      />

      {/* En-tête */}
      <div className=" mx-auto text-center my-10">
        <h1 className="text-3xl font-bold text-[#0072CE] mb-2 leading-snug">
          {translation?.title}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {date_format(data?.updated_at)} &nbsp;|&nbsp; {t("Published")}
        </p>
      </div>

      {/* Section principale */}
      <div className="mx-auto grid md:grid-cols-3 gap-8">
        {/* Colonne image & téléchargement */}
        <div className="md:col-span-1 bg-white dark:bg-slate-800 p-4  shadow-sm">
          <img
            src={data?.image}
            alt={translation?.title}
            className="w-full h-64 object-cover  mb-4"
          />
          {data?.file && (
            <a
              href={data?.file}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#0072CE] text-white text-center py-2 rounded font-semibold hover:bg-[#005ea6] transition"
            >
              {t("Download")} (2.4 MB)
            </a>
          )}
        </div>

        {/* Colonne contenu */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6  shadow-sm">
          <h2 className="text-xl font-semibold text-[#0072CE] mb-4">
            {t("Overview")}
          </h2>
          <div
            className="text-gray-700 dark:text-gray-100 text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: translation?.description }}
          />
        </div>
      </div>

      {/* Informations complémentaires */}
      <div className=" mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        <InfoCard label={t("Start Date")} value={data?.datestarted || "—"} />
        <InfoCard label={t("End Date")} value={data?.dateend || "—"} />
        <InfoCard label={t("Pages")} value={"4"} />
        <InfoCard label={t("Author")} value={"ISBN: 978-92-9-023504-0"} />
      </div>
    </div>
  );
};

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white dark:bg-slate-800 p-5 shadow-sm">
    <h3 className="text-sm font-semibold text-[#0072CE] mb-2">{label}</h3>
    <p className="text-sm text-gray-800 dark:text-gray-100">{value}</p>
  </div>
);

export default DetailProject;
