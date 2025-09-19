import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SearchResultsSkeleton = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 max-w-7xl mx-auto p-6 mt-6 space-y-6">
      {/* Breadcrumb */}
      <Skeleton width="25%" height={24} />

      {/* Formulaire de recherche */}
      <div className="bg-white dark:bg-slate-800 border p-4 sm:p-6 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-3 max-w-4xl mx-auto w-full">
          <Skeleton className="flex-grow rounded" height={48} />
          <Skeleton width={128} height={48} />
        </div>
      </div>

      {/* Header des résultats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Skeleton width="25%" height={24} />
        <Skeleton width="33%" height={16} />
      </div>

      {/* Résultats */}
      <div className="grid gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="rounded-lg" height={160} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} width={48} height={40} className="rounded" />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsSkeleton;
