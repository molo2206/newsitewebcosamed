// Imports externes
import { useTranslation } from "react-i18next";

// Imports de styles et composants
import "react-multi-carousel/lib/styles.css";
import BlogCardLoand from "../../components/blogs/BlogCardLoad";
import PartnerCard from "../../components/blogs/PartnerCard";

// Imports des hooks et services
import useAsync from "../../hooks/useAsync";
import PartenersServices from "../../services/PartenersServices";

function BannerPartener() {
  // Hooks
  const { t } = useTranslation();

  // Données des partenaires
  const { data, loading } = useAsync(() => PartenersServices.getPartners());

  return (
    <div className="p-6 bg-white">
      <div className="">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          {t("Become_a_partner", "Devenir Partenaire")}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <BlogCardLoand key={i} />)
            : data?.map((partner: any, i: number) => (
                <PartnerCard key={i} partners={partner} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default BannerPartener;
