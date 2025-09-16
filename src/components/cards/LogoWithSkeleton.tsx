import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LogoWithSkeleton = ({ src, alt }: { src: string; alt: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative flex items-center justify-center w-full h-16 sm:h-20">
      {/* Skeleton */}
      {!imageLoaded && (
        <Skeleton
          width={120} 
          height={60}
          baseColor="var(--skeleton-base)"
          highlightColor="var(--skeleton-highlight)"
          className="rounded-md"
        />
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={`max-h-full max-w-full object-contain brightness-110 contrast-110 transition-opacity duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

export default LogoWithSkeleton;
