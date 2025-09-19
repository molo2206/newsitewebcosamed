import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ImageWithSkeleton = ({ src, alt }: { src: string; alt: string }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Skeleton pleine taille */}
      {loading && (
        <div className="absolute inset-0">
          <Skeleton height="100%" width="100%" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default ImageWithSkeleton;
