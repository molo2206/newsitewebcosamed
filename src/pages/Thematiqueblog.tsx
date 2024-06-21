import CategoryServices from "../services/CategoryServices";
import useAsync from "../hooks/useAsync";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import { useParams } from "react-router-dom";
import BlogThematiqueCard from "../components/blogs/BlogThematiqueCard";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";

const Thematiqueblog = () => {
  const { id } = useParams();
  const { lang } = useAuthContext();
  const { data, loading } = useAsync(() => CategoryServices.getblogCat(id), id);
  const { data: cat } = useAsync(() => CategoryServices.getOneCategory(id), id);
  console.log(cat);
  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full dark:text-white ">
          <div>
            <BreadCumb title={"Category"} />
            <section className="mb-10 ">
              {/* <SimpleBannerBlog img={Img1} /> */}
              <h1 className=" mb-8 border-l-8 py-2 pl-2 text-center text-3xl font-bold">
                {showingTranslateValue(cat?.translations, lang)?.name}
              </h1>
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {loading
                  ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                  : data.map((item: any, index: number) => (
                      <BlogThematiqueCard cat={item} key={index} />
                    ))}
              </div>
            </section>
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default Thematiqueblog;
