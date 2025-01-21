import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
interface props {
  blog?: any;
}
const SimpleBannerBlog = ({ blog }: props) => {
  const { lang } = useAuthContext();
  const { t } = useTranslation();
  return (
    <>
      <div className=" bg-principal rounded-lg ">
        <div className="container py-8 md:py-12">
          <Link
            to={
              `/blog/detail/` +
              showingTranslateValue(blog?.translations, lang)?.slug
            }
          >
            <div className="grid grid-cols-1 items-center md:grid-cols-3 gap-4 md:gap-8 ">
              <div className="px-2">
                <img
                  src={blog?.image}
                  alt="not found"
                  className="mx-auto h-[250px] w-full rounded-md
            object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
                />
              </div>
              <div
                className="flex flex-col items-center
       gap-4 text-center text-white dark:text-white md:col-span-2 md:items-start md:text-left"
              >
                <h1 className="font-bold lg:text-xl md:text-xl sm:text-sm">
                  {showingTranslateValue(blog?.translations, lang)?.title}
                </h1>
                <p
                  className="lg:text-sm md:text-sm sm:text-sm line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html: showingTranslateValue(blog?.translations, lang)
                      ?.description,
                  }}
                ></p>
                <a
                  target="_blank"
                  className="py-2 font-montserrat font-semibold flex items-center justify-center
                   hover:text-white hover:bg-hover lg:text-sm md:text-sm rounded-md w-52 text-principal
               bg-white "
                >
                  {t("More")}
                </a>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SimpleBannerBlog;
