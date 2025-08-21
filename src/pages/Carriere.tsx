import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaUsers,
  FaLightbulb,
  FaExclamationTriangle,
} from "react-icons/fa";
import BreadCumb from "../components/navbar/BreadCumb";

const Carriere = () => {
  const navigate = useNavigate();

  const goToJobOpportunities = () => {
    navigate("/data-loading/jobopenings");
  };

  return (
    <div className="p-6 font-sans text-gray-800 dark:text-white min-h-screen flex flex-col gap-4">
      <BreadCumb title={"Carrière"} />
      <header
        className="relative h-72 flex items-center justify-center rounded-md overflow-hidden shadow-lg"
        style={{
          backgroundImage:
            "url('https://apicosamed.cosamed.org/uploads/blogs/3b92d18aa7a6176dd37d372bc2f1eb71.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0072CE]/80 to-[#003C70]/80 animate-gradient-x"></div>
        <h1 className="relative text-white text-[18px] font-extrabold px-6 py-3 rounded bg-principal/70 backdrop-blur-sm shadow-lg max-w-3xl text-center">
          Des carrières qui sauvent des vies
        </h1>
      </header>

      {/* Introduction en colonnes avec icônes */}
      <section className="bg-white dark:bg-slate-900 py-2 rounded-md shadow-md mx-auto">
        <div className="text-center mb-10 px-4">
          <h2 className="text-[16px] font-extrabold mb-4 text-[#0072CE]">
            Rejoignez notre mission de l'éducation sanitaire
          </h2>
          <p className="text-[12px] max-w-3xl mx-auto leading-relaxed text-gray-700 dark:text-gray-300">
            Vous souhaitez aider les personnes dans le besoin ? Le Conseil sur
            la santé et l'Académie de médecine apportent des solutions
            novatrices en situation d'urgence sanitaire.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center px-6">
          {[
            {
              icon: (
                <FaBriefcase size={15} className="text-principal mx-auto" />
              ),
              title: "Opportunités d'emploi",
              desc: "Découvrez les postes qui correspondent à vos compétences et aspirations.",
            },
            {
              icon: <FaUsers size={15} className="text-principal mx-auto" />,
              title: "Rejoindre l'équipe",
              desc: "Participez activement à notre mission humanitaire et éducative.",
            },
            {
              icon: (
                <FaLightbulb size={15} className="text-principal mx-auto" />
              ),
              title: "Innovations et Projets",
              desc: "Contribuez à des projets innovants pour améliorer la santé publique.",
            },
          ].map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="flex-1 bg-[#F9FAFB] dark:bg-slate-800 rounded-lg p-6 shadow hover:shadow-lg transition cursor-default"
            >
              {icon}
              <h3 className="text-[12px] font-semibold mt-4 mb-2 text-center">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-[12px]">
                {desc}
              </p>
            </div>
          ))}
          <button
            onClick={goToJobOpportunities}
            className="bg-principal text-white text-[12px] px-8 py-4 rounded-md font-semibold hover:bg-hover transition-shadow shadow-md hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            Voir les opportunités d'emploi
          </button>
        </div>
      </section>
      <section className="max-w-3xl mx-auto bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-600 dark:border-yellow-600 p-6 rounded-md shadow-md flex items-center gap-4">
        <FaExclamationTriangle
          size={20}
          className="text-yellow-600 dark:text-yellow-600"
        />
        <div>
          <h3 className="font-bold text-[13px] text-center mb-2">
            COSAMED ne demande jamais de frais pour un recrutement. Méfiez-vous
            des fausses offres diffusées en ligne ou par e-mail.
          </h3>
        </div>
      </section>
    </div>
  );
};

export default Carriere;
