import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DonateBannerLoad = () => {
  return (
    <section className="bg-slate-100 dark:bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row overflow-hidden rounded-2xl shadow-sm bg-white dark:bg-slate-800">
          {/* Left Section */}
          <div className="w-full flex-1 p-6 lg:p-16 flex flex-col justify-center">
            {/* Titre */}
            <Skeleton height={30} width="60%" className="mb-6" />
            {/* Texte */}
            <Skeleton height={15} count={3} width="90%" className="mb-8" />
            {/* Boutons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Skeleton height={40} width={120} />
              <Skeleton height={40} width={180} />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 relative">
            <Skeleton height={300} width="100%" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateBannerLoad;
