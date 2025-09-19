import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ContactLoad = () => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb / Header */}
      <Skeleton height={30} width="40%" className="rounded-md" />

      {/* Section principale */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Left section: infos & carte */}
        <div className="space-y-4">
          <Skeleton height={20} width="50%" />
          <Skeleton count={4} height={15} />
          <Skeleton height={100} width="60%" />
          <Skeleton height={400} className="rounded-md" /> {/* iframe map */}
          <Skeleton height={20} width="50%" />
          <Skeleton count={3} height={15} />
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} circle width={32} height={32} />
            ))}
          </div>
        </div>

        {/* Right section: formulaire */}
        <div className="space-y-4">
          <Skeleton height={20} width="40%" />
          <Skeleton height={15} width="60%" />
          <Skeleton height={40} className="rounded-md" />
          <Skeleton height={40} className="rounded-md" />
          <Skeleton height={40} className="rounded-md" />
          <Skeleton height={100} className="rounded-md" />
          <Skeleton height={40} className="rounded-md" />
          <Skeleton count={3} height={15} />
        </div>
      </div>
    </div>
  );
};

export default ContactLoad;
