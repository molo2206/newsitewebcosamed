import useAsync from "../hooks/useAsync";
import BlogServices from "../services/BlogsServices";
import Blogia from "../components/blogs/Blogia";

const Ai4Mpox = () => {
  const { data: lastblog } = useAsync(() => BlogServices.getBlogHome());
  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-sans min-h-screen">
      {/* Bandeau principal */}
      <header className="relative bg-gradient-to-r from-purple-800 to-principal text-white">
        <img
          src="https://apicosamed.cosamed.org/uploads/blogs/ai4.jpg"
          alt="Bannière AI4Mpox"
          className="w-full h-[400px] object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 bg-black/60">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            AI4Mpox
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl drop-shadow-md">
            Utiliser l'IA et la modélisation pour renforcer la réponse à Mpox en
            RDC.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Dashboards */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-principal mb-6">
            Tableaux de bord décisionnels
          </h2>
          <p className="mb-4 text-lg leading-relaxed">
            Suivi en temps réel de l’épidémie, priorisation des interventions
            selon les risques.
          </p>
          <ul className="list-disc list-inside mb-6 text-base space-y-2">
            <li>Carte de la RDC par province</li>
            <li>Répartition des cas suspects / confirmés</li>
            <li>Présence des partenaires et laboratoires</li>
          </ul>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://apicosamed.cosamed.org/uploads/parteners/dash.png"
              alt="Dashboard Mpox"
              className="w-full object-cover"
            />
          </div>
        </section>

        {/* Actions de réponse */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-principal mb-6">
            Actions de réponse
          </h2>
          <p className="text-lg leading-relaxed">
            Cartographie des partenaires selon les piliers : soins, prévention,
            communication, nutrition, protection et coordination.
          </p>
        </section>

        {/* Détection rapide des cas */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-principal mb-6">
            Détection rapide des cas
          </h2>
          <p className="mb-4 text-lg leading-relaxed">
            Diagnostics sur le terrain (PCR GeneXpert) pour les régions
            éloignées.
          </p>
          <ul className="list-disc list-inside space-y-2 text-base">
            <li>Cas suspects / testés / confirmés</li>
            <li>Taux de positivité</li>
            <li>Suivi des alertes et contacts</li>
            <li>Cartes épidémiques</li>
          </ul>
        </section>

        {/* Vaccination */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-principal mb-6">
            Accès à la vaccination
          </h2>
          <p className="text-lg leading-relaxed">
            Campagne en octobre 2024 dans les zones de conflit. 265 000 doses
            livrées.
          </p>
        </section>

        {/* Recommandations */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-principal mb-6">
            Recommandations
          </h2>
          <ul className="list-disc list-inside space-y-3 text-base leading-relaxed">
            <li>
              <strong>Gouvernement :</strong> Coordination nationale et
              intégration Mpox.
            </li>
            <li>
              <strong>Communautés :</strong> Collaboration avec les leaders
              locaux.
            </li>
            <li>
              <strong>Partenaires :</strong> Approche intégrée humanitaire.
            </li>
            <li>
              <strong>Bailleurs :</strong> Financement mobile et flexible.
            </li>
          </ul>
        </section>

        {/* Blog AI4Mpox */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-principal mb-6">
            Actualité sur AI4Mpox
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(lastblog) && lastblog.length > 0 ? (
              lastblog.map((item: any) => (
                <Blogia key={item.id || item.slug} blog={item} />
              ))
            ) : (
              <p>Aucun article à afficher.</p>
            )}
          </div>
        </section>

        {/* Logos partenaires */}
        <section className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            🤝 Partenaires
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center">
            {["logo.jpg", "partener2.png", "uk.png", "ai4.jpg"].map(
              (file, index) => (
                <img
                  key={index}
                  src={`https://apicosamed.cosamed.org/uploads/parteners/${file}`}
                  alt={`Logo ${index}`}
                  className="h-20 object-contain  transition duration-300"
                />
              )
            )}
          </div>
        </section>

        {/* Bouton final */}
        <div className="text-center mt-16">
          <a
            href="https://ai4mpox.afiagap.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-principal text-white text-lg font-semibold px-8 py-4 rounded-full shadow hover:opacity-90 transition"
          >
            En savoir plus sur AI4Mpox
          </a>
        </div>
      </main>
    </div>
  );
};

export default Ai4Mpox;
