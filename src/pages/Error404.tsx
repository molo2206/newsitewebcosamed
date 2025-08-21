import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, Home, Mail } from "lucide-react";

const Error404 = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [counter, setCounter] = useState(60);

  // Countdown timer + auto redirect
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/");
    }, 60000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search-results-page?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 px-4">
      <div className="bg-white/70 dark:bg-slate-800/80 shadow-xl rounded-lg p-8 max-w-lg w-full text-center backdrop-blur-md">
        <h1 className="text-[26px] font-bold text-principal dark:text-white animate-fade-in-down">
          {t("Erreur_404")}
        </h1>

        <p className="mt-3 text-[12px] text-gray-500 dark:text-gray-300 italic">
          {t("It looks 404")}
        </p>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {t("You tried to access")}:{" "}
          <code className="bg-gray-200  dark:bg-gray-700 px-2 py-1 rounded text-[11px]">
            {window.location.pathname}
          </code>
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-6 flex items-center gap-2 max-w-md mx-auto"
        >
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("Search...")}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-principal focus:outline-none dark:text-black"
          />
          <button
            type="submit"
            title={t("Search")}
            className="bg-principal text-white p-2 rounded-md hover:bg-[#155dbb] transition"
          >
            <Search size={18} />
          </button>
        </form>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-3 py-2 bg-principal text-[12px] text-white font-semibold rounded-md hover:bg-[#155dbb] transition"
          >
            <Home size={12} />
            {t("Home")}
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="flex items-center gap-2 text-[12px] px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <Mail size={16} />
            {t("Contact")}
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          {t("Redirecting to home in")} {counter} {t("seconds")}...
        </p>
      </div>
    </div>
  );
};

export default Error404;
