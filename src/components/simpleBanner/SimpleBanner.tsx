import { useTranslation } from "react-i18next";
import useAsync from "../../hooks/useAsync";
import SettingsServices from "../../services/SettingsServices";
import { showingTranslateValue } from "../../utils/heleprs";

import { useAuthContext } from "../../context";
const SimpleBanner = () => {
  const { lang } = useAuthContext();
  const { t } = useTranslation();
  const { data } = useAsync(() => SettingsServices.getSettings());

  return (
    <>
      <div className=" bg-principal">
        <div className="container md:py-12">
          <div className="grid grid-cols-1 items-center md:grid-cols-3 gap-4 md:gap-8">
            <div className="px-2">
              <iframe
                className="aspect-video w-full"
                src="https://www.youtube.com/embed/DRvuXn94OjM?si=8VJviOo3HlwA2jwp"
                title="Youtube video player"
                allow="accelerometer: autoplay; clipboard-write;encrypted-media;
            gyroscope;picture-in-picture;web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div
              className="flex flex-col items-center
           gap-4 text-center text-white dark:text-white md:col-span-2 md:items-start md:text-left"
            >
              <h1 className="text-3xl font-bold">{t("AboutUs")}</h1>
              <p
                className=" text-lg font-montserrat"
                dangerouslySetInnerHTML={{
                  __html: showingTranslateValue(data?.translations, lang)
                    ?.about_us,
                }}
              ></p>
              {/* <a href="mailto:cosamed17@gmail.com"  target="_blank"
                className="py-2 flex items-center justify-center text-lg rounded-md w-52 text-principal
               bg-white ">
                {t("Contact")}
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleBanner;
