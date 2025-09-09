import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaUsers, FaLightbulb, FaExclamationTriangle } from "react-icons/fa";
import BreadCumb from "../components/navbar/BreadCumb";
import ButtonSpecial from "../components/form/ButtonSpecial";

const Carriere = () => {
  const navigate = useNavigate();
  const goToJobOpportunities = () => navigate("/job_openings");

  const features = [
    {
      icon: <FaBriefcase size={15} className="text-principal mx-auto" />,
      title: "Opportunités d'emploi",
      desc: "Découvrez les postes qui correspondent à vos compétences et aspirations.",
    },
    {
      icon: <FaUsers size={15} className="text-principal mx-auto" />,
      title: "Rejoindre l'équipe",
      desc: "Participez activement à notre mission humanitaire et éducative.",
    },
    {
      icon: <FaLightbulb size={15} className="text-principal mx-auto" />,
      title: "Innovations et Projets",
      desc: "Contribuez à des projets innovants pour améliorer la santé publique.",
    },
  ];

  return (
    <main className="min-h-screen dark:bg-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-8">
        <BreadCumb title="Carrière" />

        {/* Header / Hero */}
        <header
          className="relative h-72 flex items-center justify-center rounded-md overflow-hidden shadow-lg"
          style={{
            backgroundImage: "url('https://apicosamed.cosamed.org/uploads/blogs/3b92d18aa7a6176dd37d372bc2f1eb71.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0072CE]/80 to-[#003C70]/80 animate-gradient-x"></div>
          <h1 className="relative text-white text-[18px] font-extrabold px-6 py-3 rounded bg-principal/70 backdrop-blur-sm shadow-lg text-center">
            Des carrières qui sauvent des vies
          </h1>
        </header>

        {/* Features */}
        <section className="bg-white dark:bg-slate-900 py-6 rounded-md shadow-md">
          <div className="text-center mb-10 px-4">
            <h2 className="text-[16px] font-extrabold mb-4 text-[#0072CE]">
              Rejoignez notre mission de l'éducation sanitaire
            </h2>
            <p className="text-[12px] max-w-3xl mx-auto leading-relaxed text-gray-700 dark:text-gray-300">
              Vous souhaitez aider les personnes dans le besoin ? Le Conseil sur la santé et l'Académie de médecine apportent des solutions novatrices en situation d'urgence sanitaire.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
            {features.map((f, i) => (
              <div key={i} className="bg-[#F9FAFB] dark:bg-slate-800 rounded-lg p-6 shadow hover:shadow-lg transition cursor-default text-center">
                {f.icon}
                <h3 className="text-[12px] font-semibold mt-4 mb-2">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-[12px]">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <ButtonSpecial label="Voir les opportunités d'emploi" onClick={goToJobOpportunities} />
          </div>
        </section>

        {/* Alert / Warning */}
        <section className="max-w-3xl mx-auto bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-600 dark:border-yellow-600 p-6 rounded-md shadow-md flex items-center gap-4">
          <FaExclamationTriangle size={20} className="text-yellow-600 dark:text-yellow-600" />
          <div>
            <h3 className="font-bold text-[13px] text-center mb-2">
              COSAMED ne demande jamais de frais pour un recrutement. Méfiez-vous des fausses offres diffusées en ligne ou par e-mail.
            </h3>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Carriere;

