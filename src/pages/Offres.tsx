import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context";
import useAsync from "../hooks/useAsync";
import useValidation from "../hooks/useValidation";
import OffresServices from "../services/OffresServices";
import OffresCard from "../components/blogs/OffresCard";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import Pagination from "../components/Pagination/Pagination";
import InputSpecial from "../components/form/InputSpecial";
import ButtonSpecial from "../components/form/ButtonSpecial";
import { ApplyForm } from "../types";

const Offres = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { data = [], loading } = useAsync(() => OffresServices.getOffres());
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentOffres = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const { inputs, errors, handleOnChange, hanldeError } =
    useValidation<ApplyForm>({ keyword: "" });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.keyword?.trim()) {
      hanldeError("Keyword is required", "keyword");
      return;
    }
    navigate("/search-offre?q=" + encodeURIComponent(inputs.keyword));
  };

  const goTo = (path: string) => navigate(path);

  return (
    <main className="bg-white dark:bg-slate-900 dark:text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <BreadCumb title="Offres" />

        <header
          className="relative h-72 flex items-center justify-center rounded-md overflow-hidden shadow-lg"
          style={{
            backgroundImage:
              "url('https://apicosamed.cosamed.org/uploads/blogs/6adbe8b2ab3a52e619c526eff905468a.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <header className="text-center text-white py-10 w-full absolute inset-0 bg-principal bg-opacity-60 flex items-center justify-center">
            <h1 className="text-[20px] font-bold">
              Offres d'emploi disponibles
            </h1>
           
          </header>
        </header>

        {/* Search & Actions */}
        <section className="bg-white p-6 shadow-md max-w-4xl mx-auto -mt-12 relative rounded-md dark:bg-slate-800">
          <form
            onSubmit={handleSearch}
            className="mt-6 max-w-md mx-auto flex flex-col md:flex-row gap-4"
          >
            <InputSpecial
              name="keyword"
              placeholder="Rechercher des emplois ou mots-clés"
              type="text"
              errors={errors.keyword}
              value={inputs.keyword}
              onChange={(e: any) => handleOnChange(e.target.value, "keyword")}
            />
            <ButtonSpecial label="Rechercher" loading={loading} />
          </form>

          <div className="flex flex-wrap justify-center md:justify-between mt-4 gap-4">
            <button
              onClick={() =>
                goTo(user ? "/job_openings/userHome" : "/auth/login")
              }
              className="bg-white text-principal dark:bg-transparent dark:text-white border dark:border-slate-700 px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition text-[13px]"
            >
              Mes candidatures
            </button>
            <button
              onClick={() => goTo("/job_openings")}
              className="bg-white text-principal dark:bg-transparent dark:text-white border dark:border-slate-700 px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition text-[13px] hidden md:block"
            >
              Page carrières
            </button>
            <button
              onClick={() => goTo("/recruiting/cosamed/job_openings/jobalerts")}
              className="bg-white text-principal dark:bg-transparent dark:text-white border dark:border-slate-700 px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition text-[13px]"
            >
              Alertes d'emploi
            </button>
          </div>
          <div className="md:hidden mt-4 flex justify-center">
            <button
              onClick={() => goTo("/job_openings")}
              className="bg-white text-principal dark:bg-transparent dark:text-white border dark:border-slate-700 px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition text-[13px]"
            >
              Page carrières
            </button>
          </div>
        </section>

        {/* Job Listings */}
        <section className="mt-12">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: postsPerPage }).map((_, i) => (
                <BlogCardLoand key={i} />
              ))}
            </div>
          ) : currentOffres.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentOffres.map((job: any, index: number) => (
                  <OffresCard key={job.id ?? index} job={job} />
                ))}
              </div>
              {data.length > postsPerPage && (
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPasts={data.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              )}
            </>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8 text-base">
              Aucune offre disponible pour le moment.
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default Offres;
