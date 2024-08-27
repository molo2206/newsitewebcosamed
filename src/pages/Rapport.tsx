import BulletinCard from "../components/blogs/BulletinCard";
import BulletinLoad from "../components/blogs/BulletinLoad";
import RapportServices from "../services/RapportServices";
import SimpleBannerBulletin from "../components/simpleBanner/SimpleBannerBulletin";
import useAsync from "../hooks/useAsync";
import BreadCumb from "../components/navbar/BreadCumb";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import { useTranslation } from "react-i18next";
import RepportCard from "../components/blogs/RepportCard";
const Rapport = () => {

  const { data, loading } = useAsync(() => RapportServices.getRapport());
  const { data: bulletin } = useAsync(() => RapportServices.lastRapport());

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBulletins = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  const { t } = useTranslation();
  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BulletinLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full dark:text-white ">
          <BreadCumb title={t('Reports')} />
          <section className="mb-10">
            <SimpleBannerBulletin bulletin={bulletin} />
            <h1 className=" mb-8 border-l-8 py-2 pl-2 text-center text-3xl font-bold">
              {t('')}
            </h1>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {loading
                ? Array.from(Array(20).keys()).map(() => <BulletinLoad />)
                : currentBulletins.map((item: any, index: number) => (
                    <RepportCard report={item} key={index} />
                  ))}
            </div>
          </section>
          <Pagination
            postsPerPage={postsPerPage}
            totalPasts={data.length}
            paginate={paginate}
          />
        </div>
      )}
    </>
  );
};

export default Rapport;
