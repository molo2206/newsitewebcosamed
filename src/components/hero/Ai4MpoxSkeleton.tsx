import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Ai4MpoxSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-md shadow-sm p-4 space-y-4">
      {/* Image */}
      <Skeleton className="rounded-md" height={144} /> {/* h-36 */}

      {/* Titre */}
      <Skeleton width="75%" height={20} />

      {/* Extrait */}
      <Skeleton count={2} height={14} />
      <Skeleton width="85%" height={14} />

      {/* Footer (Auteur + Date) */}
      <div className="flex items-center justify-between mt-2">
        <Skeleton width={96} height={24} /> {/* Auteur */}
        <Skeleton width={64} height={24} /> {/* Date */}
      </div>
    </div>
  );
};

export default Ai4MpoxSkeleton;
