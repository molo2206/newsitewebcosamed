const Ai4Mpox = () => {
  return (
    <div className="bg-white text-gray-800 dark:bg-slate-800 dark:text-slate-200  font-sans min-h-screen">
      {/* Bandeau principal */}
      <header className="relative bg-blue-600 text-white">
        <img
          src="https://apicosamed.cosamed.org/uploads/blogs/ai4.jpg"
          alt="Bannière AI4Mpox"
          className="w-full h-72 object-cover opacity-70"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 bg-gradient-to-r from-blue-900/90 to-blue-800/60">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
            AI4Mpox
          </h1>
          <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">
            AI4Mpox: Leveraging Artificial Intelligence and Mathematical
            Modelling for Enhanced Mpox Outbreak Response and Preparedness in
            DRC
          </p>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Dashboards */}
        <section>
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">
            Mpox Dashboards: Improved Public Health Decision-Making
          </h2>
          <p className="mb-4">
            Interactive dashboards to monitor the epidemic in real time. These
            tools help prioritize responses based on epidemiological risks and
            population movement. Carte de la RDC par province et par zone de
            santé avec la distribution des cas suspect de Mpox, cas confirmés de
            Mpox, disponibilité de labo et mouvement des populations Carte de la
            RDC par province et par zone de santé
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>Carte de la RDC par province et zone de santé</li>
            <li>Répartition des cas suspects et confirmés</li>
            <li>
              Cartographie des partenaires et disponibilité des laboratoires
            </li>
          </ul>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://apicosamed.cosamed.org/uploads/parteners/dash.png"
              alt="Aperçu tableau de bord Mpox"
              className="w-full h-auto object-cover"
            />
          </div>
        </section>

        {/* Actions de réponse */}
        <section className="">
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">
            Response actions
          </h2>
          <p>
            Carte de la RDC par province et par zone de santé avec la
            cartographie des partenaires avec leurs actions de réponse. Par
            pilier de la réponse Mpox (prise en charge médicale, PCI, CREC, PEC
            nutritionnelle, PEC psychosociale ; PSEA, coordination)
          </p>
        </section>

        {/* Détection précoce */}
        <section>
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">
            Early Mpox Case Detection and Rapid Response
          </h2>
          <p className="mb-4">
            Thanks to the deployment of field-based PCR diagnostics, including
            GeneXpert, mpox detection capabilities have improved significantly,
            even in remote and unstable regions.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Nombre des cas suspects</li>
            <li>Nombre des cas prélevés/testés</li>
            <li>Nombre des cas confirmés</li>
            <li>Taux de positivité</li>
            <li>Alertes remontées et investiguées</li>
            <li>Carte des indicateurs par province</li>
            <li>Suivi des contacts</li>
          </ul>
        </section>

        {/* Vaccination */}
        <section>
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">
            Access to Vaccination in Underserved Areas
          </h2>
          <p className="mb-4">
            A historic mpox vaccination campaign was launched in October 2024,
            despite logistical challenges in North Kivu, South Kivu, and Ituri.
            These conflict-affected regions host hundreds of thousands of
            displaced people. With support from international partners, over
            265,000 vaccine doses have been delivered to priority areas.
          </p>
        </section>

        {/* Recommandations */}
        <section className=" p-6">
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">
            Recommendations
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Government :</strong> Ensure effective coordination among
              stakeholders and integrate mpox strategies into national response
              plans.
            </li>
            <li>
              <strong>Community :</strong> Maintain continuous dialogue with
              local leaders to build trust and promote adherence to health
              measures.
            </li>
            <li>
              <strong>Partners :</strong>Integrate mpox response into broader
              humanitarian strategies (nutrition, protection, WASH).
            </li>
            <li>
              <strong>Donors :</strong> financement mobile et flexibleFund
              flexible, mobile health interventions to reach displaced
              populations, hard-to-access areas and no complicated cases.
            </li>
          </ul>
        </section>

        {/* Logos des partenaires */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">🤝 Partenaires</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center">
            <img
              src="https://apicosamed.cosamed.org/uploads/parteners/logo.jpg"
              alt="COSAMED"
              className="h-20 object-contain hover:grayscale-0 transition"
            />
            <img
              src="https://apicosamed.cosamed.org/uploads/parteners/partener2.png"
              alt="Université de Toronto"
              className="h-20 w-full object-contain hover:grayscale-0 transition"
            />
            <img
              src="https://apicosamed.cosamed.org/uploads/parteners/uk.png"
              alt="FCDO"
              className="h-20 w-full object-contain hover:grayscale-0 transition"
            />
            <img
              src="https://apicosamed.cosamed.org/uploads/parteners/ai4.jpg"
              alt="AI4"
              className="h-20 w-[200%] object-contain hover:grayscale-0 transition"
            />
          </div>
        </section>

        {/* Bouton final */}
        <div className="mt-12 text-center">
          <button className="bg-principal dark:bg-slate-900 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-hover transition">
            En savoir plus sur AI4Mpox
          </button>
        </div>
      </main>
    </div>
  );
};

export default Ai4Mpox;
