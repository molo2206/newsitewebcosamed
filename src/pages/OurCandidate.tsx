import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context";
import LoginPage from "./Auth/LoginPage";
import { useState } from "react";
import CandidateServices from "../services/CandidateServices";
import useAsync from "../hooks/useAsync";
import { date_format, limittext } from "../utils/heleprs";
import AllPageLoad from "../components/blogs/AllPageLoad";

const OurCandidate = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = (row: any) => {
    setSelected(row);
    setIsOpen(!isOpen);
  };
  const closePanel = () => {
    setSelected(null);
    setIsOpen(false);
  };

  const { data, loading } = useAsync(
    () => CandidateServices.getCandidate(user?.id),
    [user?.id]
  );

  const Accountsettings = () => {
    navigate("/recruiting/cosamed/job_openings/accountsettings"); // Remplace "/about" par la route cible
  };

  const [currentTab, setCurrentTab] = useState(1);

  const onChangeTab = (tab: any) => {
    setCurrentTab(tab.id);
  };

  console.log(data?.application_pending);
  const tabs = [
    { id: 1, title: "Actives" },
    { id: 2, title: "Inactives" },
  ];

  return (
    <div>
      {!user ? (
        <LoginPage />
      ) : (
        <div className="min-h-screen bg-gray-100 p-6 dark:bg-slate-900">
          {/* Titre et Description */}
          <h1 className="text-2xl font-light mb-2">Mes candidatures</h1>
          <p className=" mb-6">
            Nous sommes en train d’examiner avec toute l’attention toutes les
            candidatures à ce poste vacant. Dans la mesure où vos compétences
            correspondent à nos exigences, nous prendrons contact avec vous.
            Vous pouvez vérifier le dernier statut de votre candidature via
            l'onglet « Ma candidature » ​​sur le portail des carrières. Merci de
            votre intérêt à rejoindre notre équipe !
          </p>

          {/* Tabs */}
          {loading ? (
            Array.from(Array(20).keys()).map(() => <AllPageLoad />)
          ) : (
            <div className="flex border-b mb-4">
              {tabs.map((tab) => (
                <button
                  onClick={() => onChangeTab(tab)}
                  key={tab.id}
                  className={`font-bold py-2 px-4 border-b-2 border-principal
                    ${
                      currentTab === tab.id
                        ? "bg-principal text-white "
                        : "bg-white text-principal"
                    }  hover:bg-hover hover:text-white font-extrabold text-center`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          )}

          {/* Tableau */}
          <div className="overflow-x-auto">
            {currentTab === 1 && (
              <table className="min-w-full text-sm table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 dark:bg-slate-800">
                    <th className="border border-gray-200 p-3 text-left">
                      Désignation de l'emploi
                    </th>
                    <th className="border border-gray-200 p-3 text-left">
                      Type d'emploi
                    </th>
                    <th className="border border-gray-200 p-3 text-left">
                      Statut de ma candidature
                    </th>
                    <th className="border border-gray-200 p-3 text-left">
                      Date de soumission
                    </th>
                    <th className="border border-gray-200 p-3 text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.application_pending?.map((item: any) => (
                    <tr className="bg-gray-50 dark:bg-slate-900 text-sm">
                      <td className="border border-gray-200 p-3">
                        {item?.offres?.title}
                      </td>
                      <td className="border border-gray-200 p-3">
                        {item?.offres?.type}
                      </td>
                      <td className="border border-gray-200 p-3 text-green-600 font-bold">
                        <span className="p-2 bg-green-100 rounded-md shadow-xl ">
                          Your Application Is {item?.status}
                        </span>
                      </td>
                      <td className="border border-gray-200 p-3">
                        {date_format(item?.updated_at)}
                      </td>
                      <td className="border border-gray-200 p-3 text-center">
                        <button
                          onClick={() => togglePanel(item)}
                          className="bg-principal text-white px-4 py-2 rounded hover:bg-hover transition"
                        >
                          {isOpen
                            ? "Fermer le panneau"
                            : limittext("Afficher la candidature", 8)}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="overflow-x-auto">
            {currentTab === 2 && (
              <table className="min-w-full text-sm table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 dark:bg-slate-800">
                    <th className="border border-gray-200 p-3 text-left">
                      Désignation de l'emploi
                    </th>
                    <th className="border border-gray-200 p-3 text-left">
                      Type d'emploi
                    </th>
                    <th className="border border-gray-200 p-3 text-left">
                      Statut de ma candidature
                    </th>
                    <th className="border border-gray-200 p-3 text-left">
                      Date de soumission
                    </th>
                    <th className="border border-gray-200 p-3 text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.application_pending?.map((item: any) => (
                    <tr className="bg-gray-50 dark:bg-slate-900">
                      <td className="border border-gray-200 p-3">
                        {item?.offres?.title}
                      </td>
                      <td className="border border-gray-200 p-3">
                        {item?.offres?.type}
                      </td>
                      <td className="border border-gray-200 p-3 text-red-400 font-bold">
                        <span className=" p-2 bg-red-100 shadow-xl">
                          Your Application Is {item?.status}
                        </span>
                      </td>
                      <td className="border border-gray-200 p-3">
                        {date_format(item?.updated_at)}
                      </td>
                      <td className="border border-gray-200 p-3 text-center">
                        <button
                          onClick={togglePanel}
                          className="bg-principal text-white px-4 py-2 rounded hover:bg-hover transition"
                        >
                          {isOpen
                            ? "Fermer le panneau"
                            : limittext("Afficher la candidature", 8)}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <br />

          <div className=" mt-10  mx-auto bg-white p-6 rounded-lg shadow-md dark:bg-slate-800">
            <h1 className="text-2xl font-semibold  mb-4 ">Mon compte</h1>
            {/* Description */}
            <p className=" mb-6">
              Pour mettre à jour vos données personnelles, cliquez sur{" "}
              <strong>Mettre à jour les coordonnées</strong>. Pour modifier
              l'adresse e-mail de votre compte, cliquez sur{" "}
              <strong>Modifier les paramètres du compte</strong>.
            </p>
            {/* Boutons */}
            <div className="flex gap-4">
              <button
                onClick={Accountsettings}
                className="bg-principal text-white dark:text-text-900 border  dark:bg-slate-800  px-4 py-2 rounded-lg hover:bg-hover"
              >
                Mettre à jour les coordonnées
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-gray-100 flex items-center justify-center">
        {/* Panneau coulissant */}
        <div
          className={`fixed  top-0 mt-auto right-0 h-full md:w-[650px] text-sm w-[200px] bg-white shadow-lg border-l border-gray-300 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 h-full overflow-y-scroll">
            <button
              onClick={closePanel}
              className="self-end text-gray-500 hover:text-gray-700 mb-4"
            >
              ✖
            </button>
            <div className="border-b pb-4 mb-4">
              <h1 className="text-2xl font-semibold text-gray-700">
                {selected?.offres?.title}
              </h1>
              <p className="p-2 font-medium mt-2">
                Statut de la candidature :{" "}
                <span className="font-semibold p-2 bg-green-200 shadow-xl text-green-600 bg-green-100 rounded-md">
                  Your Application Is Currently {selected?.status}
                </span>
              </p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Mes données personnelles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-800">Nom légal :</p>
                  <p className="text-gray-600">Mr/Mm. {selected?.full_name}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Téléphone :</p>
                  <p className="text-gray-600">
                    {selected?.phone}(Private Mobile)
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Adresse :</p>
                  <p className="text-gray-600">
                    -
                    <br />
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    Comment nous avez-vous connus ?
                  </p>
                  <p className="text-gray-600">Cosamed Career site</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="font-medium text-gray-800">E-mail :</p>
                  <p className="text-gray-600">{selected?.email}</p>
                </div>
              </div>
            </div>
            <div className="mb-6 border-t pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Mes études
              </h2>
              {data?.etude?.map((item: any, index: number) => (
                <div className="mb-6 border-t-1">
                  <h3 className="text-sm font-bold text-gray-700">
                    Étude {index + 1}
                  </h3>
                  <div className="mt-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">
                        Établissement ou université:
                      </span>{" "}
                      {item.institution}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Diplôme:</span>{" "}
                      {item.title}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Domaine d'études:</span> -
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">De:</span>{" "}
                      {date_format(item.endDate)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">
                        À (année réelle ou prévue):
                      </span>{" "}
                      {date_format(item.endDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-6 border-t pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Expérience professionnelle
              </h2>
              {data?.experiences?.map((item: any, index: number) => (
                <div className="">
                  {/* Expérience professionnelle 1 */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-700">
                      Expérience professionnelle {index + 1}
                    </h3>
                    <div className="mt-2">
                      <p className="text-gray-600">
                        <span className="font-semibold">
                          Désignation de l'emploi:
                        </span>{" "}
                        {item?.job_title}/{item?.company_name}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Unité légale:</span> No
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Emploi actuel:</span> No
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">De:</span>{" "}
                        {item?.start_date}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">À:</span>{" "}
                        {item?.end_date}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">
                          Description du rôle:
                        </span>{" "}
                        {item?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-6 border-t pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Langues
              </h2>
              {data?.languages?.map((item: any, index: number) => (
                <div>
                  <h2 className="text-sm font-semibold text-gray-800 mb-4">
                    Langue {index + 1} / {item?.langue}
                  </h2>
                  <div className="grid grid-cols-2 gap-4 ">
                    <div className="py-2">
                      <p className="text-gray-600">
                        <span className="font-semibold">1. Speaking:</span>{" "}
                        {item?.speaking}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">2. Reading:</span>{" "}
                        {item?.reading}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        <span className="font-semibold">3. Writing:</span>{" "}
                        {item?.writing}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">4. Comprehension:</span>{" "}
                        {item?.comprehension}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Aptitudes</h2>
              <ul className="list-disc list-inside space-y-2">
                {data?.skills?.map((item: any) => (
                  <li>{item?.skill_name}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">CV</h2>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    cv_pacifique {selected?.full_name}.pdf
                  </span>
                </div>
                <div className="text-sm text-gray-500">1,05 MB</div>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Cover Letter</h2>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    cover_letter_pacifique {selected?.full_name}.pdf
                  </span>
                </div>
                <div className="text-sm text-gray-500">1,05 MB</div>
              </div>
            </div>
            <div className="mb-6 border-t pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Certificats/Attestation
              </h2>
              {data?.certificates?.map((item: any, index: number) => (
                <div>
                  <h2 className="text-sm font-semibold text-gray-800 mb-4">
                    Attestation {index + 1} / {item?.title}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        {item?.title}.pdf
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">1,05 MB</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCandidate;
