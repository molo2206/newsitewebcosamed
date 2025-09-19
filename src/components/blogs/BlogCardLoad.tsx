import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const BlogCardLoad = () => {
  return (
    <motion.article
      className="cursor-pointer border dark:border-gray-700 p-4 rounded-md bg-gray-50 dark:bg-slate-900 dark:text-white shadow-sm transition-shadow group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className="overflow-hidden rounded-md mb-3">
        <Skeleton
          height={160}
          width="100%"
          baseColor="var(--skeleton-base, #e2e8f0)"
          highlightColor="var(--skeleton-highlight, #f1f5f9)"
        />
      </div>

      {/* Date */}
      <div className="h-3 w-20 mb-1">
        <Skeleton
          height={12}
          width="100%"
          baseColor="var(--skeleton-base, #e2e8f0)"
          highlightColor="var(--skeleton-highlight, #f1f5f9)"
        />
      </div>

      {/* Catégorie */}
      <div className="mt-1 h-4 w-14">
        <Skeleton
          height={14}
          width="100%"
          baseColor="var(--skeleton-base, #e2e8f0)"
          highlightColor="var(--skeleton-highlight, #f1f5f9)"
        />
      </div>

      {/* Titre */}
      <div className="mt-2 h-8">
        <Skeleton
          height={20}
          width="90%"
          baseColor="var(--skeleton-base, #e2e8f0)"
          highlightColor="var(--skeleton-highlight, #f1f5f9)"
        />
      </div>

      {/* Extrait */}
      <div className="mt-2 space-y-1">
        <Skeleton
          count={3}
          height={12}
          width="100%"
          baseColor="var(--skeleton-base, #e2e8f0)"
          highlightColor="var(--skeleton-highlight, #f1f5f9)"
        />
      </div>

      {/* Lire plus */}
      <div className="mt-3 h-4 w-20">
        <Skeleton
          height={14}
          width="100%"
          baseColor="var(--skeleton-base, #e2e8f0)"
          highlightColor="var(--skeleton-highlight, #f1f5f9)"
        />
      </div>
    </motion.article>
  );
};

export default BlogCardLoad;
