import { useTranslation } from "react-i18next";
import BreadCumb from "../components/navbar/BreadCumb";
import usePageSEO from "../components/Seo/usePageSEO";

const Confidentialite = () => {
    usePageSEO({
    title: "Confidentiality",
    description: "Confidentiality",
    keywords: ["Santé", "Actualité", "Gap", "Alert", "Projet"],
    ogTitle: "Cosamed asbl",
    ogDescription:
      "Est une association à but non lucratif reconnue par le gouvernement congolais et composée de prestataires de santé allant des agents de santé communautaires aux médecins.",
    ogImage: "https://www.cosamed.org/",
    ogUrl: window.location.href,
  });

  const { t } = useTranslation();
  return (
    <main className="bg-white dark:bg-slate-900 w-full text-gray-800 dark:text-white max-w-7xl mx-auto px-6 py-12">
      <BreadCumb title="Politique de confidentialité" />
      <section className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md">
        <h1 className="text-[16px] font-bold uppercase tracking-widest">
          {t("Privacy_Policy")}
        </h1>
      </section>
      <div className="max-w-4xl mx-auto space-y-8">
        <section>
          <p className="text-[12px]">
            Nous nous engageons à protéger votre vie privée. Cette politique de
            confidentialité explique comment nous collectons, utilisons et
            protégeons vos informations personnelles.
          </p>
        </section>

        <section>
          <h2 className="text-[13px] font-semibold mb-2">1. Données collectées</h2>
          <ul className="list-disc list-inside text-[12px] space-y-1 pl-4">
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

        <section>
          <h2 className="text-[13px] font-semibold mb-2">
            2. Utilisation des données
          </h2>
          <ul className="list-disc list-inside text-[12px] space-y-1 pl-4">
            <li>Vous contacter concernant nos actions humanitaires.</li>
            <li>Gérer vos dons et adhésions.</li>
            <li>Améliorer nos services et notre site web.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[13px] font-semibold mb-2">3. Partage des données</h2>
          <ul className="list-disc list-inside text-[12px] space-y-1 pl-4">
            <li>Si la loi nous y oblige.</li>
            <li>Avec votre consentement explicite.</li>
            <li>
              Pour améliorer nos services via des partenaires de confiance.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-[13px] font-semibold mb-2">
            4. Sécurité des données
          </h2>
          <p className="text-[12px]">
            Nous mettons en œuvre des mesures de sécurité strictes pour protéger
            vos données contre tout accès non autorisé.
          </p>
        </section>

        <section>
          <h2 className="text-[13px] font-semibold mb-2">5. Vos droits</h2>
          <p className="text-[12px]">
            Vous avez le droit de demander l’accès, la correction ou la
            suppression de vos données personnelles. Contactez-nous à{" "}
            <a
              href="mailto:cosamed17@gmail.com"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              cosamed17@gmail.com
            </a>{" "}
            pour toute demande.
          </p>
        </section>

        <section>
          <h2 className="text-[13px] font-semibold mb-2">6. Modifications</h2>
          <p className="text-[12px]">
            Nous pouvons mettre à jour cette politique de confidentialité. Les
            changements seront publiés sur cette page.
          </p>
        </section>
      </div>
    </main>
  );
};

export default Confidentialite;
