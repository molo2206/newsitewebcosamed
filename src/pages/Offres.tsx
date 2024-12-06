import OffresServices from "../services/OffresServices";
import useAsync from "../hooks/useAsync";
import OffresCard from "../components/blogs/OffresCard";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import Pagination from "../components/Pagination/Pagination";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Offres = () => {
  const navigate = useNavigate();
  const goToAbout = () => {
    navigate("/job_openings/userHome"); // Remplace "/about" par la route cible
  };
  const goAlert = () => {
    navigate("/recruiting/cosamed/job_openings/jobalerts"); // Remplace "/about" par la route cible
  };
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
              <div className="relative rounded-md ">
                <img
                  src="https://apicosamed.cosamed.org/uploads/blogs/6adbe8b2ab3a52e619c526eff905468a.png" // Remplacez par l'URL de l'image ou importez-la localement
                  alt="Background"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-principal bg-opacity-60 flex items-center justify-center ">
                  <header className="bg-transparent dark:bg-transparent w-full dark:text-white text-white py-10">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                      <h1 className="text-4xl font-bold">
                        Offres d'emploi disponibles
                      </h1>
                      <p className="mt-4 text-lg">
                        Trouvez l'opportunité qui correspond à vos compétences
                        et aspirations.
                      </p>
                    </div>
                  </header>
                </div>
              </div>

              {/* Section Recherche */}
              <div className="bg-white p-6 shadow-md rounded-md max-w-4xl mx-auto -mt-12 relative z-10 dark:bg-slate-800">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Rechercher des emplois ou des mots-clés"
                    className="flex-1 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                    Rechercher
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4 space-x-4 ">
                  <button
                    onClick={goToAbout}
                    className="bg-white text-principal dark:bg-transparent dark:text-white border dark:border-slate-700 px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition"
                  >
                    Mes candidatures
                  </button>
                  <button
                    onClick={goAlert}
                    className="bg-white text-principal dark:bg-transparent border dark:text-white dark:border-slate-700 px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition"
                  >
                    Alertes d'emploi
                  </button>
                </div>
              </div>
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
