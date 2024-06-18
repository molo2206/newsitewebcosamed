import SimpleBannerOffre from "../components/simpleBanner/SimpleBannerOffre";
import OffresServices from "../services/OffresServices";
import useAsync from "../hooks/useAsync";
import OffresCard from "../components/blogs/OffresCard";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import BreadCumb from "../components/navbar/BreadCumb";
const Offres = () => {
  const { data, loading } = useAsync(() => OffresServices.getOffres());
  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full dark:text-white ">
          <div>
            <BreadCumb title={"Offres"} />
            <h1 className=" mb-8 border-l-8 py-2 pl-2 text-center text-xl font-bold">
              Offres disponibles
            </h1>
            <section className="mb-10 ">
              <SimpleBannerOffre />
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-4">
                {loading
                  ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                  : data.map((item: any, index: number) => (
                      <OffresCard offre={item} key={index} />
                    ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Offres;
