import BlogServices from "../services/BlogsServices";
import useAsync from "../hooks/useAsync";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import SimpleBannerImportance from "../components/simpleBanner/SimpleBannerImportance";

const ImportanceDon = () => {
  const { data, loading } = useAsync(() => BlogServices.getBlog());
  //Get current blog
  console.log(data);
  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full dark:text-white ">
          <div>
            <BreadCumb title={"À quoi servent vos dons"} />
            <section className="mb-10 ">
              <SimpleBannerImportance />
              <h1 className=" mb-8 border-l-8 py-2 pl-2 text-center text-3xl font-bold">
                Découvrez l'impact de votre générosité et comment vos
                contributions changent des vies.
              </h1>
              <section className="bg-white p-6 rounded-lg shadow-md dark:border-slate-50  border dark:bg-slate-900 w-full dark:text-white">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Soutenir des causes essentielles
                </h2>
                <p className="mt-4 text-gray-600 dark:text-white">
                  Vos dons permettent de financer des programmes éducatifs, de
                  fournir des soins médicaux, et de soutenir des initiatives
                  pour lutter contre la pauvreté. Chaque contribution compte.
                </p>
              </section>

              {/* Section 2 */}
              <section className="bg-white p-6 rounded-lg shadow-md mt-2 dark:border-slate-50  border dark:bg-slate-900  w-full dark:text-white">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Répondre aux urgences
                </h2>
                <p className="mt-4 text-gray-600 dark:text-white">
                  En cas de catastrophe naturelle ou de crise humanitaire, vos
                  dons nous aident à apporter une aide immédiate, notamment des
                  vivres, des abris, et des secours d'urgence.
                </p>
              </section>

              {/* Section 3 */}
              <section className="bg-white p-6 rounded-lg shadow-md mt-2 dark:border-slate-50  border dark:bg-slate-900 w-full dark:text-white">
                <h2 className="text-2xl font-semibold dark:text-white text-gray-800">
                  Investir dans un avenir durable
                </h2>
                <p className="mt-4 text-gray-600 dark:text-white">
                  Grâce à votre soutien, nous investissons dans des projets à
                  long terme tels que l'énergie renouvelable, les
                  infrastructures et les opportunités économiques pour les
                  communautés vulnérables.
                </p>
              </section>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ImportanceDon;
