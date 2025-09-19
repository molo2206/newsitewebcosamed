import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BulletinDetailLoad = () => {
  return (
    <div className="bg-white max-w-7xl mx-auto min-h-[650px] dark:bg-slate-900 p-6 animate-pulse space-y-6">
      {/* Breadcrumb */}
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>

      {/* Header du bulletin */}
      <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 mt-4 p-6 shadow-md rounded-md space-y-4">
        <Skeleton height={30} width="60%" className="mb-2" /> {/* Titre */}
        <Skeleton height={20} width="40%" className="mb-4" /> {/* Sous-titre / publication */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Colonne gauche - Image + Boutons */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <Skeleton height={240} width={240} /> {/* Image */}

            <Skeleton height={40} width={240} /> {/* Bouton Download */}
            <Skeleton height={10} width={240} /> {/* Progress bar */}
            <Skeleton height={30} width={120} /> {/* Bouton Share */}
          </div>

          {/* Colonne droite - Infos du bulletin */}
          <div className="md:col-span-2 space-y-2 text-sm sm:text-base text-right md:text-left">
            <Skeleton height={14} width="80%" />
            <Skeleton height={14} width="70%" />
            <Skeleton height={14} width="60%" />
            <Skeleton height={14} width="50%" />
            <Skeleton height={14} width="65%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulletinDetailLoad;
