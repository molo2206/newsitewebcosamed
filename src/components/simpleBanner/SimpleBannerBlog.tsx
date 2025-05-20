import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  blog?: any;
}

const SimpleBannerBlog = ({ blog }: Props) => {
  const { lang } = useAuthContext();
  const { t } = useTranslation();

  const translation = showingTranslateValue(blog?.translations, lang);

  return (
    <div className="bg-principal rounded-lg overflow-hidden shadow-lg">
      <div className="container py-8 md:py-12">
        <Link
          to={`/blog/detail/${translation?.slug}`}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
        >
          {/* Image */}
          <div className="px-2">
            <img
              src={blog?.image}
              alt={translation?.title || "Blog Image"}
              className="mx-auto w-full h-[250px] rounded-md object-cover 
                         transition-transform duration-500 ease-in-out 
                         hover:scale-105 hover:skew-x-1"
            />
          </div>

          {/* Texte */}
          <div className="flex flex-col md:col-span-2 gap-4 text-white 
                          text-center md:text-left items-center md:items-start">
            <h1 className="font-bold text-xl md:text-2xl">{translation?.title}</h1>
            <p
              className="line-clamp-3 text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: translation?.description }}
            ></p>
            <span
              className="inline-block mt-2 py-2 w-40 text-center font-semibold 
                         bg-white text-principal rounded-md cursor-pointer 
                         hover:bg-hover hover:text-white transition"
            >
              {t("More")}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SimpleBannerBlog;
