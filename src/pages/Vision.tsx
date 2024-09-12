import aboutImag from "../assets/hero.jpg";
import SettingsServices from "../services/SettingsServices";
import useAsync from "../hooks/useAsync";
import { showingTranslateValue } from "../utils/heleprs";
import { useAuthContext } from "../context";
import { useTranslation } from "react-i18next";
const Vision = () => {
  const { data } = useAsync(() => SettingsServices.getSettings());
  const { lang } = useAuthContext();
  const { t } = useTranslation();
  return (
    <div className="dark:bg-slate-800 dark:text-slate-200 py-20">
      {/* about text */}
      <div className=" px-4 lg:px-14 max-w-screen-2xl mx-auto my-8">
        <div className=" md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <img src={aboutImag} alt="" className="w-[500px] h-full rounded-md" />
          </div>
          <div className=" md:w-3/5 mx-auto">
            <h2 className=" text-4xl text-neutralDGray font-semibold mb-4 md:w-4/5">
              {t("Vision")}
            </h2>
            <p
              className=" md:w-3/4 text-neutralGray mb-8"
              dangerouslySetInnerHTML={{
                __html: showingTranslateValue(data?.translations, lang)?.vision,
              }}
            ></p>
            {/* <button className=" btn-primary" >Contact</button> */}
          </div>
        </div>
      </div>
      {/* company stats*/}
    </div>
  );
};

export default Vision;
