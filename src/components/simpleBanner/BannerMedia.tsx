import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const BannerMedia = () => {
  const { t } = useTranslation();
  return (
    <div className=" bg-principal rounded-lg">
      <div className="container  md:py-20">
        <Link to="https://www.youtube.com/@MediaCOSAMED" target="_blank">
          <div className="grid grid-cols-1 items-center justify-center md:grid-cols-3 gap-4 md:gap-8 ">
            <div
              className="flex flex-col items-center  justify-center
   gap-4 text-center text-white dark:text-white md:col-span-2 md:items-start md:text-center"
            >
              <h1 className="font-semibold md:text-3xl sm:text-sm">
                {t("chanel_youtube")}
              </h1>
              <a
                target="_blank"
                className="py-2 font-montserrat font-semibold flex items-center justify-center hover:text-white hover:bg-orange-300 text-lg rounded-md w-52 text-principal
           bg-white "
              >
                YOUTUBE
              </a>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BannerMedia;
