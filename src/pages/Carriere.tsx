import { useNavigate } from "react-router-dom";

const Carriere = () => {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate("/data-loading/jobopenings"); // Remplace "/about" par la route cible
  };

  return (
    <div>
      {/* Section d'en-tête */}
      <header
        className="bg-cover bg-center h-64 flex items-center justify-center mt-10"
        style={{
          backgroundImage:
            "url('https://apicosamed.cosamed.org/uploads/blogs/3b92d18aa7a6176dd37d372bc2f1eb71.png')", // Remplacez par l'URL de votre image.
        }}
      >
        <h1 className="text-white bg-principal md:text-2xl lg:text-3xl font-bold drop-shadow-lg">
          Des carrières qui sauvent des vies
        </h1>
      </header>

      {/* Section principale */}
      <section className="bg-principal dark:bg-slate-800 text-white text-center py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="lg:text-xl md:text-md font-bold mb-4">
            Rejoignez notre mission de l'éducation sanitaire des populations.
          </h2>
          <p className="lg:text-lg font-light md:text-md leading-relaxed mb-6">
            Vous avez envie d'apporter votre aide aux personnes dans le besoin?
            Le Conseil sur la santé et l'Académie de médecine visent à apporter
            de l'aide à la population avec nos solutions innovantes pour les
            situations d'urgence sanitaire.
          </p>
          <p className="text-lg font-bold">
            Rejoignez-nous pour faire changer les choses
          </p>

          {/* Bouton */}
          <div className="mt-8">
            <button
              onClick={goToAbout}
              className="bg-white lg:text-sm md:text-sm text-principal dark:bg-slate-800 border dark:border-slate-700 px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition"
            >
              VOIR LES OPPORTUNITÉS D'EMPLOI
            </button>
          </div>
        </div>
      </section>
      <div className="p-4">
        <h2 className="lg:text-lg md:text-sm  font-bold text-slate-800 dark:text-white px-8">
          Pourquoi travailler au COSAMED ?
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-8 py-2">
          {/* Carte 1 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img
                src="https://apicosamed.cosamed.org/uploads/blogs/6fbd841e2e4b2938351a4f9b68f12e6b.png" // Remplacez avec l'URL de l'icône
                alt="Icône carrières"
                className="w-full h-full rounded-md"
              />
            </div>
            <h3 className="lg:text-lg md:text-sm font-semibold text-gray-800 mb-2 dark:text-white">
              Des carrières enrichissantes qui permettent de changer les choses
            </h3>
            <p className="text-gray-600 lg:text-sm md:text-sm  dark:text-white">
              Notre action au quotidien améliore la vie des personnes que nous
              servons.
            </p>
          </div>

          {/* Carte 2 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img
                src="https://apicosamed.cosamed.org/uploads/blogs/06f2e099b4f87109d52e15d7c05f0084.png" // Remplacez avec l'URL de l'icône
                alt="Icône formation"
                className="w-full h-full rounded-md"
              />
            </div>
            <h3 className="lg:text-lg md:text-sm font-semibold text-gray-800 mb-2 dark:text-white">
              Formation et apprentissage continus
            </h3>
            <p className="text-gray-600 lg:text-sm md:text-sm  dark:text-white">
              Nous fournissons des outils d'apprentissage à nos employés pour
              leur permettre de développer leur carrière en permanence.
            </p>
          </div>

          {/* Carte 3 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img
                src="https://apicosamed.cosamed.org/uploads/blogs/64d52e08cc03e6090bc1ef30b73ccb85.png" // Remplacez avec l'URL de l'icône
                alt="Icône environnement"
                className="w-full h-full rounded-md"
              />
            </div>
            <h3 className="lg:text-lg md:text-sm font-semibold text-gray-800 mb-2 dark:text-white">
              Un environnement professionnel multiculturel et stimulant
            </h3>
            <p className="text-gray-600  lg:text-sm md:text-sm  dark:text-white">
              Nous encourageons l'équilibre hommes/femmes et la diversité
              culturelle pour renforcer nos équipes.
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-principal dark:bg-slate-800 flex flex-col items-center justify-center">
        <header className="text-center text-white">
          <h1 className="lg:text-2xl md:text-sm font-bold mb-4 dark:text-white">
            Vous aimeriez rejoindre le Conseil sur la santé et l'Academie de
            Médecine?
          </h1>
          <button
            onClick={goToAbout}
            className="bg-white text-principal dark:text-white lg:text-sm md:text-sm dark:bg-slate-800 border dark:border-slate-700 px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition"
          >
            VOIR LES OPPORTUNITÉS D'EMPLOI
          </button>
        </header>
        <section className="mt-10 bg-white p-6 rounded-lg shadow-lg border dark:border-slate-700 text-center max-w-xl dark:bg-slate-800">
          <p className="text-gray-800 text-sm dark:text-white">
            Méfiez-vous des offres d'emploi frauduleuses : COSAMED est informé
            de la diffusion d'offres d'emploi fictives par courrier électronique
            ou provenant de sites d'offres d'emploi en ligne. Beaucoup de ces
            stratagèmes consistent en de soi-disant offres d'emploi ou contrats
            avec COSAMED moyennant des frais ou la fourniture de renseignements
            personnels ou bancaires.{" "}
          </p>
        </section>
      </div>
      <br />
    </div>
  );
};

export default Carriere;
