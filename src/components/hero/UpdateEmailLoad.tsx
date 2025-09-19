import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UpdateEmailLoad = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center bg-gray-100 p-6 w-full dark:bg-slate-900">
      {/* Banner */}
      <Skeleton height={288} width="100%" className="rounded-md" />

      {/* Card */}
      <div className="w-full max-w-6xl bg-white shadow-md dark:bg-slate-800 p-4 mt-[-4rem]">
        {/* Header */}
        <Skeleton height={30} width="30%" className="mb-4" />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Image profil */}
          <div className="flex justify-center md:block">
            <Skeleton circle height={64} width={64} />
          </div>

          {/* Formulaire */}
          <div className="flex-1 space-y-4">
            {/* Inputs */}
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height={40} className="rounded-md" />
            ))}

            {/* Bouton */}
            <Skeleton height={45} width="50%" className="rounded-md mt-2" />
          </div>
        </div>

        {/* Changer mot de passe */}
        <div className="mt-8">
          <Skeleton height={25} width="30%" className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} height={40} className="rounded-md" />
            ))}
            <Skeleton height={45} width="50%" className="rounded-md mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmailLoad;
