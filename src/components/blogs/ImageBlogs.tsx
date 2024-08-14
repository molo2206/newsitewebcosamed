
import BlogCardLoand from "./BlogCardLoad";
import ImagesBlog from "./ImagesBlog";

interface props{
    data?: any;
    loading?:any;
}
export const ImageBlogs = ({data,loading}:props) => {

  return (
    <div>
      <div className=" dark:bg-slate-900 w-full dark:text-white ">
        <section className="mb-10">
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {loading
              ? Array.from(Array(20).keys()).map(() => <BlogCardLoand />)
              : data.map((item: any, index: number) => (
                  <ImagesBlog blogImage={item} key={index} />
                ))}
          </div>
        </section>
      </div>
    </div>
  );
};
