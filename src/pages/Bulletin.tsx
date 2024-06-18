import Img1 from "../assets/blogs/b1.jpeg";
import BulletinCard from "../components/blogs/BulletinCard";
import BulletinLoad from "../components/blogs/BulletinLoad";
import BulletinServices from "../services/BulletinServices";
import SimpleBannerBulletin from "../components/simpleBanner/SimpleBannerBulletin";
import useAsync from "../hooks/useAsync";
import BreadCumb from "../components/navbar/BreadCumb";
const Bulletin = () => {
  const { data, loading } = useAsync(() => BulletinServices.getBulletin());
  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BulletinLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full dark:text-white ">
          <BreadCumb title={"Tiya titre apa kaka"}/>
          <section className="mb-10">
            <SimpleBannerBulletin img={Img1} />
            <h1 className=" mb-8 border-l-8 py-2 pl-2 text-center text-3xl font-bold">
              Our Latest Newsletters
            </h1>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {loading
                ? Array.from(Array(20).keys()).map(() => <BulletinLoad />)
                : data.map((item: any, index: number) => (
                    <BulletinCard bulletin={item} key={index} />
                  ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Bulletin;
