import { useNavigate } from "react-router-dom";

const Carriere = () => {
  const navigate = useNavigate();

  const goToJobOpportunities = () => {
    navigate("/data-loading/jobopenings");
  };

  return (
    <div className="p-6 font-sans text-gray-800 dark:text-white">
      {/* En-tête visuel */}
      <header
        className="bg-cover bg-center h-72 flex items-center justify-center py-12"
        style={{
          backgroundImage:
            "url('https://apicosamed.cosamed.org/uploads/blogs/3b92d18aa7a6176dd37d372bc2f1eb71.png')",
        }}
      >
        <h1 className="text-white text-3xl md:text-4xl font-bold bg-principal/50 px-4 py-2 rounded shadow-sm">
          Des carrières qui sauvent des vies
        </h1>
      </header>

      {/* Introduction */}
      <section className="bg-white dark:bg-slate-900 py-8 ">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#0072CE]">
            Rejoignez notre mission de l'éducation sanitaire
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            Vous souhaitez aider les personnes dans le besoin ? Le Conseil sur
            la santé et l'Académie de médecine apportent des solutions
            novatrices en situation d'urgence sanitaire.
          </p>
         
        </div>
      </section>

      {/* Appel à l'action final */}
      <section className="bg-white dark:bg-slate-900 py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 text-[#0072CE]">
            Envie de rejoindre notre équipe ?
          </h2>
          <button
            onClick={goToJobOpportunities}
            className="bg-[#0072CE] text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Voir les opportunités d'emploi
          </button>
        </div>
      </section>

      {/* Avertissement */}
      <section className="bg-gray-100 dark:bg-slate-700 py-10 px-4">
        <div className="max-w-2xl mx-auto p-6 rounded-lg text-center">
          <p className="text-sm text-gray-800 dark:text-white">
            ⚠️ <strong>Mise en garde :</strong> COSAMED ne demande jamais de
            frais pour un recrutement. Méfiez-vous des fausses offres diffusées
            en ligne ou par e-mail.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Carriere;
