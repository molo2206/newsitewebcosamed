import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  const click = () => {
    navigate("/job_openings/userHome");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white ">
      <div className="bg-white border shadow-lg rounded-lg p-6 max-w-md text-center">
        {/* Icône de validation */}
        <div className="flex items-center justify-center bg-green-100 rounded-full w-20 h-20 mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414L9 12.086l6.793-6.793a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {/* Titre */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Traitement Réussi
        </h2>
        {/* Description */}
        <p className="text-gray-600 mb-6">
          Votre action a été complétée avec succès. Merci de votre confiance !
        </p>
        {/* Bouton pour continuer */}
        <button
          onClick={click}
          className="bg-principal text-white px-6 py-2 rounded-lg hover:bg-hover transition"
        >
          Continuer
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
