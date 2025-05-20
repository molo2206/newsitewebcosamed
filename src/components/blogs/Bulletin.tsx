import useAsync from "../../hooks/useAsync";
import BulletinServices from "../../services/BulletinServices";
import BulletinLoad from "./BulletinLoad";
import BulletinCard from "./BulletinCard";
import { useTranslation } from "react-i18next";

const Bulletin = () => {
  const { t } = useTranslation();
  const { data, loading } = useAsync(() => BulletinServices.getBulletinHome());

  return (
    <section className="bg-slate-100 dark:bg-slate-900 py-4 w-full dark:text-white">
      <div className="container mx-auto px-4">
        {/* <SimpleBannerBlog img={Img1} /> */}

        <h1 className="py-4 pl-2 text-left text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
          {t("Newsletters")}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 20 }).map((_, i) => (
                <BulletinLoad key={i} />
              ))
            : data?.map((item: any, index: number) => (
                <BulletinCard bulletin={item} key={index} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Bulletin;
