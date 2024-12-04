import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import BlogServices from "../services/BlogsServices";
import CategoryServices from "../services/CategoryServices";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import usePageSEO from "../components/Seo/usePageSEO";
import BreadCumb from "../components/navbar/BreadCumb";
import Error404 from "./Error404";
import CategoryCard from "../components/blogs/CategoryCard";
import { ImageBlogs } from "../components/blogs/ImageBlogs";
import Seo from "../components/Seo/Seo";
import { useTranslation } from "react-i18next";

const DetailBlog = () => {
  const { slug } = useParams();
  const { lang } = useAuthContext();
  const { data, error, loading } = useAsync(
    () => BlogServices.oneBlogs(slug),
    slug
  );

  const { data: cat } = useAsync(() => CategoryServices.getCategory());
  usePageSEO({
    title: showingTranslateValue(data?.translations, lang)?.title,
    keywords: ["Santé", "Actualité", "Gap", "Alert", "Projet"],
    ogTitle: "Detail blog",
    ogDescription: showingTranslateValue(data?.translations, lang)?.description,
    ogImage: data?.image,
    ogUrl: window.location.href,
  });
  Seo({
    title: data,
  });
  const { t } = useTranslation();

  return error ? (
    <Error404 />
  ) : (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container w-full dark:text-white py-1 mt-10 ">
          {/* Blog Content */}
          <BreadCumb
            title="Detail blog"
            second={"/data-loading/blogs"}
            secondTitle={"Blog"}
          />
          <div className="bg-white p-6 shadow rounded-lg dark:bg-slate-800 border">
            {/* Blog Title and Meta Info */}
            <div className="mb-6">
              <h2
                className="text-2xl font-bold text-gray-800 dark:text-white"
                dangerouslySetInnerHTML={{
                  __html: showingTranslateValue(data?.translations, lang)
                    ?.title,
                }}
              ></h2>
              <p className="text-sm text-gray-500 dark:text-white">
                Publié le {data?.publication_date} • Catégorie :{" "}
                {
                  showingTranslateValue(data?.category?.translations, lang)
                    ?.name
                }
              </p>
            </div>

            {/* Main Image */}
            <div className="mb-6">
              <img
                src={data?.image}
                alt="Main Blog"
                className="w-full rounded-lg"
              />
            </div>
            <p
              className=" font-montserrat text-lg"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(data?.translations, lang)
                  ?.documentation,
              }}
            ></p>

            <ImageBlogs data={data?.allimages} />

            <p
              className="text-gray-700 dark:text-white text-lg  mb-6"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(data?.translations, lang)
                  ?.description,
              }}
            ></p>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t("Category")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.map((item: any, index: number) => (
                  <CategoryCard cat={item} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailBlog;
