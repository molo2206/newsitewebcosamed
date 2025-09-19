import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RejoindreLoad = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb / Header */}
      <Skeleton height={30} width="40%" className="rounded-md" />

      <section className="mt-6 flex flex-col md:flex-row gap-6">
        {/* Colonne gauche: Avantages / Obligations */}
        <div className="md:w-3/5 p-6 border rounded-md space-y-4">
          <Skeleton height={25} width="60%" />
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} height={15} />
          ))}
        </div>

        {/* Colonne droite: Formulaire */}
        <div className="md:w-2/5 p-6 border rounded-md space-y-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} height={40} className="rounded-md" />
          ))}

          {/* Fichiers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} height={40} className="rounded-md" />
            ))}
          </div>

          {/* TextArea */}
          <Skeleton height={100} className="rounded-md" />

          {/* Bouton */}
          <Skeleton height={45} width="50%" className="rounded-md mt-2" />

          {/* Note confidentialité */}
          <Skeleton height={15} width="80%" />
        </div>
      </section>
    </div>
  );
};

export default RejoindreLoad;
