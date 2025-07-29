import BreadCumb from "../components/navbar/BreadCumb";

const NotreHistoire = () => {
  return (
    <main className="bg-white dark:bg-slate-900 w-full text-gray-800 dark:text-white p-6">
      <BreadCumb title="Notre histoire" />

      <section className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md">
        <h1 className="text-[16px] font-bold uppercase tracking-widest">
          Notre histoire
        </h1>
      </section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <section className="mb-10">
          <p className="text-[14px] leading-relaxed">
            En <strong>janvier 2017</strong>, un groupe d’étudiants de la
            faculté de médecine de l’Université de Goma, dirigé par{" "}
            <strong>Monsieur ELIA Badjo</strong>, fonde <strong>COSAMED</strong>
            , avec pour mission de promouvoir l’excellence scientifique, la
            recherche en santé publique, et l’éducation sanitaire.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-[15px] font-semibold mb-2 text-principal">
            Les débuts
          </h2>
          <p className="text-[12px] leading-relaxed">
            Les premières activités ont consisté en des{" "}
            <strong>échanges scientifiques</strong> et la célébration de{" "}
            <strong>journées mondiales de santé</strong>. À partir de{" "}
            <strong>2020</strong>, l’association s’est élargie à des{" "}
            <strong>professionnels de santé</strong> pour former une équipe
            pluridisciplinaire.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-[15px] font-semibold mb-2 text-principal">
            Engagement humanitaire
          </h2>
          <p className="text-[12px] leading-relaxed">
            En <strong>2021</strong>, COSAMED intègre le{" "}
            <strong>cluster santé au Nord-Kivu</strong> et joue un rôle actif
            dans les groupes de travail sur la santé reproductive et mentale. En{" "}
            <strong>2023</strong>, l’organisation reçoit son{" "}
            <strong>premier financement du Fonds Humanitaire</strong>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-[15px] font-semibold mb-2 text-principal">
            Domaines d'intervention
          </h2>
          <p className="text-[15px] leading-relaxed">
            COSAMED œuvre pour les <strong>populations vulnérables</strong> dans
            des contextes humanitaires. Ses principaux domaines sont :
          </p>
          <ul className="list-disc list-inside text-[15px] mt-2 space-y-1">
            <li>Éducation sanitaire</li>
            <li>Offre de services de santé</li>
            <li>Recherche en santé publique</li>
            <li>Innovation numérique</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-[15px] font-semibold mb-2 text-principal">
            Réponse à la COVID-19
          </h2>
          <p className="text-[12px] leading-relaxed">
            Entre <strong>2020 et 2023</strong>, COSAMED s’adapte à la crise
            COVID-19 : distribution de kits sanitaires, sensibilisation
            communautaire, et recherches en collaboration avec
            <strong> Matahari (2022)</strong> et l’
            <strong>Université de Toronto (2025)</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-[15px] font-semibold mb-2 text-principal">
            Un rayonnement croissant
          </h2>
          <p className="text-[12px] leading-relaxed">
            Aujourd’hui, <strong>plus de 500 professionnels</strong> engagés
            œuvrent dans plusieurs provinces de la RDC. COSAMED rayonne au
            niveau régional avec le <strong>projet AI4Mpox</strong>
            et au niveau global via sa participation active auprès de l’
            <strong>OMS</strong> et du
            <strong> Global Health Cluster</strong>.
          </p>
        </section>
      </div>
    </main>
  );
};

export default NotreHistoire;
