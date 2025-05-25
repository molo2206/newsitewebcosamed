import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useTranslation } from "react-i18next";

interface props {
  cat?: any;
}

const BlogThematiqueCard = ({ cat }: props) => {
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate(
      `/blog/detail/` + showingTranslateValue(cat?.translations, lang)?.slug
    ); // Remplace "/about" par la route cible
  };
  const formattedDate = cat?.publication_date
    ? format(new Date(cat.publication_date), "d MMMM yyyy", { locale: fr })
    : "";
  const { lang } = useAuthContext();
  const { t } = useTranslation();
  return (
    <>
      <div className="border p-4 bg-gray-50 hover:shadow">
        <img
          src={cat?.image}
          alt={showingTranslateValue(cat?.translations, lang)?.title}
          className="h-40 w-full object-cover transition-transform  duration-300 group-hover:scale-105"
        />
        <p className="text-sm text-gray-500">{formattedDate}</p>
        <p
          className="font-medium text-sm text-gray-800 mt-1 line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: showingTranslateValue(cat?.translations, lang)?.title || "",
          }}
        ></p>
        <div className="mt-3 flex space-x-4 text-sm">
          <a
            onClick={() => goToDetail()}
            className="text-blue-700 font-medium cursor-pointer"
          >
            {t("Read_more", "Lire la suite →")}
          </a>
        </div>
      </div>
    </>
  );
};

export default BlogThematiqueCard;
