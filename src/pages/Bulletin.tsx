import BulletinCard from "../components/blogs/BulletinCard";
import BulletinLoad from "../components/blogs/BulletinLoad";
import BulletinServices from "../services/BulletinServices";
import useAsync from "../hooks/useAsync";
import BreadCumb from "../components/navbar/BreadCumb";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import { useTranslation } from "react-i18next";
const Bulletin = () => {
  const { data, loading } = useAsync(() => BulletinServices.getBulletin());

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
        <div className="p-6  dark:bg-slate-900 w-full dark:text-white ">
          <BreadCumb title={"Bulletins"} />
          <section className="mb-10">
            <h1 className="text-3xl font-bold mb-2">{t("How_news_letters")}</h1>
            <p className="text-gray-600 mb-6">
              If you cannot find a publication on our website, please search
              WHO's publications repository directly.
            </p>

            <div className="bg-gray-100 p-6 rounded-lg mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Search by keyword"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Health Topic"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Countries/Areas"
                  className="p-2 border rounded"
                />
                <select className="p-2 border rounded">
                  <option>2022</option>
                  <option>2023</option>
                  <option>2024</option>
                  <option>2025</option>
                </select>
                <select className="p-2 border rounded">
                  <option>Publication type</option>
                </select>
                <input
                  type="text"
                  placeholder="Publishing Offices"
                  className="p-2 border rounded"
                />
              </div>
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
              {loading
                ? Array.from(Array(20).keys()).map(() => <BulletinLoad />)
                : currentBulletins.map((item: any, index: number) => (
                    <BulletinCard bulletin={item} key={index} />
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

export default Bulletin;
