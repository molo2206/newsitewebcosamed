import { useTranslation } from "react-i18next";
import SettingsServices from "../../services/SettingsServices";
import { useAuthContext } from "../../context";
import useAsync from "../../hooks/useAsync";
import { showingTranslateValue } from "../../utils/heleprs";

const BannerMission = () => {
  const { lang } = useAuthContext();
  const { t } = useTranslation();
  const { data } = useAsync(() => SettingsServices.getSettings());

  const mission = showingTranslateValue(data?.translations, lang)?.mission;
  const vision = showingTranslateValue(data?.translations, lang)?.vision;

  return (
    <section className="bg-slate-100 dark:bg-slate-900 py-16">
      <div className=" mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bloc Mission */}
          <div className="bg-white dark:bg-slate-800  shadow p-6 border dark:border-slate-700">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {t("Mission")}
            </h2>
            <p
              className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: mission }}
            />
          </div>

          {/* Bloc Vision */}
          <div className="bg-white dark:bg-slate-800 shadow p-6 border dark:border-slate-700">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {t("Vision")}
            </h2>
            <p
              className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: vision }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerMission;
