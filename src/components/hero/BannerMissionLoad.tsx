import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BannerMissionLoad = () => {
  return (
    <section className="bg-slate-100 dark:bg-slate-900 py-16">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bloc Mission Skeleton */}
          <div className="relative bg-white dark:bg-slate-800 border-l-4 border-principal shadow p-6 rounded-md dark:border-principal/70">
            <div className="flex items-center mb-4">
              <Skeleton circle height={20} width={20} />
              <Skeleton width={100} height={20} className="ml-2" />
            </div>
            <Skeleton count={4} height={14} className="mb-2" />
            <Skeleton count={2} height={14} width="80%" />
          </div>

          {/* Bloc Vision Skeleton */}
          <div className="relative bg-white dark:bg-slate-800 border-l-4 border-principal shadow p-6 rounded-md dark:border-principal">
            <div className="flex items-center mb-4">
              <Skeleton circle height={20} width={20} />
              <Skeleton width={100} height={20} className="ml-2" />
            </div>
            <Skeleton count={4} height={14} className="mb-2" />
            <Skeleton count={2} height={14} width="80%" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerMissionLoad;
