import { useState } from "react";
import BlogDetailLoad from "./BlogDetailLoad";
import LightboxViewer from "../LightBox";

interface Props {
  data?: any[];
  loading?: boolean;
}

export const ImageBlogs = ({ data = [], loading }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <BlogDetailLoad key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {data.map((item, index) => (
            <div
              key={item.id || index}
              className="aspect-square overflow-hidden relative cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={item.image}
                alt={item.id}
                 loading="lazy"
                 onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-cover transition duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      <LightboxViewer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        images={data.map((item) => ({
          src: item.image,
          caption: item.id,
          alt: item.id,
        }))}
      />
    </div>
  );
};
