import BulletinCard from "../components/blogs/BulletinCard";
import BulletinLoad from "../components/blogs/BulletinLoad";
import BulletinServices from "../services/BulletinServices";
import useAsync from "../hooks/useAsync";
import BreadCumb from "../components/navbar/BreadCumb";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../context";
import CategoryServices from "../services/CategoryServices";
import Input from "../components/form/Input";
import { showingTranslateValue, Type, Years } from "../utils/heleprs";
import useValidation from "../hooks/useValidation";
import { ApplyForm } from "../types";
import { useNavigate } from "react-router-dom";
const Bulletin = () => {
  const { data, loading } = useAsync(() => BulletinServices.getBulletin());
  const { data: cat } = useAsync(() => CategoryServices.getCategory());
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBulletins = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  const { t } = useTranslation();
  const { lang } = useAuthContext();

  const { inputs, errors, handleOnChange, hanldeError } =
    useValidation<ApplyForm>({ keyword: "" });

  const validation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.keyword) {
      hanldeError("keyword is required", "keyword");
      return;
    }
    navigate("/search-results-page?q=" + inputs.keyword);
  };
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
              COSAMED's publications repository directly.
            </p>

            <div className="bg-gray-100 p-6 dark:bg-slate-800 mb-12">
              <form
                onSubmit={validation}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                <Input
                  required
                  label="Select health topic"
                  type="select"
                  errors=""
                  value=""
                  options={cat?.map((item: any) => ({
                    label: showingTranslateValue(item?.translations, lang)
                      ?.name,
                    value: item.id,
                  }))}
                />

                <Input
                  required
                  label="Select a year"
                  type="select"
                  errors=""
                  value=""
                  options={Years?.map((item: any) => ({
                    label: item.label,
                    value: item.value,
                  }))}
                />
                <Input
                  required
                  label="Select publication type"
                  type="select"
                  errors=""
                  value=""
                  options={Type?.map((item: any) => ({
                    label: item.label,
                    value: item.value,
                  }))}
                />
                <Input
                  label={t("Search")}
                  name="keyword"
                  placeholder={t("Search")}
                  type="text"
                  errors={errors.keyword}
                  value={inputs.keyword}
                  onChange={(e: any) =>
                    handleOnChange(e.target.value, "keyword")
                  }
                />
              </form>
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
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
};

export default Bulletin;
