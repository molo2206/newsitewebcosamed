import { useNavigate, useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import RapportServices from "../services/RapportServices";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import { useTranslation } from "react-i18next";
import BlogDetailLoad from "../components/blogs/BlogDetailLoad";
import BreadCumb from "../components/navbar/BreadCumb";
import Error404 from "./Error404";

const DetailRapport = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { lang } = useAuthContext();
  const { data, error, loading } = useAsync(
    () => RapportServices.oneRapport(id),
    id
  );
  const navigate = useNavigate();
  const goToAbout = () => {
    navigate("/data-loading/reports");
  };
  const handleDownload = () => {
    // Contenu du fichier simulé (peut être une réponse API ou un fichier local)
    const fichierTexte = data?.file;
    const blob = new Blob([fichierTexte], { type: "text/plain" });

    // Créez une URL pour le blob
    const url = window.URL.createObjectURL(blob);

    // Créez un élément <a> pour initier le téléchargement
    const a = document.createElement("a");
    a.href = url;
    a.download = "fichier-exemple.pdf"; // Nom du fichier
    document.body.appendChild(a);
    a.click(); // Déclenche le téléchargement
    document.body.removeChild(a); // Nettoie l'élément
    window.URL.revokeObjectURL(url); // Libère la mémoire
  };

  return error ? (
    <Error404 />
  ) : (
    <>
      {loading ? (
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div className="container dark:bg-slate-900 w-full dark:text-white py-1 ">
          <div className="container">
            <BreadCumb
              title="Detail"
              second={"/load-data/communicated"}
              secondTitle={t("Reports")}
            />
            <section className="mb-10">
              <header className="bg-principal dark:bg-slate-800 w-full dark:text-white rounded-lg text-white py-10">
                <div className="max-w-6xl mx-auto px-4 text-center">
                  <h1 className="text-4xl font-bold text-white">
                    {showingTranslateValue(data?.translations, lang)?.title}
                  </h1>
                </div>
              </header>
              <header className="border-b pb-6 mb-6 mt-4">
                <div className="mt-2 text-gray-500 dark:text-white">
                  <p>
                    <span className="font-medium dark:text-white">Date : </span>
                    {data?.created}
                  </p>
                  <p>
                    <span className="font-medium dark:text-white">
                      Auteur :{" "}
                    </span>
                    {data?.author?.full_name}
                  </p>
                  <p>
                    <span className="font-medium dark:text-white">
                      Statut :{" "}
                    </span>
                    <span
                      className={`px-2 py-1 rounded ${
                        data?.status === 1
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      Approuvé
                    </span>
                  </p>
                </div>
              </header>
              {/* Description */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 dark:text-white">
                  Description
                </h2>
                <p
                  className="text-gray-600 leading-relaxed dark:text-white"
                  dangerouslySetInnerHTML={{
                    __html: showingTranslateValue(data?.translations, lang)
                      ?.description,
                  }}
                ></p>
              </section>

              <div className="mt-8 flex justify-between">
                <button
                  className="px-6 py-2 bg-blue-600 dark:bg-slate-800 text-white dark:text-white rounded-md hover:bg-blue-700"
                  onClick={handleDownload}
                >
                  Télécharger le rapport
                </button>
                <button
                  className="px-6 py-2 bg-gray-300 dark:bg-slate-800 dark:text-white text-gray-700 rounded-md hover:bg-gray-400"
                  onClick={goToAbout}
                >
                  Retour à la liste
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailRapport;
