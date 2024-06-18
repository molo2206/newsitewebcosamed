
import useAsync from "../../hooks/useAsync";
import BlogServices from "../../services/BlogsServices";
import EmergencyLoad from "./EmergencyLoad";
import EmergencyCard from "./EmergencyCard";

const Emergency = () => {
  const { data, loading } = useAsync(() => BlogServices.getBlog());
  return (
    <div className=" dark:bg-slate-900 w-full dark:text-white ">
      <div>
        <section className="mb-10 ">
          {/* <SimpleBannerBlog img={Img1} /> */}
          <h1 className=" mb-8 border-l-8 py-2 pl-2 text-left text-3xl font-bold">
            Emergency Situations
          </h1>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {loading
              ? Array.from(Array(20).keys()).map(() => (
                  <EmergencyLoad />
                ))
              : data.map((item: any, index: number) => (
                  <EmergencyCard emergency={item} key={index} />
                ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Emergency;
