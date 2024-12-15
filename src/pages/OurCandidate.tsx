import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context";
import LoginPage from "./Auth/LoginPage";

const OurCandidate = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const Accountsettings = () => {
    navigate("/recruiting/cosamed/job_openings/accountsettings"); // Remplace "/about" par la route cible
  };

  return (
    <div>
      {!user ? (
        <LoginPage />
      ) : (
        <div className="min-h-screen bg-gray-100 p-6 dark:bg-slate-900">
          {/* Titre et Description */}
          <h1 className="text-2xl font-bold  mb-2">
            Mes candidatures
          </h1>
          <p className=" mb-6">
            Nous sommes en train d’examiner avec toute l’attention toutes les
            candidatures à ce poste vacant. Dans la mesure où vos compétences
            correspondent à nos exigences, nous prendrons contact avec vous.
            Vous pouvez vérifier le dernier statut de votre candidature via
            l'onglet « Ma candidature » ​​sur le portail des carrières. Merci de
            votre intérêt à rejoindre notre équipe !
          </p>

          {/* Tabs */}
          <div className="flex border-b mb-4">
            <button className="text-blue-600 font-bold py-2 px-4 border-b-2 border-blue-600">
              Actives (2)
            </button>
            <button className="text-gray-500 py-2 px-4 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600">
              Inactives (2)
            </button>
          </div>

          {/* Tableau */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 dark:bg-slate-800">
                  <th className="border border-gray-200 p-3 text-left">
                    Désignation de l'emploi
                  </th>
                  <th className="border border-gray-200 p-3 text-left">
                    Demande de poste
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
                {/* Première ligne */}
                <tr className="">
                  <td className="border border-gray-200 p-3">
                    
                  </td>
                  <td className="border border-gray-200 p-3"></td>
                  <td className="border border-gray-200 p-3 text-green-600 font-bold">
                    
                  </td>
                  <td className="border border-gray-200 p-3">
                    
                  </td>
                  <td className="border border-gray-200 p-3 text-center">
                    
                  </td>
                </tr>
                 {/* Deuxième ligne
                 <tr className="bg-gray-50 dark:bg-slate-900">
                  <td className="border border-gray-200 p-3">
                    Assistant(e) au suivi SC5 | Bunia(1) et Goma(1) | RD Congo
                  </td>
                  <td className="border border-gray-200 p-3">JR106082</td>
                  <td className="border border-gray-200 p-3 text-green-600 font-bold">
                    Your Application Is ...
                  </td>
                  <td className="border border-gray-200 p-3">
                    18 octobre 2024
                  </td>
                  <td className="border border-gray-200 p-3 text-center">
                    ...
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
          <br />

          <div className=" mt-10  mx-auto bg-white p-6 rounded-lg shadow-md dark:bg-slate-800">
            <h1 className="text-2xl font-semibold  mb-4 ">
              Mon compte
            </h1>
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
    </div>
  );
};

export default OurCandidate;
