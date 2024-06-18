import { useTranslation } from "react-i18next";
import SettingsServices from "../../services/SettingsServices";
import { useAuthContext } from "../../context";
import useAsync from "../../hooks/useAsync";
import { showingTranslateValue } from "../../utils/heleprs";

const BannerMission = () => {
  const { lang } = useAuthContext();
  const { t } = useTranslation();
  const { data } = useAsync(() => SettingsServices.getSettings());

  return (
    <section className=" bg-slate-100  dark:bg-slate-900 dark:text-white py-2">
      <p className="border-t-2"></p>
      <div className=" container flex flex-col items-center justify-center py-10 md:h-[500px]">
        <div className=" grid grid-cols-1 items-center gap-4 md:grid-cols-2">
          <div className={"order-1"}>
            <h1 className="text-2xl md:text-4xl  p-4  ">{t("Mission")}</h1>
            <p
              className="text-lg text-slate-600 dark:text-slate-200 font-montserrat mx-auto w-full p-4  "
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(data?.translations, lang)
                  ?.mission,
              }}
            ></p>
          </div>
          <div
            className="flex flex-col items-start gap-4 text-left 
          md:items-start md:p-8 md:text-left "
          >
            <h1 className="text-2xl md:text-4xl p-4">{t("Vision")}</h1>
            <p
              className="text-lg text-slate-600 dark:text-slate-200 font-montserrat mx-auto w-full p-4"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(data?.translations, lang)?.vision,
              }}
            ></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerMission;
