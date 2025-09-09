import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BulletinLoad = () => {
  return (
    <div className="p-4 shadow-lg rounded-md bg-white dark:bg-slate-800 transition-all duration-300 w-full max-w-full">
      {/* Image ou media */}
      <div className="overflow-hidden rounded-md w-full">
        <Skeleton
          count={1}
          width="100%"
          height={200}
          baseColor="var(--skeleton-base)"
          highlightColor="var(--skeleton-highlight)"
          className="w-full"
        />
      </div>

      {/* Meta info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 text-slate-600 dark:text-gray-400 gap-2 sm:gap-0">
        <Skeleton
          count={1}
          width="70%"             // mobile
          className="sm:w-[150px]" // desktop
          height={20}
          baseColor="var(--skeleton-base)"
          highlightColor="var(--skeleton-highlight)"
        />
        <Skeleton
          count={1}
          width="30%"             // mobile
          className="sm:w-[60px]"  // desktop
          height={20}
          baseColor="var(--skeleton-base)"
          highlightColor="var(--skeleton-highlight)"
        />
      </div>

      {/* Title & description */}
      <div className="space-y-2 pt-2">
        <h1 className="font-montserrat line-clamp-1 font-bold text-lg">
          <Skeleton
            count={1}
            width="100%"
            height={20}
            baseColor="var(--skeleton-base)"
            highlightColor="var(--skeleton-highlight)"
          />
        </h1>
        <p className="font-montserrat text-sm text-gray-700 dark:text-gray-300">
          <Skeleton
            count={5}
            width="100%"
            height={15}
            baseColor="var(--skeleton-base)"
            highlightColor="var(--skeleton-highlight)"
          />
        </p>
      </div>
    </div>
  );
};

export default BulletinLoad;
