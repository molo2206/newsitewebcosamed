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
  return error ? (
    <Error404 />
  ) : (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="bg-gray-100 min-h-screen p-6">
          {/* Header Section */}{" "}
          <BreadCumb
            title="Detail"
            second={"/load-data/communicated"}
            secondTitle={t("Project")}
          />
          <div className="max-w-4xl mx-auto text-center my-8">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              {showingTranslateValue(data?.translations, lang)?.title}
            </h1>
            <p className="text-gray-600">
              {date_format(data?.updated_at)} | Publication
            </p>
          </div>
          {/* Content Section */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Left Column - Image and Download */}
            <div className="bg-white p-6 rounded-lg shadow-md md:col-span-1">
              <img
                src={data?.image}
                alt="NTD Report Cover"
                className="w-full h-72 rounded-lg"
              />
              <a
                href={data?.file}
                target="_blank"
                download
                className="block bg-principal cursor-pointer text-white text-center font-semibold mt-4 py-2 rounded-lg"
              >
                Download (2,4 MB)
              </a>
            </div>

            {/* Middle Column - Overview */}
            <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
              <h2 className="text-xl font-semibold text-principal">Aperçu</h2>
              <p
                className="text-gray-700 mt-2 font-light"
                dangerouslySetInnerHTML={{
                  __html: showingTranslateValue(data?.translations, lang)
                    ?.description,
                }}
              ></p>
            </div>
          </div>
          {/* Additional Information Section */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-sm font-semibold text-principal">
                Date débutoire
              </h2>
              <p className="text-gray-700 text-sm">
                Début projet: {data?.datestarted}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-sm font-semibold text-principal">
                Date finale
              </h2>
              <p className="text-gray-700 text-sm">
                Fin projet {data?.dateend}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-sm font-semibold text-principal">
                Nombre des pages
              </h2>
              <p className="text-gray-700">4</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-sm font-semibold text-principal">Auteur</h2>
              <p className="text-gray-700 text-sm">ISBN: 978-92-9-023504-0</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailProject;
