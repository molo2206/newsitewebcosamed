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
    <section className=" bg-slate-100   dark:bg-slate-900  dark:text-white mt-10 ">
      
      <p className="border-t-2">
        {/* <BannerSearch /> */}
      </p>
      <div className=" container flex flex-col items-center justify-center dark:bg-slate-800  md:h-[500px] ">
        <div className=" grid grid-cols-1 items-center gap-4 md:grid-cols-2">
          <div className={"order-1 bg-white  p-6 rounded-lg shadow-md mb-12  border  dark:bg-slate-900 w-full dark:text-white"}>
            <h1 className="text-2xl md:text-4xl  p-4  ">{t("Mission")}</h1>
            <p
              className="text-slate-600 dark:text-slate-200 font-montserrat mx-auto w-full p-4 text-sm"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(data?.translations, lang)
                  ?.mission,
              }}
            ></p>
          </div>
          <div
            className="flex flex-col items-start  text-left 
          md:items-start md:p-8 md:text-left bg-white p-6  border rounded-lg dark:bg-slate-900 w-full dark:text-white shadow-md mb-12"
          >
            <h1 className="text-2xl md:text-4xl p-4">{t("Vision")}</h1>
            <p
              className="text-sm text-slate-600 dark:text-slate-200 font-montserrat mx-auto w-full p-4"
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
