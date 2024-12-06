const UpdateProfile = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Mettre à jour les coordonnées</h2>
      <form>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prénom(s)
            </label>
            <input
              type="text"
              placeholder="Prénom"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom de famille
            </label>
            <input
              type="text"
              placeholder="Nom"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        {/* Adresse */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Adresse</label>
          <input
            type="text"
            placeholder="Adresse complète"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* Téléphone */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Téléphone</label>
          <input
            type="tel"
            placeholder="Numéro de téléphone"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
