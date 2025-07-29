import { useNavigate, useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import OffresServices from "../services/OffresServices";

import { useTranslation } from "react-i18next";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import moment from "moment";
import { date_format } from "../utils/heleprs";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const DetailOffre = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, loading } = useAsync(() => OffresServices.oneOffre(id), id);
  const cleanHtml = (html: string): string => {
    return html
      .replace(/<p>\s*<\/p>/g, "") // supprimer <p> vides
      .replace(/<div>\s*<\/div>/g, "") // supprimer <div> vides
      .replace(/<br\s*\/?>/g, "<br />") // uniformiser les <br>
      .split(/\r?\n/)
      .filter((line) => line.trim() !== "")
      .join("\n");
  };

  const navigate = useNavigate();
  const gojobapllication = () => {
    navigate("/recruiting/cosamed/job_openings/jobapplication/" + id); // Remplace "/about" par la route cible
  };
  const gojobapllication_user = () => {
    navigate("/recruiting/cosamed/job_openings/jobapplication_user/" + id); // Remplace "/about" par la route cible
  };

  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="max-w-6xl mx-auto bg-gray-100 dark:bg-slate-900 w-full dark:text-white flex items-center justify-center p-6">
          <div className="bg-white p-6  dark:bg-slate-800 dark:border dark:border-slate-700  dark:text-white shadow-lg w-full rounded-md">
            {/* Titre de l'offre */}
            {moment().format("YYYY-MM-DD") > data?.enddate && (
              <div className="">
                <p
                  className="bg-gradient-to-r bg-red-500 p-2 flex items-center 
                justify-center text-white sm:text-sm md:text-sm dark:text-slate-200"
                >
                  {t("Job_off")}
                </p>
                <a
                  href="/contact"
                  className=" text-principal text-sm underline"
                >
                  Contacter-nous
                </a>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h1 className="text-[16px] font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">
                {data?.title}
              </h1>
              <div className="flex space-x-2 sm:space-x-4">
                <button
                  onClick={gojobapllication}
                  disabled={moment().format("YYYY-MM-DD") > data?.enddate}
                  className="bg-principal text-[13px] text-white p-4 rounded shadow hover:bg-hover"
                >
                  {t("Apply")}
                </button>
                <button
                  onClick={gojobapllication_user}
                  disabled={moment().format("YYYY-MM-DD") > data?.enddate}
                  className="bg-principal text-[13px] text-white p-4 rounded shadow hover:bg-hover"
                >
                  {t("Apply_last")}
                </button>
              </div>
            </div>

            {/* Informations générales */}
            <div className="mb-6 text-[13px] text-gray-600 dark:text-white ">
              <p>
                <span className="font-semibold">Job Category:</span> -
              </p>
              <p>
                <span className="font-semibold">Requisition Number:</span>{" "}
                207DI005577
              </p>
              <p className="mt-2">
                <span className="font-semibold">Posted:</span>{" "}
                {date_format(data?.updated_at)}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {data?.type}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {data?.place}
              </p>
            </div>

            {/* Détails sous forme de tableau */}
            <div className="overflow-x-auto mb-6 ">
              <table className="table-auto border-collapse border border-gray-300  dark:border-slate-700 w-full text-sm text-left">
                <thead>
                  <tr className="bg-gray-100  text-[12px] dark:bg-slate-800">
                    <th className="border border-gray-300 dark:border-slate-700  px-4 py-2">
                      Détail
                    </th>
                    <th className="border border-gray-300 dark:border-slate-700  px-4 py-2">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[12px]">
                  <tr>
                    <td className="border border-gray-300 dark:border-slate-700 px-4 py-2 font-semibold">
                      Titre du poste
                    </td>
                    <td className="border border-gray-300  dark:border-slate-700 px-4 py-2">
                      {data?.title}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2 font-semibold">
                      Besoin
                    </td>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2">
                      1
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2 font-semibold">
                      Lieu de Prestation
                    </td>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2">
                      {data?.place}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2 font-semibold">
                      Catégorie / Grade
                    </td>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2">
                      VII
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2 font-semibold">
                      Responsable Hiérarchique
                    </td>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2">
                      Emergency Program Director
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2 font-semibold">
                      Type de contrat
                    </td>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2">
                      {data?.type}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2 font-semibold">
                      Statut
                    </td>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2">
                      Éligible à la délocalisation
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2 font-semibold">
                      Niveau de risque de Sauvegarde
                    </td>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2">
                      3
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2 font-semibold">
                      Date de l’offre
                    </td>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2">
                      {data?.startdate}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2 font-semibold">
                      Date de clôture
                    </td>
                    <td className="border border-gray-300 dark:border-slate-700  px-4 py-2">
                      {data?.enddate}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Sections supplémentaires */}
            <div className="mb-6 ">
              <h2 className="text-[13px] font-semibold text-gray-800 mb-2 dark:text-white ">
                Les candidatures féminines sont fortement encouragées :
              </h2>
              <ul className="list-disc ml-6 text-[12px] text-gray-600 dark:text-white ">
                <li>
                  La grossesse n’est pas un critère d’exclusion dans notre
                  processus de recrutement.
                </li>
                <li>
                  Le congé de maternité est de 18 semaines et payé à 100%.
                </li>
                <li>
                  Des conditions de voyage sur terrain favorables aux femmes
                  ayant des bébés.
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 dark:text-white ">
                Description :
              </h2>
              <p
                className="text-[12px] text-gray-600 leading-relaxed dark:text-white "
                dangerouslySetInnerHTML={{
                  __html: cleanHtml(data?.description || ""),
                }}
              ></p>
            </div>
            <div className="px-1 py-2  rounded-2xl ">
              <div className="flex space-x-2 sm:space-x-4">
                <button
                  onClick={gojobapllication}
                  disabled={moment().format("YYYY-MM-DD") > data?.enddate}
                  className="bg-principal text-[13px] text-white p-4 rounded shadow hover:bg-hover"
                >
                  {t("Apply")}
                </button>
                <button
                  onClick={gojobapllication_user}
                  disabled={moment().format("YYYY-MM-DD") > data?.enddate}
                  className="bg-principal text-[13px] text-white p-4 rounded shadow hover:bg-hover"
                >
                  {t("Apply_last")}
                </button>
              </div>
              <div className="mt-10 border-t pt-6 dark:border-slate-600">
                <h2 className="text-[11px] font-semibold mb-4 text-gray-800 dark:text-white relative">
                  {t("Share_on")}
                  <span className="block w-6 h-1 bg-blue-500 mt-1 rounded"></span>
                </h2>

                <div className="flex gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Partager sur Facebook"
                    aria-label="Partager sur Facebook"
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 transition-all"
                  >
                    <FaFacebook className="text-blue-600" size={15} />
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Partager sur Twitter"
                    aria-label="Partager sur Twitter"
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-sky-100 hover:bg-sky-200 dark:bg-sky-900 dark:hover:bg-sky-800 transition-all"
                  >
                    <FaTwitter className="text-sky-500" size={15} />
                  </a>

                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Partager sur LinkedIn"
                    aria-label="Partager sur LinkedIn"
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 transition-all"
                  >
                    <FaLinkedin className="text-blue-700" size={15} />
                  </a>
                </div>
              </div>
            </div>
            <div>
              <img
                src={data?.author?.image}
                className=" h-[70px] px-30 rounded-full duration-200 hover:scale-105"
              />
              <p className="text-xl font-bold ">{data?.author?.full_name}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailOffre;
