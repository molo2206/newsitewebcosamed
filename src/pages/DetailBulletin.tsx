import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import BulletinServices from "../services/BulletinServices";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import { FaFacebook, FaTwitter, FaLinkedin, FaDownload } from "react-icons/fa";
import { useTranslation } from "react-i18next";
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
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className=" bg-white dark:bg-slate-900 p-6 flex items-center justify-center">
          <div className="bg-white shadow-lg  dark:bg-slate-800  rounded-lg p-6 w-full ">
            <BreadCumb
              title="Detail blog"
              second={"/data-loading/newsletters"}
              secondTitle={"Bulletin"}
            />
            <h1 className="lg:text-xl md:text-xl font-extrabold mb-4">
              Bulletin d'information -{" "}
              {showingTranslateValue(data?.translations, lang)?.month +
                "-" +
                showingTranslateValue(data?.translations, lang)?.year}
            </h1>
            <p className=" mb-6">
              Publié en{" "}
              {showingTranslateValue(data?.translations, lang)?.month +
                "-" +
                showingTranslateValue(data?.translations, lang)?.year}{" "}
              | {showingTranslateValue(data?.translations, lang)?.title}
            </p>

            {/* Contenu principal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Section Image */}
              <div className="col-span-1">
                <img
                  src={data?.image}
                  alt="Bulletin Santé"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>

              {/* Section Informations */}
              <div className="col-span-2">
                <div className="space-y-4">
                  <p className="">
                    <strong className="font-semibold">ÉQUIPE COSAMED :</strong>{" "}
                    Programme de gestion des situations d'urgence sanitaire de
                    COSAMED
                  </p>
                  <p className="">
                    <strong className="font-semibold">ÉDITEURS :</strong> BUREAU
                    DE GOMA
                  </p>
                  <p className="">
                    <strong className="font-semibold">NUMÉRO DE PAGES :</strong>{" "}
                    3
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <a
                    target="_blank"
                    href={data?.file}
                    download
                    className="flex items-center gap-2 bg-principal dark:bg-slate-900  text-white font-semibold py-2 px-4 rounded-lg hover:bg-hover transition"
                  >
                    <FaDownload />
                    {t("Download")} (2,4 MB)
                  </a>
                </div>
              </div>
            </div>

            {/* Accessoires supplémentaires */}
            <div className="mt-8 border-t pt-6">
              <h2 className="lg:text-xl md:text-xl font-bold  mb-4">
                {t("Share_on")}
              </h2>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-principal dark:text-white hover:text-hover dark:hover:text-hover"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-principal dark:text-white hover:text-hover dark:hover:text-hover"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-principal dark:text-white hover:text-hover dark:hover:text-hover"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailBulletin;
