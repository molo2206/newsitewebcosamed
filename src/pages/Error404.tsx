import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Error404 = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 60000); // redirection après 60 secondes
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search-results-page?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-6 bg-white dark:bg-slate-900">
      <div className="backdrop-blur-md bg-white/60 dark:bg-slate-800 p-10 shadow-lg dark:shadow-lg max-w-xl w-full">
        <img
          src="../assets/4041.svg"
          alt="404 Illustration"
          className="w-64 h-40 mb-6 mx-auto animate-pulse hover:animate-wiggl"
        />
        <h1 className="mt-6 text-3xl md:text-5xl font-extrabold animate-pulse hover:animate-wiggle leading-tight text-principa bg-gradient-to-r from-principal bg-clip-text text-transparent transition">
          {t("Erreur_404")}
        </h1>

        <p className="mt-2 text-lg italic text-gray-400">{t("It looks 404")}</p>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {t("You tried to access")}:{" "}
          <code className="bg-gray-200 dark:bg-gray-700 rounded px-2 py-1">
            {window.location.pathname}
          </code>
        </p>

        <form onSubmit={handleSearch} className="mt-6 w-full max-w-sm mx-auto">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("Search...")}
            className="px-4 py-2 w-full rounded-md  border border-gray-300 dark:text-black dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-principal"
          />
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-principal text-white font-semibold rounded-md hover:bg-[#155dbb] transition"
          >
            {t("Home")}
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            {t("Contact")}
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          {t("Redirecting to home in 60 seconds...")}
        </p>
      </div>
    </div>
  );
};

export default Error404;
