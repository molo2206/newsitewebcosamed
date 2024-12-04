import { useState } from "react";
import BlogCardLoand from "./BlogCardLoad";
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
        Array.from(Array(20).keys()).map(() => <BlogDetailLoad />)
      ) : (
        <div>
          <div className=" dark:bg-slate-900 w-full dark:text-white">
            <section className="mb-10">
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {loading
                  ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
                  : data.map((item: any, index: number) => (
                      <ImagesBlog
                        blogImage={item}
                        onClick={() => openLightbox(index)}
                        key={index}
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
        </div>
      )}
    </>
  );
};
