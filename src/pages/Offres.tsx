import OffresServices from "../services/OffresServices";
import useAsync from "../hooks/useAsync";
import OffresCard from "../components/blogs/OffresCard";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import Pagination from "../components/Pagination/Pagination";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context";
import useValidation from "../hooks/useValidation";
import { ApplyForm } from "../types";
import InputSpecial from "../components/form/InputSpecial";
import ButtonSpecial from "../components/form/ButtonSpecial";
import { t } from "i18next";
const Offres = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const goToAbout = () => {
    navigate("/job_openings/userHome"); // Remplace "/about" par la route cible
  };

  const goToLogin = () => {
    navigate("/auth/login"); // Remplace "/about" par la route cible
  };

  const goToCarriere = () => {
    navigate("/job_openings"); // Remplace "/about" par la route cible
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
  const { inputs, errors, handleOnChange, hanldeError } =
    useValidation<ApplyForm>({
      keyword: "",
    });
  const validation = (e: any) => {
    e.preventDefault();

    let valide = true;
    if (!inputs.keyword) {
      hanldeError("keyword is required", "keyword");
      valide = false;
    }

    if (valide) {
      navigate("/search-offre?q=" + inputs.keyword);
    }
  };
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
                  className="w-full h-[400px] object-cover "
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
              <div className="bg-white p-6 shadow-md rounded-md max-w-4xl mx-auto -mt-12 relative  dark:bg-slate-800">
                <div className="flex items-center space-x-4">
                  <form
                    onSubmit={validation}
                    className="mt-6 max-w-md mx-auto flex flex-col md:flex-row gap-4"
                  >
                    <InputSpecial
                      name="keyword"
                      placeholder="Rechercher des emplois ou mots-clés"
                      type="text"
                      errors={errors.keyword}
                      value={inputs.keyword}
                      // onFocus={() => hanldeError(null, `keyword`)}
                      onChange={(e: any) =>
                        handleOnChange(e.target.value, "keyword")
                      }
                    />
                    <ButtonSpecial label="Rechercher" loading={loading} />
                  </form>
                </div>
                <div className="flex justify-between items-center mt-4 space-x-4 ">
                  {!user ? (
                    <button
                      onClick={goToLogin}
                      className="bg-white text-principal  dark:bg-transparent  dark:text-white border dark:border-slate-700 px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition"
                    >
                      Mes candidatures
                    </button>
                  ) : (
                    <button
                      onClick={goToAbout}
                      className="bg-white text-principal dark:bg-transparent dark:text-white border dark:border-slate-700 px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition"
                    >
                      Mes candidatures
                    </button>
                  )}
                  <button
                    onClick={goToCarriere}
                    className="bg-white hidden md:block text-principal dark:bg-transparent border dark:text-white dark:border-slate-700 px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition"
                  >
                    Page carrières
                  </button>
                  <button
                    onClick={goAlert}
                    className="bg-white text-principal dark:bg-transparent border dark:text-white dark:border-slate-700 px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition"
                  >
                    Alertes d'emploi
                  </button>
                </div>
                <div className="py-4">
                  <button
                    onClick={goToCarriere}
                    className="bg-white block md:hidden text-principal dark:bg-transparent border dark:text-white dark:border-slate-700 px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition"
                  >
                    Page carrières
                  </button>
                </div>
              </div>
              {/* Job Listings */}
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {loading
                  ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                  : currentOffres.map((item: any, index: number) => (
                      <div className="py-2">
                        <OffresCard job={item} key={index} />
                      </div>
                    ))}
              </div>
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
                <InputSpecial
                  required
                  name="email"
                  label="Email"
                  placeholder={t("Enter_email")}
                  type="email"
                  errors={errors.email}
                  value={inputs.email}
                  onFocus={() => hanldeError(null, `email`)}
                  onChange={(e: any) => handleOnChange(e.target.value, "email")}
                />
                <ButtonSpecial label={t("SendMessage")} loading={loading} />
              </form>
            </section>
            <br />
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default Offres;
