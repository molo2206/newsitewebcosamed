import useAsync from "../../hooks/useAsync";
import BulletinServices from "../../services/BulletinServices";
import BulletinLoad from "./BulletinLoad";
import BulletinCard from "./BulletinCard";
import { useTranslation } from "react-i18next";

const Bulletin = () => {
  const { t } = useTranslation();
  const { data, loading } = useAsync(() => BulletinServices.getBulletinHome());
  return (
    <div className="dark:bg-slate-900 w-full dark:text-white py-2">
      <div className="">
      
        <section className="container mb-10 py-2 dark:bg-slate-800 ">
          {/* <SimpleBannerBlog img={Img1} /> */}
          <h1 className="py-2 pl-2 text-left md:text-3xl sm:text-2xl font-bold">
            {t('Newsletters')}
          </h1>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 py-4 ">
            {loading
              ? Array.from(Array(20).keys()).map(() => (
                  <BulletinLoad />
                ))
              : data.map((item: any, index: number) => (
                  <BulletinCard bulletin={item} key={index} />
                ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Bulletin;
