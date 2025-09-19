import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AboutLoad = () => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb / Header */}
      <Skeleton height={30} width="40%" className="rounded-md" />

      {/* Section principale */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <Skeleton height={20} width="60%" />
          <Skeleton count={4} height={15} />
          <Skeleton height={300} className="rounded-md" />
          <Skeleton count={2} height={15} />
        </div>

        <div className="space-y-4">
          <Skeleton height={20} width="40%" />
          <Skeleton height={300} className="rounded-md" />
          <Skeleton count={2} height={15} />
          <Skeleton height={20} width="60%" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} height={60} className="rounded-md" />
            ))}
          </div>
        </div>
      </div>

      {/* Nos adresses */}
      <div className="space-y-4">
        <Skeleton height={25} width="30%" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton height={20} width="50%" />
              <Skeleton height={15} width="80%" />
              <Skeleton height={15} width="60%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutLoad;
