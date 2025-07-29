import { useTranslation } from "react-i18next";
import BreadCumb from "../components/navbar/BreadCumb";

const TermsOfUse = () => {
  const { t } = useTranslation();
  return (
    <main className="bg-white p-6 dark:bg-slate-900 w-full text-gray-800 dark:text-white px-6 py-10">
      <BreadCumb title="Conditions d'utilisation" />
      <section className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md">
        <h1 className="text-[16px] font-bold uppercase tracking-widest">
          {t("ConditionsUse")}
        </h1>
      </section>
      <div className="max-w-4xl mx-auto space-y-8">
        <section>
          <p className="text-[13px]">
            En accédant à ce site, vous acceptez les termes ci-dessous. Merci de
            les lire attentivement.
          </p>
        </section>

        <section>
          <h2 className="text-[14px] font-semibold mb-2">
            1. Acceptation des conditions
          </h2>
          <p className="text-[12px]">
            En accédant à ce site, vous acceptez d’être lié par les présentes
            conditions d’utilisation, toutes les lois et réglementations
            applicables.
          </p>
        </section>

        <section>
          <h2 className="text-[14px] font-semibold mb-2">
            2. Utilisation autorisée
          </h2>
          <p className="text-[12px] ">
            Vous vous engagez à utiliser notre site de manière responsable, sans
            enfreindre les droits d’autrui ou les lois en vigueur.
          </p>
        </section>

        <section>
          <h2 className="text-[14px]  font-semibold mb-2">
            3. Propriété intellectuelle
          </h2>
          <p className="text-[12px] ">
            Tout le contenu du site (textes, images, logos) est la propriété de
            COSAMED, sauf indication contraire. Toute reproduction est interdite
            sans autorisation.
          </p>
        </section>

        <section>
          <h2 className="text-[14px] font-semibold mb-2">
            4. Restrictions d’utilisation
          </h2>
          <p className="text-[12px]">
            Il est strictement interdit d’utiliser ce site pour transmettre des
            contenus illicites, nuisibles, ou porter atteinte à la réputation de
            COSAMED.
          </p>
        </section>

        <section>
          <h2 className="text-[14px] font-semibold mb-2">5. Modifications</h2>
          <p className="text-[12px]">
            COSAMED peut modifier les présentes conditions à tout moment. Il est
            de votre responsabilité de les consulter régulièrement.
          </p>
        </section>

        <section>
          <h2 className="text-[14px] font-semibold mb-2">6. Droit applicable</h2>
          <p className="text-[12px] ">
            Ces conditions sont régies par les lois en vigueur en République
            Démocratique du Congo. Tout litige sera soumis à la juridiction
            compétente.
          </p>
        </section>
      </div>
    </main>
  );
};

export default TermsOfUse;
