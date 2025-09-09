import { useTranslation } from "react-i18next";
import SettingsServices from "../../services/SettingsServices";
import useAsync from "../../hooks/useAsync";
import { showingTranslateValue } from "../../utils/heleprs";
import { useLanguageContext } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import { FaRegLightbulb, FaEye } from "react-icons/fa";

const BannerMission = () => {
  const { language: lang } = useLanguageContext();
  const { t } = useTranslation();
  const { data } = useAsync(() => SettingsServices.getSettings());

  const mission = showingTranslateValue(data?.translations, lang)?.mission;
  const vision = showingTranslateValue(data?.translations, lang)?.vision;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <section className="bg-slate-100 dark:bg-slate-900 py-16">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bloc Mission */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="relative bg-white dark:bg-slate-800 border-l-4 border-principal shadow p-6 rounded-md dark:border-principal/70"
          >
            <div className="flex items-center mb-4">
              <FaRegLightbulb className="text-principal w-4 h-4 mr-2" />
              <h2 className=" text-[16px] font-bold text-gray-800 dark:text-white">
                {t("Mission")}
              </h2>
            </div>
            <p
              className="text-[14px]  text-slate-700 dark:text-slate-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: mission }}
            />
          </motion.div>

          {/* Bloc Vision */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="relative bg-white dark:bg-slate-800 border-l-4 border-principal shadow p-6 rounded-md dark:border-principal"
          >
            <div className="flex items-center mb-4">
              <FaEye className="text-principal w-4 h-4 mr-2" />
              <h2 className="text-[16px]  font-bold text-gray-800 dark:text-white">
                {t("Vision")}
              </h2>
            </div>
            <p
              className="text-[14px] text-slate-700 dark:text-slate-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: vision }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BannerMission;
