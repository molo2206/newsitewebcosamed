import { BiNotification } from "react-icons/bi";
import { Fa42Group } from "react-icons/fa6";
import { MdNotificationAdd } from "react-icons/md";

const AlertPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Titre principal */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Alertes d'emploi</h1>
      <p className="text-gray-600 mb-6">
        Nous vous enverrons un e-mail si un emploi correspond à vos préférences.
      </p>
      {/* Bouton créer une alerte */}
      <div className="mb-6">
        <button className="flex items-center px-4 py-2 bg-principal text-white font-medium rounded-lg hover:bg-hover">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1 0h-1m1-4v4m0 0h2m1-2h-2v2h2V9m-6 6h-1v-4h1v4zm4 0h-1v-4h1v4z" />
          </svg> */}
          <MdNotificationAdd />
          Créer une alerte d'emploi
        </button>
      </div>

      {/* Tableau des alertes */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700">Nom</th>
              <th className="px-4 py-3 font-medium text-gray-700">Filtres</th>
              <th className="px-4 py-3 font-medium text-gray-700">Fréquence</th>
              <th className="px-4 py-3 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Exemple de ligne */}
            <tr className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">New Offre</td>
              <td className="px-4 py-3 truncate">
                Executive Management, Evaluation, Innovation, Information Management...
              </td>
              <td className="px-4 py-3">Hebdomadaire</td>
              <td className="px-4 py-3">
                <button className="text-blue-600 hover:underline">Gérer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertPage;
