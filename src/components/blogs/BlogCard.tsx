import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";
import { useNavigate } from "react-router-dom";

interface props {
  blog?: any;
}

const BlogCard = ({ blog }: props) => {
  const { lang } = useAuthContext();
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate(
      `/blog/detail/` + showingTranslateValue(blog?.translations, lang)?.slug
    ); // Remplace "/about" par la route cible
  };

  return (
    <>
      <div
        key={blog.id}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow dark:border-slate-700 dark:bg-slate-800 "
      >
        <img
          src={blog.image}
          alt={blog.id}
          className="mx-auto w-full h-32
            object-cover"
        />
        <div className="from-black via-black/70 to-transparent"></div>
        <div className="p-4 ">
          <h2  onClick={goToAbout}
            className="sm:text-sm md:text-sm lg:text-sm font-semibold text-gray-800 line-clamp-1 dark:text-white"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(blog?.translations, lang)?.title,
            }}
          ></h2>
          <p
            className="text-gray-600 sm:text-sm md:text-sm lg:text-sm  mb-4 line-clamp-2 font-light dark:text-white"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(blog?.translations, lang)
                ?.description,
            }}
          ></p>
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <div className=" flex justify-between space-x-2 items-center">
              <img
                src={blog.author.image}
                alt={blog.author.full_name}
                className="w-10 h-10 rounded-full"
              />
              <span style={{fontSize:11}} className="dark:text-white sm:text-sm md:text-sm lg:text-sm ">
                Par {blog?.author.full_name}
              </span>
            </div>
            <span style={{fontSize: 11}} className="dark:text-white sm:text-sm md:text-sm lg:text-sm ">{blog?.publication_date}</span>
          </div>
        </div>
        <div className="p-4 border-t text-center">
          <button
            onClick={goToAbout}
            className="text-principal font-medium hover:underline sm:text-sm md:text-sm lg:text-sm "
          >
            Lire la suite
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
