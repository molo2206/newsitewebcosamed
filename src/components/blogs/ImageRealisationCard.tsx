import { useState } from "react";
import { motion } from "framer-motion";
import BlogDetailLoad from "./BlogDetailLoad";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Assurez-vous que ce CSS est chargé une fois globalement

interface Props {
  data?: any;
  loading?: boolean;
  onClick?: () => void;
}

const ImageRealisationCard = ({ data, loading, onClick }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (loading) {
    return (
      <>
        {Array.from({ length: 20 }).map((_, i) => (
          <BlogDetailLoad key={i} />
        ))}
      </>
    );
  }

  if (!data) return null;

  return (
    <motion.div
      key={data?.id}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className="relative group overflow-hidden shadow-md rounded-md cursor-pointer transition-transform"
    >
      {/* Skeleton Loader */}
      {!imageLoaded && (
        <Skeleton
          height="12rem"
          baseColor="#e1e1e1"
          highlightColor="#f2f2f2"
          className="w-full rounded-md absolute inset-0 z-0"
        />
      )}

      {/* Image réelle */}
      <img
        src={data?.cover}
        alt={data?.title || "Image de réalisation"}
        className={`w-full h-48 object-cover transition-transform duration-500 transform group-hover:scale-105 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
        onContextMenu={(e) => e.preventDefault()}
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {/* Titre */}
      <div className="absolute bottom-0 left-0 w-full z-20 px-3 py-2 bg-gradient-to-t from-black/70 to-transparent text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
        {data?.title || ""}
      </div>
    </motion.div>
  );
};

export default ImageRealisationCard;
