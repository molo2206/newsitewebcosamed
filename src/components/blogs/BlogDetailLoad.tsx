import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const BlogDetailLoadSkeleton = () => {
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
          baseColor="var(--skeleton-base)"
          highlightColor="var(--skeleton-highlight)"
        />
      </div>

      {/* Date */}
      <div className="mb-1 h-3 w-20">
        <Skeleton
          height={12}
          width="100%"
          baseColor="var(--skeleton-base)"
          highlightColor="var(--skeleton-highlight)"
        />
      </div>

      {/* Titre */}
      <div className="mt-2 h-8">
        <Skeleton
          height={18}
          width="90%"
          baseColor="var(--skeleton-base)"
          highlightColor="var(--skeleton-highlight)"
        />
      </div>

      {/* Lire plus */}
      <div className="mt-3 h-4 w-20">
        <Skeleton
          height={14}
          width="100%"
          baseColor="var(--skeleton-base)"
          highlightColor="var(--skeleton-highlight)"
        />
      </div>
    </motion.article>
  );
};

export default BlogDetailLoadSkeleton;
