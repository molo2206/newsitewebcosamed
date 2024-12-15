import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
interface props {
  commun?: any;
}
const SimpleBannerCommunicated = ({ commun }: props) => {
  const { lang } = useAuthContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate("/communicated/" + commun?.id); // Remplace "/about" par la route cible
  };
  return (
    <>
      <div className=" bg-white dark:bg-slate-900 flex items-center justify-center py-2">
        <div className="container dark:bg-slate-800  shadow-lg rounded-lg p-6">
          <h1 className="lg:text-xl md:text-xl font-extrabold dark:text-white  text-gray-800 mb-4 text-center">
            Annonce Importante
          </h1>
          <div className="container border-t border-gray-300 pt-4">
            <h2 className="text-2xl dark:text-white  font-semibold text-principal mb-2">
              {showingTranslateValue(commun?.translations, lang)?.title}
            </h2>
            <p
              className="text-gray-700 dark:text-white  leading-relaxed mb-4 line-clamp-6"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(commun?.translations, lang)
                  ?.description,
              }}
            ></p>
            <div className="text-center">
              <button
                onClick={goToAbout}
                className="bg-principal text-white px-4 py-2 rounded hover:bg-hover  transition"
              >
                {t("More")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleBannerCommunicated;
