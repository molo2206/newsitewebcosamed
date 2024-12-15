import { MdNotificationAdd } from "react-icons/md";

const AlertPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 dark:bg-slate-900">
      {/* Titre principal */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Alertes d'emploi
      </h1>
      <p className="text-gray-600 mb-6">
        Nous vous enverrons un e-mail si un emploi correspond à vos préférences.
      </p>
      {/* Bouton créer une alerte */}
      <div className="mb-6 ">
        <button className="flex items-center px-4 py-2 bg-principal text-white font-medium rounded-lg hover:bg-hover">
          <MdNotificationAdd />
          Créer une alerte d'emploi
        </button>
      </div>

      {/* Tableau des alertes */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden ">
        <table className="min-w-full text-left text-sm text-gray-700 ">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-3 font-medium dark:text-white">Nom</th>
              <th className="px-4 py-3 font-medium dark:text-white">Filtres</th>
              <th className="px-4 py-3 font-medium dark:text-white">Fréquence</th>
              <th className="px-4 py-3 font-medium dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Exemple de ligne */}
            <tr className="border-t hover:bg-gray-50 dark:bg-slate-800">
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3 truncate">
                
              </td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">
                <button className="text-blue-600 hover:underline"></button>
              </td>
              {/* <td className="px-4 py-3">New Offre</td>
              <td className="px-4 py-3 truncate">
                Executive Management, Evaluation, Innovation, Information
                Management...
              </td>
              <td className="px-4 py-3">Hebdomadaire</td>
              <td className="px-4 py-3">
                <button className="text-blue-600 hover:underline">Gérer</button>
              </td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertPage;
