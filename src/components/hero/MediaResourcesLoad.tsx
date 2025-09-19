import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MediaResourcesLoad = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8 animate-pulse">
      {/* Breadcrumb */}
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>

      {/* Section Header */}
      <div className="text-center p-6 bg-gray-300 dark:bg-slate-700 rounded-md shadow-md space-y-2">
        <Skeleton height={28} width={200} className="mx-auto" /> {/* Titre */}
        <Skeleton height={16} width={320} className="mx-auto" /> {/* Sous-titre */}
      </div>

      {/* Ressources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-slate-800 border-l-4 border-principal p-6 rounded-md space-y-2"
          >
            <Skeleton height={20} width="80%" /> {/* Titre */}
            <Skeleton height={12} width="90%" /> {/* Description */}
            <Skeleton height={12} width="50%" /> {/* Link */}
          </div>
        ))}
      </div>

      {/* Vidéos récentes */}
      <div>
        <h2 className="text-xl font-extrabold uppercase text-center mb-6 text-gray-700 dark:text-white">
          <Skeleton height={24} width={250} className="mx-auto" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton height={160} width="100%" /> {/* Thumbnail vidéo */}
              <Skeleton height={14} width="70%" /> {/* Titre vidéo */}
              <Skeleton height={12} width="50%" /> {/* Sous-titre */}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-12 bg-gray-300 rounded"></div>
        ))}
      </div>
    </div>
  );
};

export default MediaResourcesLoad;
