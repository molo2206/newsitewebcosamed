import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context";
import { showingTranslateValue } from "../../utils/heleprs";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useTranslation } from "react-i18next";

interface Props {
  blog?: any;
}

const BlogCard = ({ blog }: Props) => {
  const { lang } = useAuthContext();
  const navigate = useNavigate();

  const goToDetail = () => {
    const slug = showingTranslateValue(blog?.translations, lang)?.slug;
    if (slug) {
      navigate(`/blog/detail/${slug}`);
    }
  };

  const formattedDate = blog?.publication_date
    ? format(new Date(blog.publication_date), "d MMMM yyyy", { locale: fr })
    : "";
  const { t } = useTranslation();
  return (
   
    <div className="border dark:border-gray-700 p-4 bg-gray-50 dark:bg-slate-900 dark:text-white hover:shadow">
      <img
        src={blog?.image}
        alt={showingTranslateValue(blog?.translations, lang)?.title}
        className="h-40 w-full object-cover transition-transform  duration-300 group-hover:scale-105"
      />
      <p className="text-sm ">{formattedDate}</p>
      <p
        className="font-medium text-sm text-gray-800 dark:text-gray-200  mt-1 line-clamp-2"
        dangerouslySetInnerHTML={{
          __html: showingTranslateValue(blog?.translations, lang)?.title || "",
        }}
      ></p>
      <div className="mt-3 flex space-x-4 text-sm">
        <a
          onClick={() => goToDetail()}
          className="text-blue-700 font-medium dark:text-gray-200 cursor-pointer"
        >
          {t("Read_more")}
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
