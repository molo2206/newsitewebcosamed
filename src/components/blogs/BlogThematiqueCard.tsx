
import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";
import { useNavigate } from "react-router-dom";

interface props {
  cat?: any;
}

const BlogThematiqueCard = ({ cat }: props) => {
  const navigate = useNavigate();
  const goToAbout = () => {
    navigate(
      `/blog/detail/` + showingTranslateValue(cat?.translations, lang)?.slug
    ); // Remplace "/about" par la route cible
  };
  const { lang } = useAuthContext();
  return (
    <>
       <div
        key={cat.id}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow dark:border-slate-700 dark:bg-slate-800 "
      >
        <img
          src={cat.image}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2  onClick={goToAbout}
            className="sm:text-sm md:text-sm lg:text-sm font-semibold text-gray-800 line-clamp-1 dark:text-white"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(cat?.translations, lang)?.title,
            }}
          ></h2>
          <p
            className="text-gray-600 sm:text-sm md:text-sm lg:text-sm  mb-4 line-clamp-2 dark:text-white"
            dangerouslySetInnerHTML={{
              __html: showingTranslateValue(cat?.translations, lang)
                ?.description,
            }}
          ></p>
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <div className=" flex justify-between space-x-2 items-center">
              <img
                src={cat.author.image}
                alt={cat.author.full_name}
                className="w-10 h-10 rounded-full"
              />
              <span style={{fontSize:11}} className="dark:text-white sm:text-sm md:text-sm lg:text-sm ">
                Par {cat?.author.full_name}
              </span>
            </div>
            <span style={{fontSize: 11}} className="dark:text-white sm:text-sm md:text-sm lg:text-sm ">{cat?.publication_date}</span>
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

export default BlogThematiqueCard;
