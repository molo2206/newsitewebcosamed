import TeamsServices from "../services/TeamsServices";
import useAsync from "../hooks/useAsync";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import TeamCard from "../components/blogs/TeamCard";
import BreadCumb from "../components/navbar/BreadCumb";

const Team = () => {
  const { data, loading } = useAsync(() => TeamsServices.getTeam());
  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full dark:text-white py-8">
          <div>
            <BreadCumb title={"Team"} />
            <section className="mb-10 ">
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-4">
                {loading
                  ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                  : data.map((item: any, index: number) => (
                      <TeamCard team={item} key={index} />
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

export default Team;
