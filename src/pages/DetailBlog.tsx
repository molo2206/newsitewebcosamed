import { useNavigate, useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import BlogServices from "../services/BlogsServices";
import CategoryServices from "../services/CategoryServices";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import usePageSEO from "../components/Seo/usePageSEO";
import BreadCumb from "../components/navbar/BreadCumb";
import Error404 from "./Error404";
import { ImageBlogs } from "../components/blogs/ImageBlogs";
import Seo from "../components/Seo/Seo";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import Pagination from "../components/Pagination/Pagination";
import { useState } from "react";

const DetailBlog = () => {
  const navigate = useNavigate();

  const { slug } = useParams();
  const { lang } = useAuthContext();
  const { data, error, loading } = useAsync(
    () => BlogServices.oneBlogs(slug),
    slug
  );
  const { data: recentPost, loading: load } = useAsync(() =>
    BlogServices.getBlogHome()
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

  //Get current blog
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = recentPost.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return error ? (
    <Error404 />
  ) : (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container w-full dark:text-white py-1 mt-10 ">
          <BreadCumb
            title="Detail blog"
            second={"/data-loading/blogs"}
            secondTitle={"Blog"}
          />
          <div className="min-h-screen dark:bg-slate-800  font-sans rounded-lg dark:border-slate-700 border">
            <header className="bg-white dark:bg-slate-700 rounded-lg shadow-sm py-3">
              <div className="container mx-auto flex gap-4 px-4">
                <div>
                  {cat.map((category: any, index: any) => (
                    <button
                      onClick={() =>
                        navigate(
                          `/blog/category/` +
                            showingTranslateValue(category?.translations, lang)
                              ?.category_id
                        )
                      }
                      key={index}
                      className="text-sm bg-gray-200 dark:bg-slate-800 rounded-full  px-4 py-1 hover:bg-gray-300"
                    >
                      {
                        showingTranslateValue(category?.translations, lang)
                          ?.name
                      }
                    </button>
                  ))}
                </div>
              </div>
            </header>
            <main className="grid grid-cols-1 md:grid-cols-3 dark:bg-slate-800  gap-6 p-4 md:p-8">
              <section className="md:col-span-2 relative dark:bg-slate-800 ">
                <div className="relative rounded-md overflow-hidden shadow-lg">
                  <img
                    src={data?.image} // Remplacer avec l'image appropriée
                    alt="Aide pour Mayotte"
                    className="w-full h-[300px] md:h-[400px] object-cover"
                  />
                  <div className="absolute bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4">
                    <span className="bg-red-500 px-2 py-1 text-xs uppercase font-bold text-white rounded">
                      {
                        showingTranslateValue(
                          data?.category?.translations,
                          lang
                        )?.name
                      }
                    </span>

                    <h2
                      className="text-white sm:text-sm md:text-xl lg:text-xl font-bold mt-2 leading-tight"
                      dangerouslySetInnerHTML={{
                        __html: showingTranslateValue(data?.translations, lang)
                          ?.title,
                      }}
                    ></h2>
                  </div>
                </div>
                <p
                  style={{ fontSize: 13 }}
                  className=" font-montserrat lg:text-lg md:text-xl dark:text-white "
                  dangerouslySetInnerHTML={{
                    __html: showingTranslateValue(data?.translations, lang)
                      ?.documentation,
                  }}
                ></p>
                <aside className="md:col-span-1 bg-white dark:bg-slate-800  rounded-md mt-4 shadow-lg p-4">
                  <ImageBlogs data={data?.allimages} />
                  <div className="text-gray-700 leading-relaxed space-y-4 dark:text-white font-light">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: showingTranslateValue(data?.translations, lang)
                          ?.description,
                      }}
                    ></p>
                  </div>
                  <img
                    src={data.author.image}
                    alt={data.author.full_name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="bg-red-500 px-2 py-1 text-xs uppercase font-bold text-white rounded">
                    <span
                      style={{ fontSize: 12 }}
                      className="dark:text-white sm:text-sm md:text-sm lg:text-sm "
                    >
                      Par {data?.author.full_name}
                    </span>
                  </span>
                </aside>
              </section>

              {/* Section des brèves */}
              <aside className="md:col-span-1 bg-white dark:bg-slate-800 dark:border-slate-700 border rounded-md shadow-lg p-4">
                <h3 className="text-lg font-semibold pb-2 mb-4">Récentes</h3>
                <ul className="space-y-4">
                  {load
                    ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                    : currentBlogs.map((item: any, index: number) => (
                        <li className="flex items-start  px-2  font-semibold ">
                          <h1
                            style={{ fontSize: 11 }}
                            className=" line-clamp-2 cursor-pointer border-t border-gray-200 hover:text-slate-700"
                            onClick={() =>
                              navigate(
                                `/blog/detail/` +
                                  showingTranslateValue(
                                    item?.translations,
                                    lang
                                  )?.slug
                              )
                            }
                            key={index}
                            dangerouslySetInnerHTML={{
                              __html: showingTranslateValue(
                                item?.translations,
                                lang
                              )?.title,
                            }}
                          ></h1>
                        </li>
                      ))}
                </ul>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPasts={recentPost.length}
                  paginate={paginate}
                />
              </aside>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailBlog;
