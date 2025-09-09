import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LogoWithSkeleton = ({ src, alt }: { src: string; alt: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-[140px] sm:w-[160px] md:w-[180px] h-16 sm:h-20 flex justify-center items-center">
      {/* Skeleton */}
      {!imageLoaded && (
        <Skeleton
        //   height="80%" // hauteur du parent
          width="100%"  // largeur du parent
          baseColor="var(--skeleton-base)"
          highlightColor="var(--skeleton-highlight)"
          className="rounded-md absolute inset-0 z-0 max-h-full"
        />
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={`max-w-full max-h-full object-contain brightness-110 contrast-110 transition-opacity duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

export default LogoWithSkeleton;
