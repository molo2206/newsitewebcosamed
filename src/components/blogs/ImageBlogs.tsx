import { useState } from "react";
import BlogDetailLoad from "./BlogDetailLoad";
import ImagesBlog from "./ImagesBlog";
import LightboxViewer from "../LightBox";

interface props {
  data?: any;
  loading?: any;
}
export const ImageBlogs = ({ data, loading }: props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };
  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {Array.from(Array(20).keys()).map((_, index) => (
            <BlogDetailLoad key={index} />
          ))}
        </div>
      ) : (
        <div className="dark:bg-slate-900 w-full dark:text-white">
          <section className="container mx-auto p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.map((item: any, index: number) => (
                <ImagesBlog
                  key={index}
                  blogImage={item}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </div>
          </section>
          <LightboxViewer
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            images={data?.map((item: any) => ({
              src: item.image,
              caption: item.id,
              alt: item.id,
            }))}
          />
        </div>
      )}
    </>
  );
};
