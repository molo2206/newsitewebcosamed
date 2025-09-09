import useAsync from "../../hooks/useAsync";
import BulletinServices from "../../services/BulletinServices";
import BulletinLoad from "./BulletinLoad";
import BulletinCard from "./BulletinCard";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { downloadFileWithProgress } from "../../utils/heleprs";

export default function Bulletin() {
  const { t } = useTranslation();
  const { data, loading } = useAsync(() => BulletinServices.getBulletinHome());
  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  };

  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setError(null);
    setProgress(0);
    try {
      await downloadFileWithProgress(
        "https://apicosamed.cosamed.org/public/uploads/doc/autres/p_COSAMED.pdf",
        "COSAMED_Guidelines.pdf",
        setProgress
      );
    } catch (err) {
      console.error("Erreur de téléchargement :", err);
      setError(t("An error occurred during download"));
    } finally {
      setTimeout(() => setProgress(null), 2000);
    }
  };

  return (
    <section className="bg-slate-100 dark:bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-0">
            {t("Newsletters")}
          </h2>
          <div
            onClick={() => navigate("/data-loading/newsletters")}
            className="text-sm text-principal font-medium cursor-pointer hover:underline"
          >
            {t("All")} →
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Bulletins */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <BulletinLoad key={i} />
                ))
              : data?.map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                  >
                    <BulletinCard bulletin={item} />
                  </motion.div>
                ))}
          </div>

          {/* Aside */}
          <div className="space-y-4">
            <aside
              onClick={() => navigate("/data-loading/reports")}
              className="border-l-4 border-principal dark:border-principal bg-gray-50 dark:bg-slate-700 p-4 rounded-md shadow-sm hover:shadow-md cursor-pointer transition"
            >
              <p className="font-semibold text-principal dark:text-blue-200">
                Sitrep
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                {t("Situation reports and updates")}
              </p>
            </aside>

            <aside
              onClick={() => navigate("/load-data/communicated")}
              className="border-l-4 border-principal dark:border-principal bg-gray-50 dark:bg-slate-700 p-4 rounded-md shadow-sm hover:shadow-md cursor-pointer transition"
            >
              <p className="font-semibold text-red-800 dark:text-red-200">
                {t("Press")}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                {t("Official communications and press releases")}
              </p>
            </aside>

            <aside
              onClick={() => navigate("/guidelines")}
              className="border-l-4 border-principal dark:border-principal bg-gray-50 dark:bg-slate-700 p-4 rounded-md shadow-sm hover:shadow-md cursor-pointer transition"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
                className="flex items-center gap-2 text-[13px] font-semibold text-principal dark:text-white hover:underline disabled:opacity-60"
                disabled={progress !== null}
              >
                {progress !== null
                  ? `${t("Downloading")}... ${progress}%`
                  : t("Download Cosamed Guidelines")}
              </button>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                {t("Browse official protocols and recommendations")}
              </p>

              {progress !== null && (
                <motion.div
                  className="w-full mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.4 }}
                >
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </motion.div>
              )}
              {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
