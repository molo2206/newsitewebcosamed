import { useTranslation } from "react-i18next";
import BreadCumb from "../components/navbar/BreadCumb";

const AccessibilityPolicy = () => {
  const { t } = useTranslation();
  return (
    <main className="bg-white p-6 dark:bg-slate-900 w-full text-gray-800 dark:text-white px-6 py-10">
      <BreadCumb title="Accessibilité" />
      <section className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md">
        <h1 className="text-[16px] font-bold uppercase tracking-widest">
            {t("Accessibility_Policy")}
        </h1>
      </section>
      <div className="max-w-4xl mx-auto space-y-8">
        <section>
          <p className="text-[13px]">
            Notre engagement pour un site accessible à tous, sans exclusion.
          </p>
        </section>

        <section>
          <h2 className="text-[14px] font-semibold mb-2">1. Introduction</h2>
          <p className="text-[12px]">
            Nous nous engageons à rendre notre site accessible à tous, y compris
            aux personnes en situation de handicap, afin de garantir une
            expérience inclusive et équitable.
          </p>
        </section>

        <section>
          <h2 className="text-[14px] font-semibold mb-2">
            2. Compatibilité des navigateurs
          </h2>
          <p className="text-[12px] ">
            Notre site est testé pour fonctionner avec les principaux
            navigateurs et technologies d’assistance afin d’assurer une
            compatibilité optimale.
          </p>
        </section>

        <section>
          <h2 className="text-[14px]  font-semibold mb-2">
            3. Navigation au clavier
          </h2>
          <ul className="list-disc list-inside text-[12px] space-y-1 pl-4">
            <li>La navigation est possible uniquement au clavier.</li>
            <li>
              Les éléments interactifs sont accessibles via la touche
              Tabulation.
            </li>
            <li>Focus visible et clair sur tous les éléments sélectionnés.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[14px] font-semibold mb-2">
            4. Contraste et lisibilité
          </h2>
          <p className="text-[12px]">
            Nous assurons un contraste élevé entre le texte et l’arrière-plan
            pour garantir une bonne lisibilité, conformément aux normes WCAG.
          </p>
        </section>

        <section>
          <h2 className="text-[14px] font-semibold mb-2">
            5. Retour d’expérience
          </h2>
          <p className="text-[12px]">
            Nous encourageons les utilisateurs à nous faire part de leurs
            retours afin d’améliorer continuellement l’accessibilité de notre
            site.
          </p>
        </section>
      </div>
    </main>
  );
};

export default AccessibilityPolicy;
