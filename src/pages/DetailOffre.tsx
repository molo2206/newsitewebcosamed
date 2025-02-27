import { useNavigate, useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import OffresServices from "../services/OffresServices";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
} from "react-share";
import { useTranslation } from "react-i18next";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import moment from "moment";
import { date_format } from "../utils/heleprs";

const DetailOffre = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, loading } = useAsync(() => OffresServices.oneOffre(id), id);
  const urlShare = window.location.href;
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
        <div className=" bg-gray-100 dark:bg-slate-900 w-full dark:text-white flex items-center justify-center p-6">
          <div className="bg-white p-6 rounded-lg dark:bg-slate-800 dark:border dark:border-slate-700  dark:text-white shadow-lg w-full max-w-6xl">
            {/* Titre de l'offre */}
            {moment().format("YYYY-MM-DD") > data?.enddate && (
              <div className="">
                <p
                  className="bg-gradient-to-r bg-red-500 rounded p-2 flex items-center 
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
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">
                {data?.title}
              </h1>
              <div className="flex space-x-2 sm:space-x-4">
                <button
                  onClick={gojobapllication}
                  disabled={moment().format("YYYY-MM-DD") > data?.enddate}
                  className="bg-principal text-white p-4 rounded shadow hover:bg-hover"
                >
                  {t("Apply")}
                </button>
                <button
                  onClick={gojobapllication_user}
                  disabled={moment().format("YYYY-MM-DD") > data?.enddate}
                  className="bg-principal text-white p-4 rounded shadow hover:bg-hover"
                >
                  {t("Apply_last")}
                </button>
              </div>
            </div>

            {/* Informations générales */}
            <div className="mb-6 text-sm text-gray-600 dark:text-white ">
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
              <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Détail</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      Titre du poste
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {data?.title}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      Besoin
                    </td>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      Lieu de Prestation
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {data?.place}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      Catégorie / Grade
                    </td>
                    <td className="border border-gray-300 px-4 py-2">VII</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      Responsable Hiérarchique
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Emergency Program Director
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      Type de contrat
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {data?.type}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      Statut
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Éligible à la délocalisation
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      Niveau de risque de Sauvegarde
                    </td>
                    <td className="border border-gray-300 px-4 py-2">3</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      Date de l’offre
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {data?.startdate}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      Date de clôture
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {data?.enddate}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Sections supplémentaires */}
            <div className="mb-6 ">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 dark:text-white ">
                Les candidatures féminines sont fortement encouragées :
              </h2>
              <ul className="list-disc ml-6 text-sm text-gray-600 dark:text-white ">
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
                className="text-sm text-gray-600 leading-relaxed dark:text-white "
                dangerouslySetInnerHTML={{ __html: data?.description }}
              ></p>
            </div>
            <div className="px-1 py-2  rounded-2xl ">
              <h1 className=" mb-3 text-justify text-1xl font-bold sm:text-left sm:text-2xl dark:text-white ">
                {t("Share_on")}
              </h1>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white ">
                  {data?.title}
                </h1>

                <button
                  onClick={gojobapllication}
                  disabled={moment().format("YYYY-MM-DD") > data?.enddate}
                  className="bg-principal text-white p-4 py-2 mt-4 rounded shadow hover:bg-hover"
                >
                  {t("Apply")}
                </button>
              </div>
              <div className=" flex flex-col gap-3 ">
                <div className="flex gap-3 mr-6 items-center">
                  <FacebookShareButton
                    url={urlShare}
                    title={data?.description}
                    className="duration-200 hover:scale-105"
                    hashtag="#React"
                  >
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>
                  <WhatsappShareButton url={urlShare + data?.id}>
                    <WhatsappIcon size={32} round={true} />
                  </WhatsappShareButton>
                  <TwitterShareButton url={urlShare + data?.id}>
                    <TwitterIcon size={32} round={true} />
                  </TwitterShareButton>
                  <LinkedinShareButton url={urlShare + data?.id}>
                    <LinkedinIcon size={32} round={true} />
                  </LinkedinShareButton>
                  <TelegramShareButton url={urlShare + data?.id}>
                    <TelegramIcon size={32} round={true} />
                  </TelegramShareButton>
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
