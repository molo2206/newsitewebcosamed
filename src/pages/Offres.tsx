import OffresServices from "../services/OffresServices";
import useAsync from "../hooks/useAsync";
import OffresCard from "../components/blogs/OffresCard";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import Pagination from "../components/Pagination/Pagination";
import { useState } from "react";
const Offres = () => {
  const { data, loading } = useAsync(() => OffresServices.getOffres());
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentOffres = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full h-full dark:text-white ">
          <div>
            <BreadCumb title={"Offres"} />

            <section className="mb-10 ">
              <header className="bg-principal dark:bg-slate-800 w-full dark:text-white rounded-lg text-white py-10">
                <div className="max-w-6xl mx-auto px-4 text-center">
                  <h1 className="text-4xl font-bold">
                    Offres d'emploi disponibles
                  </h1>
                  <p className="mt-4 text-lg">
                    Trouvez l'opportunité qui correspond à vos compétences et
                    aspirations.
                  </p>
                </div>
              </header>
              {/* Job Listings */}
              <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
                {loading
                  ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                  : currentOffres.map((item: any, index: number) => (
                      <OffresCard job={item} key={index} />
                    ))}
              </section>
            </section>
            <Pagination
              postsPerPage={postsPerPage}
              totalPasts={data.length}
              paginate={paginate}
            />
            <section className="mt-16 text-center bg-blue-50 p-10 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800">
                Restez informé
              </h2>
              <p className="text-gray-600 mt-2">
                Abonnez-vous pour recevoir les dernières offres d'emploi
                directement dans votre boîte mail.
              </p>
              <form className="mt-6 max-w-md mx-auto flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Entrez votre email"
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  S'abonner
                </button>
              </form>
            </section>

            {/* Call to Action */}
            {/* <div className="mt-12 text-center">
              <h2 className="text-lg font-medium text-gray-800">
                Vous ne trouvez pas ce que vous cherchez ?
              </h2>
              <p className="text-gray-600 mt-1">
                Envoyez-nous votre CV et soyez informé des nouvelles
                opportunités.
              </p>
              <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Soumettre votre CV
              </button>
            </div> */}
            <br />
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default Offres;
