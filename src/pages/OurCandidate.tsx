import { useNavigate } from "react-router-dom";

const OurCandidate = () => {
  const navigate = useNavigate();
  const UpdateCompte = () => {
    navigate("/recruiting/cosamed/job_openings/updateContactInfo"); // Remplace "/about" par la route cible
  };
  const Accountsettings = () => {
    navigate("/recruiting/cosamed/job_openings/accountsettings"); // Remplace "/about" par la route cible
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className=" mx-auto bg-white p-6 rounded-lg shadow-lg">
          {/* Titre et Description */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Mes candidatures
          </h1>
          <p className="text-gray-600 mb-6">
            We are in the process of reviewing with full attention all
            applications to this vacancy. Provided that your skills correspond
            with our requirements, we will be in touch with you. You can check
            the latest status of your application via the "My Job Application"
            tab on the Careers Portal. Thank you for your interest in joining
            our team!
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
                <tr className="bg-gray-100">
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
                <tr>
                  <td className="border border-gray-200 p-3">
                    Assistant(e) au pointage (Plusieurs localités) G2
                  </td>
                  <td className="border border-gray-200 p-3">JR105778</td>
                  <td className="border border-gray-200 p-3 text-green-600 font-bold">
                    Your Application Is ...
                  </td>
                  <td className="border border-gray-200 p-3">
                    22 octobre 2024
                  </td>
                  <td className="border border-gray-200 p-3 text-center">
                    ...
                  </td>
                </tr>
                {/* Deuxième ligne */}
                <tr className="bg-gray-50">
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
                </tr>
              </tbody>
            </table>
          </div>
          <br />
        </div>
        <div className=" mt-10  mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Mon compte
          </h1>
          {/* Description */}
          <p className="text-gray-600 mb-6">
            Pour mettre à jour vos données personnelles, cliquez sur{" "}
            <strong>Mettre à jour les coordonnées</strong>. Pour modifier
            l'adresse e-mail de votre compte, cliquez sur{" "}
            <strong>Modifier les paramètres du compte</strong>.
          </p>
          {/* Boutons */}
          <div className="flex gap-4">
            <button
              onClick={UpdateCompte}
              className="bg-principal text-white px-4 py-2 rounded-lg hover:bg-hover"
            >
              Mettre à jour les coordonnées
            </button>
            <button onClick={Accountsettings} className="bg-gray-100 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200">
              Modifier les paramètres du compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCandidate;
