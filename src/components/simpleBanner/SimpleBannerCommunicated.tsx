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
      <div className="container dark:bg-slate-900 w-full dark:text-white py-4">
        <h1 className="pl-2 text-left text-3xl font-bold">
          Annonce Importante
        </h1>
        <div className=" py-8 ">
          {/* Section Annonce */}
          <section className="bg-white dark:bg-slate-800  border p-8 rounded-lg shadow-md mb-12">
            <h2 className="text-3xl font-semibold dark:text-white text-gray-800 mb-6 underline decoration-blue">
              {showingTranslateValue(commun?.translations, lang)?.title}
            </h2>
            <p
              className="text-lg text-gray-700 mb-4 line-clamp-6 dark:text-white "
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(commun?.translations, lang)
                  ?.description,
              }}
            ></p>
            <button
              onClick={goToAbout}
              className="mt-4 px-6 py-2 bg-principal text-white rounded-md hover:bg-hover"
            >
              {t("More")}
            </button>
          </section>

          {/* Section À Propos de l'Entreprise */}
        </div>
      </div>
    </>
  );
};

export default SimpleBannerCommunicated;
