import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaDownload } from "react-icons/fa";

import useAsync from "../hooks/useAsync";
import BulletinServices from "../services/BulletinServices";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";

const DetailBulletin = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { lang } = useAuthContext();

  const { data, loading } = useAsync(
    () => BulletinServices.oneBulletin(id),
    id
  );

  return (
    <>
      {loading ? (
        Array.from({ length: 5 }).map((_, i) => <BlogDetailLoad key={i} />)
      ) : (
        <div className="bg-white dark:bg-slate-900 p-6 ">
          <div className="bg-white dark:bg-slate-800 border  p-6 w-full max-auto">
            <BreadCumb
              title="Détail du bulletin"
              second="/data-loading/newsletters"
              secondTitle="Bulletins"
            />

            <h1 className="text-xl md:text-2xl font-bold mb-4">
              Bulletin d'information sanitaire –{" "}
              {showingTranslateValue(data?.translations, lang)?.month +
                " " +
                showingTranslateValue(data?.translations, lang)?.year}
            </h1>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Publié en{" "}
              {showingTranslateValue(data?.translations, lang)?.month +
                " " +
                showingTranslateValue(data?.translations, lang)?.year}{" "}
              |{" "}
              <strong>
                {showingTranslateValue(data?.translations, lang)?.title}
              </strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Colonne image + download */}
              <div className="flex flex-col items-center">
                <img
                  src={data?.image}
                  alt="Bulletin santé"
                  className="w-40 h-40 rounded-lg shadow-md object-cover"
                />
                <a
                  href={data?.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="mt-4 inline-flex items-center gap-2 bg-principal text-white py-2 px-4 rounded hover:bg-hover transition"
                >
                  <FaDownload />
                  {t("Download")}
                </a>
              </div>

              {/* Colonne infos */}
              <div className="md:col-span-2 text-right space-y-3">
                <p>
                  <strong>Équipe COSAMED :</strong> Programme de gestion des
                  situations d'urgence sanitaire de COSAMED.
                </p>
                <p>
                  <strong>Éditeurs :</strong> Bureau de Goma
                </p>
                <p>
                  <strong>Nombre de pages :</strong> 3 pages
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailBulletin;
