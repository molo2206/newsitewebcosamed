import useAsync from "../hooks/useAsync";
import { useTranslation } from "react-i18next";
import BreadCumb from "../components/navbar/BreadCumb";
import BlogCard from "../components/blogs/BlogCard";
import Pagination from "../components/Pagination/Pagination";
import CategoryServices from "../services/CategoryServices";
import { useState } from "react";
import Ai4MpoxSkeleton from "../components/hero/Ai4MpoxSkeleton";

const Ai4Mpox = () => {
  const { t } = useTranslation();
  const { data = [], loading } = useAsync(
    () => CategoryServices.getblogCat("9ef6c1d3-3d17-43bb-bd25-d3230b476ff6"),
    "9ef6c1d3-3d17-43bb-bd25-d3230b476ff6"
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBulletins = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white dark:bg-slate-900 dark:text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <BreadCumb title="AI4Mpox" />

        {/* Bannière */}
        <div className="relative overflow-hidden mb-12 rounded-md shadow-md">
          <img
            src="https://apicosamed.cosamed.org/uploads/blogs/ai4.jpg"
            alt="Bannière AI4Mpox"
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white text-center px-6">
            <h1 className="text-[16px] font-extrabold mb-2">AI4Mpox</h1>
            <p className="text-[14px] max-w-3xl">
              Utiliser l'IA pour renforcer la réponse à Mpox en RDC.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-12 bg-white dark:bg-slate-800 p-6 border dark:border-slate-700 rounded-md shadow-sm">
          <h2 className="text-[16px] font-bold text-principal mb-6">AI4Mpox</h2>
          <p className="text-[13px] leading-relaxed">
            Le projet <strong>AI4Mpox</strong> vise à renforcer la réponse à
            l’épidémie de Mpox en RDC grâce à l’
            <strong>intelligence artificielle</strong>, la modélisation et des
            outils numériques.
          </p>
        </section>

        {/* Partenaires */}
        <section className="mb-12 bg-white dark:bg-slate-800 p-6 border dark:border-slate-700 rounded-md shadow-sm">
          <h3 className="text-[16px] font-bold text-principal mb-6">Partenaires</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
            {["logo.jpg", "partener2.png", "uk.png", "ai4.jpg"].map((file, index) => (
              <img
                key={index}
                src={`https://apicosamed.cosamed.org/uploads/parteners/${file}`}
                alt={`Partenaire ${index + 1}`}
                className="h-20 object-contain mx-auto rounded-md"
                loading="lazy"
              />
            ))}
          </div>
        </section>

        {/* Actualités */}
        <section className="mb-12 bg-white dark:bg-slate-800 p-6 border dark:border-slate-700 rounded-md shadow-sm">
          <h2 className="text-[16px] font-bold text-principal mb-6">{t("News")} / AI4Mpox</h2>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: postsPerPage }).map((_, i) => (
                <Ai4MpoxSkeleton key={i} />
              ))}
            </div>
          ) : data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentBulletins.map((item: any) => (
                <BlogCard key={item.id || item.slug} blog={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">
              Aucun article à afficher.
            </p>
          )}

          {data.length > postsPerPage && (
            <Pagination
              postsPerPage={postsPerPage}
              totalPasts={data.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </section>

        {/* Footer CTA */}
        <footer className="text-center">
          <a
            href="https://ai4mpox.afiagap.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-principal dark:bg-slate-800 text-white text-[12px] font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition"
          >
            En savoir plus sur AI4Mpox
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Ai4Mpox;
