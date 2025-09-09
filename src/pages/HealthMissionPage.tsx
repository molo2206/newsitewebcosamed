import { useState, useEffect } from "react";
import { PhoneCall, ShieldCheck, Syringe, Info } from "lucide-react";
import BreadCumb from "../components/navbar/BreadCumb";
import BulletinLoad from "../components/blogs/BulletinLoad";

const HealthMissionPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // Simuler le chargement
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <BulletinLoad key={i} />
        ))}
      </div>
    );
  }

  return (
    <main className="bg-white dark:bg-slate-900 w-full min-h-screen text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <BreadCumb title="Notre mission sanitaire" />

        <section className="mb-10 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md">
          <h1 className="text-[16px] font-bold uppercase tracking-wider mb-2">
            Notre mission d’aide sanitaire pour tous
          </h1>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Syringe size={15} className="text-principal" />
              <h2 className="text-[14px] font-semibold">
                Programmes de Vaccination
              </h2>
            </div>
            <p className="text-[13px] mb-2">
              Nous encourageons la vaccination comme moyen efficace de prévention.
              Retrouvez les centres de vaccination disponibles dans votre région
              ainsi que les campagnes en cours.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={15} className="text-principal" />
              <h2 className="text-[14px] font-semibold">
                Conseils de Prévention
              </h2>
            </div>
            <ul className="list-disc list-inside text-[13px] space-y-2">
              <li>Se laver régulièrement les mains avec du savon.</li>
              <li>Porter un masque dans les lieux publics fermés.</li>
              <li>Éviter les contacts rapprochés en cas d'épidémie.</li>
              <li>
                Consulter rapidement un professionnel de santé en cas de
                symptômes.
              </li>
            </ul>
          </section>

          <section className="mb-12 p-6 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-md">
            <div className="flex items-center gap-2 mb-3">
              <PhoneCall size={15} className="text-red-600" />
              <h2 className="text-[14px] font-semibold text-red-700 dark:text-red-400">
                Urgences Sanitaires
              </h2>
            </div>
            <p className="text-[12px] mb-2">
              En cas d'urgence sanitaire, contactez immédiatement le service
              d'urgence local au numéro ci-dessous.
            </p>
            <p className="font-bold text-[12px] text-red-800 dark:text-red-300">
              Appeler le service d'urgence :{" "}
              <a href="tel:+243972233695" className="underline">
                +243 972 233 695
              </a>
            </p>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Info size={20} className="text-principal" />
              <h2 className="text-[14px] font-semibold">
                FAQ - Questions fréquentes
              </h2>
            </div>

            <div className="space-y-6 text-[13px]">
              {/* Question 1 */}
              <div>
                <h3 className="font-semibold mb-1 text-principal">
                  Comment se protéger contre la fièvre jaune ?
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>
                    Se faire vacciner contre la fièvre jaune au moins 10 jours
                    avant un voyage dans une zone à risque.
                  </li>
                  <li>
                    Utiliser des moustiquaires et répulsifs pour éviter les
                    piqûres de moustiques.
                  </li>
                  <li>Porter des vêtements longs, surtout en fin de journée.</li>
                  <li>
                    Éviter les zones marécageuses ou boisées où les moustiques
                    sont nombreux.
                  </li>
                </ul>
              </div>

              {/* Question 2 */}
              <div>
                <h3 className="font-semibold mb-1 text-principal">
                  Où puis-je trouver un centre de vaccination ?
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>
                    Rendez-vous dans les centres de santé agréés par le Ministère
                    de la Santé.
                  </li>
                  <li>
                    Consultez la carte interactive sur notre site web ou appelez
                    le <span className="font-medium">+243 972 233 695</span>.
                  </li>
                  <li>
                    Demandez à votre médecin traitant ou à un agent de santé
                    communautaire.
                  </li>
                </ul>
              </div>

              {/* Question 3 */}
              <div>
                <h3 className="font-semibold mb-1 text-principal">
                  Quels gestes barrières dois-je respecter ?
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>
                    Se laver régulièrement les mains avec de l’eau et du savon ou
                    une solution hydroalcoolique.
                  </li>
                  <li>
                    Porter un masque dans les lieux publics et en cas de
                    symptômes.
                  </li>
                  <li>Respecter la distanciation physique d’au moins 1 mètre.</li>
                  <li>Éviter de se toucher le visage (yeux, nez, bouche).</li>
                  <li>
                    Tousser ou éternuer dans un mouchoir ou dans le pli du coude.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default HealthMissionPage;
