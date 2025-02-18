import { showingTranslateValue } from "../../utils/heleprs";
import { useAuthContext } from "../../context";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
interface props {
  bulletin?: any;
}

const SimpleBannerBulletin = ({ bulletin }: props) => {
  const { lang } = useAuthContext();
  const { t } = useTranslation();
  return (
    <>
      <div className=" bg-principal dark:bg-slate-800 rounded-lg ">
        <div className="container py-8 md:py-12 ">
          <Link
            to={
              `/blog/detail/` +
              showingTranslateValue(bulletin?.translations, lang)?.id
            }
          >
            <div className="grid grid-cols-1 items-center md:grid-cols-3 gap-4 md:gap-8">
              <div className="px-2">
                <img
                  src={bulletin?.image}
                  alt="not found"
                  className="mx-auto h-[250px] w-full 
            object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
                />
              </div>
              <div
                className="flex flex-col items-center
       gap-4 text-center text-white dark:text-white md:col-span-2 md:items-start md:text-left"
              >
                <h1 className="lg:text-xl md:text-xl font-bold">
                  {showingTranslateValue(bulletin?.translations, lang)?.title}
                </h1>
                <a
                  target="_blank"
                  className="py-2 font-montserrat font-semibold flex items-center justify-center hover:text-white hover:bg-hover lg:text-sm md:text-sm  rounded-md w-52 text-principal
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

export default SimpleBannerBulletin;
