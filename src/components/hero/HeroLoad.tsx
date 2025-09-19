import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroLoad = () => {
  return (
    <section className="bg-slate-100 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto p-6 relative">
        <div className="relative h-[400px] md:h-[550px] lg:h-[600px] xl:h-[650px] rounded-md overflow-hidden">
          {/* Image */}
          <Skeleton
            height="100%"
            width="100%"
            baseColor="var(--skeleton-base)"
            highlightColor="var(--skeleton-highlight)"
          />

          {/* Contenu texte simulé */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white space-y-4">
            {/* Catégorie */}
            <Skeleton
              width={100}
              height={25}
              baseColor="var(--skeleton-base)"
              highlightColor="var(--skeleton-highlight)"
              className="rounded-md"
            />

            {/* Titre */}
            <Skeleton
              width="70%"
              height={30}
              baseColor="var(--skeleton-base)"
              highlightColor="var(--skeleton-highlight)"
            />
            <Skeleton
              width="50%"
              height={30}
              baseColor="var(--skeleton-base)"
              highlightColor="var(--skeleton-highlight)"
            />

            {/* Meta infos */}
            <div className="flex items-center space-x-6">
              <Skeleton
                circle
                width={24}
                height={24}
                baseColor="var(--skeleton-base)"
                highlightColor="var(--skeleton-highlight)"
              />
              <Skeleton
                width={120}
                height={20}
                baseColor="var(--skeleton-base)"
                highlightColor="var(--skeleton-highlight)"
              />

              <Skeleton
                circle
                width={40}
                height={40}
                baseColor="var(--skeleton-base)"
                highlightColor="var(--skeleton-highlight)"
              />
              <Skeleton
                width={100}
                height={20}
                baseColor="var(--skeleton-base)"
                highlightColor="var(--skeleton-highlight)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroLoad;
