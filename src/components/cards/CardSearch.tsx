import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";
import { Link } from "react-router-dom";

interface Props {
  blog?: any;
}

const CardSearch = ({ blog }: Props) => {
  const { lang } = useAuthContext();

  const isNews = !!blog?.publication_date;
  const isBulletin = !!blog?.file;

  const title = showingTranslateValue(blog?.translations, lang)?.title;
  const description = showingTranslateValue(
    blog?.translations,
    lang
  )?.description;
  const slug = showingTranslateValue(blog?.translations, lang)?.slug;

  const link = isNews
    ? `/blog/detail/${slug}`
    : isBulletin
    ? `/bulletin/detail/${blog?.id}`
    : "#";

  const label = isNews ? "Actualité" : isBulletin ? "Bulletin" : "";

  return (
    <Link to={link} className="block group">
      <div className="bg-gray-100 p-4 sm:p-6 border-blue-900 dark:bg-slate-800 mb-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center shadow-sm">
        <img
          src={blog?.image}
          alt={title}
          className="w-full sm:w-60 h-40 sm:h-48 object-cover shadow-md"
        />
        <div className="flex flex-col w-full">
          {label && (
            <span className="inline-block mb-2 text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full w-fit">
              {label}
            </span>
          )}
          <h2 className="text-lg font-bold text-blue-900 mb-2">{title}</h2>
          <p
            className="text-sm text-gray-700 dark:text-gray-300 font-montserrat line-clamp-4"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
      </div>
      <div className="border-t border-principal"></div>
    </Link>
  );
};

export default CardSearch;
