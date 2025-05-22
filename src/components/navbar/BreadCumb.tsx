import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  title?: string;
  second?: string;
  secondTitle?: string;
}

const BreadCumb = ({ title, second, secondTitle }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900  p-2 "
    >
      <nav
        className="flex items-center text-sm text-gray-600 dark:text-gray-300 gap-2 overflow-x-auto p-4"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {/* Home */}
          <li className="inline-flex items-center">
            <div
              onClick={() => navigate("/")}
              className="inline-flex cursor-pointer items-center text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition"
            >
              <Home size={16} className="mr-1" />
              {t("Home")}
            </div>
          </li>

          {/* Second level (optional) */}
          {second && (
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link
                  to={second}
                  className="ml-1 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition"
                >
                  {t(secondTitle || "")}
                </Link>
              </div>
            </li>
          )}

          {/* Current page */}
          {title && (
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="ml-1 text-gray-500 dark:text-gray-400">
                  {t(title)}
                </span>
              </div>
            </li>
          )}
        </ol>
      </nav>
    </motion.div>
  );
};

export default BreadCumb;
