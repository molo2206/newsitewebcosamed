import React from "react";

const DeleteAccount = () => {
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Supprimer mes données personnelles</h2>
      <p className="text-gray-700 mb-6">
        En cliquant sur le bouton ci-dessous, vous demandez que toutes vos données personnelles soient supprimées. Cette action est irréversible.
      </p>
      <a
        href="https://www.workday.com/en-us/privacy.html"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline mb-4 block"
      >
        Lire notre politique de confidentialité
      </a>
      <button
        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
      >
        Supprimer mes données personnelles
      </button>
    </div>
  );
};

export default DeleteAccount;
