
const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto max-w-6xl bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row">
        {/* Section de gauche */}
        <div className="md:w-1/2 p-6">
          <div className="text-blue-600 text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">Sellsy</span>
            <a href="#" className="text-gray-400 text-sm underline">Retourner sur le site Sellsy</a>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            15 jours d'essai gratuit sans engagement
          </h1>
          <p className="text-gray-600 mb-6">
            Testez librement toutes les fonctionnalités de la Suite CRM Sellsy.
            Aucune carte de crédit requise.
          </p>
          {/* Étoiles et avis */}
          <div className="bg-blue-100 p-4 rounded-lg mb-6">
            <p className="text-blue-700 font-bold text-lg">⭐ 4.4/5</p>
            <p className="text-gray-600 text-sm">
              Nos utilisateurs nous recommandent sur Appvizer, Trustpilot, Google,
              GetApp, SoftwareAdvice.
            </p>
          </div>
          {/* Aperçus des fonctionnalités */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded-lg h-24"></div>
            <div className="bg-gray-100 rounded-lg h-24"></div>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            18 000+ entreprises nous utilisent au quotidien.
          </p>
        </div>

        {/* Section de droite */}
        <div className="md:w-1/2 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Créez votre compte gratuitement</h2>
          <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg flex items-center justify-center mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            S'inscrire avec Google
          </button>
          <div className="text-center text-gray-400 mb-4">Ou</div>
          {/* Formulaire */}
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nom de votre société
              </label>
              <input
                type="text"
                placeholder="Nom de votre société"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
                <input
                  type="text"
                  placeholder="Nom"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2">Prénom</label>
                <input
                  type="text"
                  placeholder="Prénom"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Poste occupé
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner un poste</option>
                <option value="CEO">CEO</option>
                <option value="Manager">Manager</option>
                <option value="Employé">Employé</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Téléphone
              </label>
              <div className="flex">
                <span className="bg-gray-200 px-4 py-2 border border-r-0 rounded-l-lg">+33</span>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Téléphone"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Créer mon compte
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
