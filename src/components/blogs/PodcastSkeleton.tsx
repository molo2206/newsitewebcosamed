import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PodcastSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-md shadow-md overflow-hidden">
      <Skeleton height={160} width="100%" />

      <div className="p-4 flex flex-col space-y-2">
        <Skeleton height={20} width="80%" />
        <Skeleton height={15} width="90%" count={2} />
        <Skeleton height={80} width="100%" />
        <Skeleton height={12} width="50%" />
      </div>
    </div>
  );
};

export default PodcastSkeleton;
