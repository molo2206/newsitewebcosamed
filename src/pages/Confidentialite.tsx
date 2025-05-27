import BreadCumb from "../components/navbar/BreadCumb";

const Confidentialite = () => {
  return (
    <div className="p-6 dark:bg-slate-900 w-full dark:text-white ">
      <BreadCumb title={"Confidentialité"} />
      <header className="bg-principal dark:bg-slate-800 dark:text-white text-white py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="md:text-xl lg:text-2xl font-bold">
            Politique de Confidentialité
          </h1>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-4">
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-gray-700 dark:text-white font-light">
            Nous nous engageons à protéger votre vie privée. Cette politique de
            confidentialité explique comment nous collectons, utilisons et
            protégeons vos informations personnelles.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Données collectées</h2>
          <p className="text-gray-700 dark:text-white font-light">
            Nous pouvons collecter les types d’informations
            suivants :
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-white dark:text-white ">
            <li>
              Informations personnelles (nom, adresse, e-mail, téléphone).
            </li>
            <li>Données de navigation sur notre site web.</li>
            <li>
              Informations fournies via nos formulaires de contact ou
              d’adhésion.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            3. Utilisation des données
          </h2>
          <p className="text-gray-700 dark:text-white font-light">
            Nous utilisons vos informations pour :
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-white dark:text-white ">
            <li>Vous contacter concernant nos actions humanitaires.</li>
            <li>Gérer vos dons et adhésions.</li>
            <li>Améliorer nos services et notre site web.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Partage des données</h2>
          <p className="text-gray-700 dark:text-white font-light">
            Nous ne partageons pas vos informations
            personnelles avec des tiers, sauf dans les cas suivants :
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-white dark:text-white ">
            <li>Si la loi nous y oblige.</li>
            <li>Avec votre consentement explicite.</li>
            <li>
              Pour améliorer nos services via des partenaires de confiance.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            5. Sécurité des données
          </h2>
          <p className="text-gray-700 dark:text-white font-light">
            Nous mettons en œuvre des mesures de sécurité
            strictes pour protéger vos données contre tout accès non autorisé.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Vos droits</h2>
          <p className="text-gray-700 dark:text-white font-light">
            Vous avez le droit de demander l’accès, la
            correction ou la suppression de vos données personnelles.
            Contactez-nous à
            <span className="font-semibold"> <a href="mailto:cosamed17@gmail.com">cosamed17@gmail.com</a></span>{" "}
            pour toute demande.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Modifications</h2>
          <p className="text-gray-700 dark:text-white font-light">
            Nous pouvons mettre à jour cette politique de
            confidentialité. Les changements seront publiés sur cette page.
          </p>
        </section>

        <p className="text-gray-600 dark:text-white font-light text-sm mt-6 text-center dark:text-white ">
          Dernière mise à jour : Février 2024
        </p>
      </div>
    </div>
  );
};

export default Confidentialite;
